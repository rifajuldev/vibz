'use client'

import type { ResolvedProfileDesign } from '@/lib/resolvedProfileDesign'
import { designToCssVars, resolveProfileDesign } from '@/lib/resolvedProfileDesign'
import { getNavTabBackgroundColor, TAB_ID_TO_NAV_LABEL } from '@/lib/vcardDisplaySettings'
import {
  Award,
  Briefcase,
  Calendar,
  Camera,
  FileEdit,
  Film,
  GraduationCap,
  Home,
  Lightbulb,
  Moon,
  PlaySquare,
  ScrollText,
  Settings,
  Star,
  Sun,
  User,
  Users,
  Wrench,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { CursorTrail } from './components/CursorTrail'
import { DoneModal } from './components/DoneModal'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { FAQSection } from './components/FAQSection'
import { GeneralPostsSection } from './components/GeneralPostsSection'
import { HomeSection } from './components/HomeSection'
import { ImageGallerySection } from './components/ImageGallerySection'
import { LiveAgent } from './components/LiveAgent'
import { NotificationAskModal } from './components/NotificationAskModal'
import { NotificationModal } from './components/NotificationModal'
import { NotificationSettingsModal } from './components/NotificationSettingsModal'
import { NotificationToast } from './components/NotificationToast'
import { PublicCardsSection } from './components/PublicCardsSection'
import { SaveContactModal } from './components/SaveContactModal'
import { SaveToWalletModal } from './components/SaveToWalletModal'
import { ServicesSection } from './components/ServicesSection'
import {
  AdditionalServicesSection,
  CalendarSection,
  CertificatesSection,
  ExplainerSection,
  MissionSection,
  ReviewsSection,
} from './components/SimpleSections'
import { SiteGeometricGrid } from './components/SiteGeometricGrid'
import { VideoLinksSection } from './components/VideoLinksSection'
import { hasNotificationChoice } from './lib/notificationPrefs'
import { useProfileDisplay } from './lib/profileDisplayContext'
import type { VBizProfileAppProps } from './profilePublicProps'
import { DEMO_PROFILE_PROPS } from './profilePublicProps'
import { ProfileThemeStyles } from './ProfileThemeStyles'

const V1_TABS = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'mission', icon: ScrollText, label: 'Mission' },
  { id: 'services', icon: Wrench, label: 'Services' },
  { id: 'gallery', icon: Camera, label: 'Images' },
  { id: 'videos', icon: Film, label: 'Videos' },
  { id: 'public-cards', icon: Users, label: 'Public Cards' },
  { id: 'certificates', icon: Award, label: 'Awards' },
  { id: 'education', icon: GraduationCap, label: 'Education' },
  { id: 'work', icon: Briefcase, label: 'Experience' },
  { id: 'reviews', icon: Star, label: 'Reviews' },
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'faq', icon: Lightbulb, label: 'FAQ' },
  { id: 'additional', icon: Settings, label: 'More' },
  { id: 'explainer', icon: PlaySquare, label: 'Demo' },
  { id: 'blog', icon: FileEdit, label: 'Blog' },
]

type ModalState = 'none' | 'contact' | 'wallet' | 'notification' | 'settings' | 'done'

