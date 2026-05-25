'use client'

import { useAuth } from '@/components/Auth'
import {
  attachTourScrollLock,
  DASHBOARD_TOUR_STEPS,
  isTourCompleted,
  markTourCompleted,
  resolveTourBackRoute,
  routeMatchesStep,
  scrollTourTargetIntoView,
  shouldScrollTourStep,
  type DashboardTourStep,
  type EditorTourAssist,
  type SettingsTourAssist,
} from '@/lib/dashboardTour'
import { usePathname, useRouter } from 'next/navigation'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type DashboardTourContextValue = {
  isActive: boolean
  currentStep: DashboardTourStep | null
  currentStepIndex: number
  totalSteps: number
  editorAssist: EditorTourAssist
  settingsAssist: SettingsTourAssist
  next: () => void
  back: () => void
  skip: () => void
  canGoBack: boolean
  registerMobileNavOpener: (fn: () => void) => void
}

const DashboardTourContext = createContext<DashboardTourContextValue | null>(null)

export function useDashboardTour() {
  const ctx = useContext(DashboardTourContext)
  if (!ctx) {
    return {
      isActive: false,
      currentStep: null,
      currentStepIndex: -1,
      totalSteps: DASHBOARD_TOUR_STEPS.length,
      editorAssist: {} as EditorTourAssist,
      settingsAssist: {} as SettingsTourAssist,
      next: () => {},
      back: () => {},
      skip: () => {},
      canGoBack: false,
      registerMobileNavOpener: () => {},
    }
  }
  return ctx
}

export function DashboardTourProvider({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [stepIndex, setStepIndex] = useState(-1)
  const [started, setStarted] = useState(false)
  const mobileNavOpenerRef = useRef<(() => void) | null>(null)

  const finishTour = useCallback(() => {
    if (user?.uid) markTourCompleted(user.uid)
    setStepIndex(-1)
    setStarted(false)
  }, [user])

  const skip = useCallback(() => {
    finishTour()
  }, [finishTour])

  const next = useCallback(() => {
    const step = DASHBOARD_TOUR_STEPS[stepIndex]
    if (step?.nextNavigate) {
      router.push(step.nextNavigate)
    }

    const nextIndex = stepIndex + 1
    if (nextIndex >= DASHBOARD_TOUR_STEPS.length) {
      finishTour()
      return
    }
    setStepIndex(nextIndex)
  }, [stepIndex, router, finishTour])

  const back = useCallback(() => {
    if (stepIndex <= 0) return

    const prevIndex = stepIndex - 1
    const currentStep = DASHBOARD_TOUR_STEPS[stepIndex]
    const prevStep = DASHBOARD_TOUR_STEPS[prevIndex]

    let destination: string | null = null

    if (prevStep.route && !routeMatchesStep(pathname, prevStep)) {
      destination = prevStep.route
    } else if (!prevStep.route && currentStep?.nextNavigate && pathname.startsWith(currentStep.nextNavigate)) {
      destination = resolveTourBackRoute(prevIndex)
    }

    if (destination) {
      router.push(destination)
    }

    setStepIndex(prevIndex)
  }, [stepIndex, pathname, router])

  const registerMobileNavOpener = useCallback((fn: () => void) => {
    mobileNavOpenerRef.current = fn
  }, [])

  useEffect(() => {
    if (loading || !user?.uid || started) return
    if (isTourCompleted(user.uid)) return

    const timer = window.setTimeout(() => {
      setStarted(true)
      setStepIndex(0)
    }, 600)

    return () => window.clearTimeout(timer)
  }, [loading, user?.uid, started])

  const currentStep = stepIndex >= 0 ? (DASHBOARD_TOUR_STEPS[stepIndex] ?? null) : null
  const isActive = stepIndex >= 0 && stepIndex < DASHBOARD_TOUR_STEPS.length

  useEffect(() => {
    if (!isActive) return

    document.body.setAttribute('data-vbiz-tour-active', 'true')

    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    const main = document.getElementById('main-scroll')
    const prevMainOverflow = main?.style.overflow ?? ''

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    if (main) {
      main.style.overflowY = 'auto'
      main.style.minHeight = '0'
    }

    const detachScrollLock = attachTourScrollLock()

    return () => {
      detachScrollLock()
      document.body.removeAttribute('data-vbiz-tour-active')
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
      if (main) {
        main.style.overflowY = prevMainOverflow || ''
        main.style.minHeight = ''
      }
    }
  }, [isActive])

  useEffect(() => {
    if (!isActive || !currentStep) return
    if (currentStep.openMobileNav && window.innerWidth < 768) {
      mobileNavOpenerRef.current?.()
    }
  }, [isActive, currentStep])

  useEffect(() => {
    if (!isActive || !currentStep?.target) return
    if (currentStep.route && !routeMatchesStep(pathname, currentStep)) return
    if (!shouldScrollTourStep(currentStep)) return

    const scrollTarget = () => scrollTourTargetIntoView(currentStep.target!)

    const raf = requestAnimationFrame(scrollTarget)
    const timers = [150, 400, 800, 1200].map((ms) => window.setTimeout(scrollTarget, ms))

    return () => {
      cancelAnimationFrame(raf)
      timers.forEach(clearTimeout)
    }
  }, [isActive, currentStep, pathname, stepIndex])

  const editorAssist = useMemo(() => currentStep?.editorAssist ?? {}, [currentStep])
  const settingsAssist = useMemo(() => currentStep?.settingsAssist ?? {}, [currentStep])

  const value = useMemo(
    (): DashboardTourContextValue => ({
      isActive,
      currentStep,
      currentStepIndex: stepIndex,
      totalSteps: DASHBOARD_TOUR_STEPS.length,
      editorAssist,
      settingsAssist,
      next,
      back,
      skip,
      canGoBack: stepIndex > 0,
      registerMobileNavOpener,
    }),
    [isActive, currentStep, stepIndex, editorAssist, settingsAssist, next, back, skip, registerMobileNavOpener]
  )

  return <DashboardTourContext.Provider value={value}>{children}</DashboardTourContext.Provider>
}