export function VBizProfileAppV1({
  explainerVideoUrl,
  cardOwnerId = DEMO_PROFILE_PROPS.cardOwnerId,
  ownerName = DEMO_PROFILE_PROPS.ownerName,
  liveAgentCardData = DEMO_PROFILE_PROPS.liveAgentCardData,
  design: designProp,
  embedded = false,
  previewTheme,
  onPreviewThemeChange,
}: VBizProfileAppProps) {
  const { isVisible, settings: displaySettings, pageColors } = useProfileDisplay()
  const visibleV1Tabs = useMemo(
    () =>
      V1_TABS.filter((tab) => {
        const navLabel = TAB_ID_TO_NAV_LABEL[tab.id]
        if (!navLabel) return true
        return isVisible(navLabel)
      }),
    [isVisible]
  )

  const design: ResolvedProfileDesign =
    designProp ??
    resolveProfileDesign(
      {
        vcardPrimaryColor: '#dcc969',
        vcardAccentColor: '#dcc969',
        dashboardAccent: 'amber',
        fontFamily: 'inter',
        profileTemplate: 'v1',
        layoutStyle: 'classic',
        buttonStyle: 'solid',
        cornerStyle: 'round',
      },
      { darkMode: true }
    )

  const [activeTab, setActiveTab] = useState('home')

  const effectiveActiveTab = useMemo(() => {
    if (visibleV1Tabs.length === 0) return activeTab
    return visibleV1Tabs.some((t) => t.id === activeTab) ? activeTab : visibleV1Tabs[0].id
  }, [visibleV1Tabs, activeTab])

  const [internalTheme, setInternalTheme] = useState<'light' | 'dark'>(() => {
    if (embedded) return design.darkMode ? 'dark' : 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  })
  const theme = embedded && previewTheme !== undefined ? previewTheme : internalTheme
  const [activeModal, setActiveModal] = useState<ModalState>('none')
  const [showPreloader, setShowPreloader] = useState(!embedded)
  const [introAllowed, setIntroAllowed] = useState(false)
  const [notificationFlowDone, setNotificationFlowDone] = useState(false)

  const ownerId = cardOwnerId ?? '91'
  const experienceReady = introAllowed && (hasNotificationChoice(ownerId) || notificationFlowDone)

  const endPreloader = useCallback(() => {
    setShowPreloader(false)
    setIntroAllowed(true)
  }, [])

  useEffect(() => {
    if (!explainerVideoUrl?.trim()) {
      const t = window.setTimeout(() => endPreloader(), 900)
      return () => window.clearTimeout(t)
    }
    return undefined
  }, [explainerVideoUrl, endPreloader])

  useEffect(() => {
    if (!introAllowed || hasNotificationChoice(ownerId)) return
    const onSettled = () => setNotificationFlowDone(true)
    window.addEventListener('vbiz_profile_experience_settled', onSettled)
    return () => window.removeEventListener('vbiz_profile_experience_settled', onSettled)
  }, [introAllowed, ownerId])

  useEffect(() => {
    const handleOpenModal = () => setActiveModal('contact')
    window.addEventListener('open-save-contact-flow', handleOpenModal)
    return () => window.removeEventListener('open-save-contact-flow', handleOpenModal)
  }, [])

  useEffect(() => {
    if (embedded) return
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, embedded])

  useEffect(() => {
    console.log('🚀 vBiz Profile App Mounted (Version 1 - Classic)')
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (embedded && onPreviewThemeChange) {
      onPreviewThemeChange(next)
    } else {
      setInternalTheme(next)
    }
  }

  const accent = design.accentColor
  const rootStyle = {
    ...designToCssVars(design),
    ...(pageColors.pageBg ? { backgroundColor: pageColors.pageBg } : {}),
  }

  const renderContent = () => {
    switch (effectiveActiveTab) {
      case 'home':
        return <HomeSection key="home" />
      case 'about':
        return <AboutSection key="about" />
      case 'mission':
        return <MissionSection key="mission" />
      case 'services':
        return <ServicesSection key="services" />
      case 'gallery':
        return <ImageGallerySection key="gallery" />
      case 'videos':
        return <VideoLinksSection key="videos" />
      case 'public-cards':
        return <PublicCardsSection key="public-cards" />
      case 'certificates':
        return <CertificatesSection key="certificates" />
      case 'education':
        return <EducationSection key="education" />
      case 'work':
        return <ExperienceSection key="work" />
      case 'reviews':
        return <ReviewsSection key="reviews" />
      case 'calendar':
        return <CalendarSection key="calendar" />
      case 'faq':
        return <FAQSection key="faq" />
      case 'additional':
        return <AdditionalServicesSection key="additional" />
      case 'explainer':
        return <ExplainerSection key="explainer" />
      case 'blog':
        return <GeneralPostsSection key="blog" />
      default:
        return <HomeSection key="home" />
    }
  }

  const shellClass = embedded
    ? 'vbiz-profile-root vbiz-profile-v1 flex h-full min-h-0 w-full max-w-full flex-col overflow-hidden'
    : 'vbiz-profile-root vbiz-profile-v1 flex h-screen w-screen flex-col overflow-hidden'

  return (
    <div
      data-embedded={embedded ? '' : undefined}
      data-profile-template="v1"
      className={`${shellClass} font-sans transition-colors duration-700 selection:bg-[#dcc969]/30 selection:text-gray-900 dark:selection:text-white ${theme === 'dark' ? 'dark bg-[#050505] text-[#e0e0e0]' : 'bg-white text-gray-900'}`}
      style={rootStyle}
    >
      <ProfileThemeStyles design={design} />

      {showPreloader && explainerVideoUrl?.trim() && (
        <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-black/95 px-4 text-center text-white">
          <video
            key={explainerVideoUrl}
            src={explainerVideoUrl.trim()}
            className="max-h-[72vh] w-full max-w-3xl rounded-2xl border border-white/10 bg-black shadow-2xl"
            autoPlay
            playsInline
            controls
            onEnded={endPreloader}
          />
          <button
            type="button"
            onClick={endPreloader}
            className="mt-6 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold text-white backdrop-blur hover:bg-white/20"
          >
            Skip intro
          </button>
        </div>
      )}
      {showPreloader && !explainerVideoUrl?.trim() && (
        <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-[#050505] text-zinc-100">
          <div
            className="h-10 w-10 animate-spin rounded-full border-2 border-t-transparent"
            style={{ borderColor: accent, borderTopColor: 'transparent' }}
          />
          <p className="mt-4 text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase">Preparing</p>
        </div>
      )}

      <SiteGeometricGrid />
      <CursorTrail />

      {!embedded && (
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, x: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          type="button"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="pointer-events-auto fixed top-1/2 right-4 z-60 flex h-20 w-12 -translate-y-1/2 flex-col items-center justify-between rounded-4xl border border-black/5 bg-white p-2 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] sm:right-6 sm:h-24 sm:w-14 lg:p-3 dark:border-white/10 dark:bg-black/20 dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)]"
        >
          <div
            className={`flex aspect-square w-full items-center justify-center rounded-full transition-all duration-500 ${theme === 'light' ? 'text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-black/5 text-white/30 dark:bg-white/5'}`}
            style={theme === 'light' ? { backgroundColor: accent } : undefined}
          >
            <Sun size={20} className="sm:h-6 sm:w-6" />
          </div>
          <div
            className={`flex aspect-square w-full items-center justify-center rounded-full transition-all duration-500 ${theme === 'dark' ? 'text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'bg-gray-50 text-gray-500 dark:text-white/20'}`}
            style={theme === 'dark' ? { backgroundColor: accent } : undefined}
          >
            <Moon size={20} className="sm:h-6 sm:w-6" />
          </div>
        </motion.button>
      )}

      <header className="pointer-events-none fixed right-0 bottom-6 left-0 z-50 flex w-full justify-center px-4 lg:top-6 lg:bottom-auto">
        <div
          className="pointer-events-auto relative flex w-full max-w-[95vw] items-center overflow-hidden rounded-full border border-black/5 bg-white p-1.5 shadow-[0_30px_70px_-10px_rgba(0,0,0,0.15)] md:max-w-fit md:p-2 dark:border-white/15 dark:bg-black/80 dark:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.9)]"
          style={pageColors.navBg ? { backgroundColor: pageColors.navBg } : undefined}
        >
          <div className="no-scrollbar flex w-full cursor-grab items-center gap-2 overflow-x-auto scroll-smooth px-3 py-1 active:cursor-grabbing sm:gap-2.5 md:justify-center">
            {visibleV1Tabs.map((tab) => {
              const isActive = effectiveActiveTab === tab.id
              const tabBg = getNavTabBackgroundColor(displaySettings, tab.id)
              return (
                <motion.button
                  key={tab.id}
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  whileHover={{ scale: 1.1, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-500 sm:h-11 lg:h-12 lg:w-12 ${
                    isActive
                      ? 'text-black'
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-white/40 dark:hover:bg-white/5 dark:hover:text-white'
                  }`}
                  title={tab.label}
                  aria-label={tab.label}
                >
                  {isActive && (
                    <motion.div
                      layoutId="v1-activeTabIndicator"
                      className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.5)]"
                      style={{ backgroundColor: tabBg || accent }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <tab.icon
                    size={isActive ? 22 : 20}
                    className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-sm' : ''}`}
                  />
                </motion.button>
              )
            })}
          </div>
        </div>
      </header>

      <main className="relative flex h-full w-full flex-1 flex-col overflow-y-auto bg-white pt-6 pb-28 transition-colors duration-700 lg:pt-28 lg:pb-6 dark:bg-[#050505]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.05),transparent_50%)]" />
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1500px] flex-1 flex-col px-4 py-2 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </main>

      {!embedded && (
        <>
          <LiveAgent
            variant="v1"
            accentColor={design.accentColor}
            cardData={liveAgentCardData}
            readyToConnect={experienceReady}
          />
          <NotificationModal
            cardOwnerId={cardOwnerId ?? '91'}
            ownerName={liveAgentCardData?.ownerName ?? ownerName ?? 'Guest'}
            enabled={introAllowed}
          />
          <NotificationToast />
          <SaveContactModal
            isOpen={activeModal === 'contact'}
            onClose={() => setActiveModal('none')}
            onSuccess={() => {
              const pref = localStorage.getItem(`vbizme_notif_${cardOwnerId}`)
              if (pref) {
                setActiveModal('done')
              } else {
                setActiveModal('wallet')
              }
            }}
          />
          <SaveToWalletModal
            isOpen={activeModal === 'wallet'}
            onClose={() => setActiveModal('none')}
            onAction={() => setActiveModal('notification')}
          />
          <NotificationAskModal
            isOpen={activeModal === 'notification'}
            onClose={() => {
              localStorage.setItem(`vbizme_notif_${cardOwnerId}`, JSON.stringify({ asked: true, accepted: false }))
              setActiveModal('none')
            }}
            cardOwnerId={cardOwnerId ?? '91'}
            onAccept={(sub, preferences) => {
              localStorage.setItem(
                `vbizme_notif_${cardOwnerId}`,
                JSON.stringify({ asked: true, accepted: true, subscription: sub, preferences })
              )
              setActiveModal('done')
            }}
          />
          <NotificationSettingsModal
            isOpen={activeModal === 'settings'}
            onClose={() => setActiveModal('none')}
            cardOwnerId={cardOwnerId ?? '91'}
          />
          <DoneModal isOpen={activeModal === 'done'} onClose={() => setActiveModal('none')} />
        </>
      )}
    </div>
  )
}
