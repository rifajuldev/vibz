'use client'

import { isVideoUrl } from '@/lib/mediaUrl'
import type { ResolvedProfileDesign } from '@/lib/resolvedProfileDesign'
import {
  buttonStyleClasses,
  cornerStyleToRadius,
  designToCssVars,
  resolveProfileDesign,
} from '@/lib/resolvedProfileDesign'
import { getNavTabBackgroundColor, TAB_ID_TO_NAV_LABEL } from '@/lib/vcardDisplaySettings'
import {
  Award,
  Bell,
  Briefcase,
  Calendar,
  Camera,
  CheckCircle2,
  Download,
  FileEdit,
  Film,
  GraduationCap,
  Home,
  Lightbulb,
  Moon,
  PlaySquare,
  ScrollText,
  Settings,
  Share2,
  Star,
  Sun,
  User,
  Users,
  Wrench,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AboutSection } from './components/AboutSection'
import { CursorTrail } from './components/CursorTrail'
import { DoneModal } from './components/DoneModal'
import { EducationSection } from './components/EducationSection'
import { ExperienceSection } from './components/ExperienceSection'
import { FAQSection } from './components/FAQSection'
import { GeneralPostsSection } from './components/GeneralPostsSection'
import { HomeSectionV2 as HomeSection } from './components/HomeSectionV2'
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
import { VideoLinksSection } from './components/VideoLinksSection'
import { useDragScroll } from './hooks/useDragScroll'
import { useProfileDisplay } from './lib/profileDisplayContext'
import { shareProfile } from './lib/shareProfile'
import type { VBizProfileAppProps } from './profilePublicProps'
import { DEMO_PROFILE_PROPS, resolveProfileAvatarSrc } from './profilePublicProps'
import { ProfileThemeStyles } from './ProfileThemeStyles'

const NAV_CATEGORIES = [
  {
    title: 'Overview',
    items: [
      { id: 'home', icon: Home, label: 'Dashboard' },
      { id: 'about', icon: User, label: 'My Story' },
      { id: 'mission', icon: ScrollText, label: 'Mission & Vision' },
    ],
  },
  {
    title: 'Expertise',
    items: [
      { id: 'services', icon: Wrench, label: 'Core Services' },
      { id: 'additional', icon: Settings, label: 'Add-ons' },
      { id: 'blog', icon: FileEdit, label: 'Insights' },
    ],
  },
  {
    title: 'Media & Work',
    items: [
      { id: 'videos', icon: Film, label: 'Video Showcase' },
      { id: 'gallery', icon: Camera, label: 'Image Vault' },
      { id: 'explainer', icon: PlaySquare, label: 'Demo Reel' },
    ],
  },
  {
    title: 'Trust & Voice',
    items: [
      { id: 'reviews', icon: Star, label: 'Client Reviews' },
      { id: 'certificates', icon: Award, label: 'Certifications' },
      { id: 'education', icon: GraduationCap, label: 'Education' },
      { id: 'work', icon: Briefcase, label: 'Experience' },
    ],
  },
  {
    title: 'Network',
    items: [
      { id: 'public-cards', icon: Users, label: 'Connections' },
      { id: 'calendar', icon: Calendar, label: 'Book Time' },
      { id: 'faq', icon: Lightbulb, label: 'FAQ' },
    ],
  },
]

const ALL_TABS = NAV_CATEGORIES.flatMap((c) => c.items)

function filterTabsByDisplay<T extends { id: string }>(tabs: T[], isVisible: (key: string) => boolean): T[] {
  return tabs.filter((tab) => {
    const navLabel = TAB_ID_TO_NAV_LABEL[tab.id]
    if (!navLabel) return true
    return isVisible(navLabel)
  })
}

export type { VBizProfileAppProps } from './profilePublicProps'

export function VBizProfileApp({
  explainerVideoUrl,
  cardOwnerId = DEMO_PROFILE_PROPS.cardOwnerId,
  ownerName = DEMO_PROFILE_PROPS.ownerName,
  tagline = DEMO_PROFILE_PROPS.tagline,
  coverVideoUrl = DEMO_PROFILE_PROPS.coverVideoUrl,
  avatarVideoUrl,
  liveAgentCardData = DEMO_PROFILE_PROPS.liveAgentCardData,
  design: designProp,
  shareSlug,
  embedded = false,
  previewTheme,
  onPreviewThemeChange,
}: VBizProfileAppProps) {
  const { isVisible, pageColors, field, settings: displaySettings } = useProfileDisplay()
  const visibleTabs = useMemo(() => filterTabsByDisplay(ALL_TABS, isVisible), [isVisible])
  const showSaveContact = isVisible('Save Contact')
  const showShareBtn = isVisible('Share Btn')
  const headerTextColor = field('vCard Header Color').textColor || field('MyInfo section Name').textColor || undefined
  const navBgColor = pageColors.navBg

  const design: ResolvedProfileDesign =
    designProp ??
    resolveProfileDesign(
      {
        vcardPrimaryColor: '#eab308',
        vcardAccentColor: '#eab308',
        dashboardAccent: 'amber',
        fontFamily: 'inter',
        profileTemplate: 'v2',
        layoutStyle: 'classic',
        buttonStyle: 'solid',
        cornerStyle: 'round',
      },
      { darkMode: true }
    )

  const [activeTab, setActiveTab] = useState('home')

  const effectiveActiveTab = useMemo(() => {
    if (visibleTabs.length === 0) return activeTab
    return visibleTabs.some((t) => t.id === activeTab) ? activeTab : visibleTabs[0].id
  }, [visibleTabs, activeTab])

  const [internalTheme, setInternalTheme] = useState<'light' | 'dark'>(() => {
    if (embedded) return design.darkMode ? 'dark' : 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
  })
  const theme = embedded && previewTheme !== undefined ? previewTheme : internalTheme
  const [activeModal, setActiveModal] = useState<'contact' | 'wallet' | 'notification' | 'done' | 'settings' | null>(
    null
  )
  const [shareFeedback, setShareFeedback] = useState<string | null>(null)
  const scrollRef = useDragScroll<HTMLDivElement>()
  const coverVideoRef = useRef<HTMLVideoElement>(null)
  const avatarVideoRef = useRef<HTMLVideoElement>(null)
  const [showPreloader, setShowPreloader] = useState(!embedded)
  const [introAllowed, setIntroAllowed] = useState(embedded)

  const endPreloader = useCallback(() => {
    setShowPreloader(false)
    setIntroAllowed(true)
  }, [])

  useEffect(() => {
    if (embedded || explainerVideoUrl?.trim()) return
    const t = window.setTimeout(() => endPreloader(), 900)
    return () => window.clearTimeout(t)
  }, [embedded, explainerVideoUrl, endPreloader])

  const avatarDisplaySrc = useMemo(
    () => resolveProfileAvatarSrc(avatarVideoUrl, explainerVideoUrl),
    [avatarVideoUrl, explainerVideoUrl]
  )
  const avatarIsVideo = Boolean(avatarDisplaySrc && isVideoUrl(avatarDisplaySrc))
  const coverIsVideo = Boolean(coverVideoUrl?.trim() && isVideoUrl(coverVideoUrl))

  useEffect(() => {
    if (!introAllowed) return
    const play = async (el: HTMLVideoElement | null) => {
      if (!el) return
      try {
        el.muted = true
        await el.play()
      } catch {
        /* autoplay blocked — user gesture may be required */
      }
    }
    if (coverIsVideo) void play(coverVideoRef.current)
    if (avatarIsVideo) void play(avatarVideoRef.current)
  }, [introAllowed, coverIsVideo, avatarIsVideo])

  useEffect(() => {
    if (embedded) return
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme, embedded])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    if (embedded && onPreviewThemeChange) {
      onPreviewThemeChange(next)
    } else {
      setInternalTheme(next)
    }
  }

  const handleShare = useCallback(async () => {
    const result = await shareProfile({
      shareSlug,
      title: ownerName ?? 'Profile',
      text: `Check out ${ownerName ?? 'this'}'s digital business card`,
    })

    if (result === 'copied') {
      setShareFeedback('Link copied to clipboard')
      window.setTimeout(() => setShareFeedback(null), 2500)
    } else if (result === 'failed') {
      setShareFeedback('Unable to share — try copying the URL from your browser')
      window.setTimeout(() => setShareFeedback(null), 3000)
    }
  }, [shareSlug, ownerName])

  useEffect(() => {
    console.log('🚀 vBiz Profile App Mounted (Version 2 - Link in Bio)')
  }, [])

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

  const isHeroLayout = design.layoutStyle === 'hero'
  const cornerRadius = cornerStyleToRadius(design.cornerStyle)
  const ctaButtonClass = buttonStyleClasses(design.buttonStyle)
  const rootStyle = {
    ...designToCssVars(design),
    ...(pageColors.pageBg ? { backgroundColor: pageColors.pageBg } : {}),
  }

  return (
    <div
      data-embedded={embedded ? '' : undefined}
      className={`vbiz-profile-root w-full ${embedded ? 'relative isolate flex h-full min-h-0 max-w-full flex-col overflow-x-clip pb-0' : 'flex min-h-screen w-screen justify-center overflow-x-clip pb-24'} ${theme === 'dark' ? 'dark bg-[#09090b] text-zinc-200' : 'bg-zinc-50 text-zinc-900'} relative transition-colors duration-300 selection:bg-yellow-500/30 selection:text-white`}
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
        <div className="fixed inset-0 z-200 flex flex-col items-center justify-center bg-zinc-950 text-zinc-100 dark:bg-black">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-yellow-500 border-t-transparent" />
          <p className="mt-4 text-xs font-bold tracking-[0.3em] text-zinc-500 uppercase">Preparing</p>
        </div>
      )}
      <CursorTrail />

      {!embedded && (
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="fixed top-4 right-4 z-100 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800 p-2 text-zinc-200 transition-colors dark:bg-zinc-200 dark:text-zinc-800"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}

      {/* Abstract Animated Soft Background Waves */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 70, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] aspect-square w-[70vw] rounded-full blur-[140px]"
          style={{ backgroundColor: `${design.accentColor}14` }}
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 80, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10%] bottom-[-20%] aspect-square w-[60vw] rounded-full bg-zinc-800/10 blur-[140px]"
        />
      </div>

      {/* Cover Background Video */}
      <div
        className={`vbiz-cover-video absolute top-0 left-0 z-0 mt-0 w-full overflow-hidden ${isHeroLayout ? 'h-[70vh]' : 'h-[60vh]'}`}
      >
        {coverIsVideo ? (
          <video
            ref={coverVideoRef}
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover object-center opacity-100 brightness-105 filter"
            src={coverVideoUrl}
          />
        ) : coverVideoUrl ? (
          <img
            src={coverVideoUrl}
            alt=""
            className="h-full w-full object-cover object-center opacity-100 brightness-105 filter"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-48 bg-linear-to-t from-zinc-50 via-zinc-50/40 to-transparent dark:from-[#09090b] dark:via-[#09090b]/40" />
      </div>

      {/* Main Container */}
      <div
        className={`vbiz-profile-main relative z-20 mx-auto flex w-full max-w-[1032px] flex-col ${embedded ? 'min-h-0 max-w-full px-3.5 pt-24' : 'min-h-screen px-5 sm:px-8'} ${!embedded && (isHeroLayout ? 'pt-48 sm:pt-56' : 'pt-32 sm:pt-44')}`}
      >
        {/* Profile Header */}
        <header
          className={`relative flex w-full flex-col ${embedded ? 'mt-1 mb-8' : 'mb-10'} ${embedded || !isHeroLayout ? 'items-center text-center' : 'max-w-xl items-start text-left md:mx-auto md:items-center md:text-center'}`}
        >
          <div className={`group relative mb-6 ${!embedded && isHeroLayout ? 'self-start md:self-center' : ''}`}>
            <div
              className={`vbiz-profile-avatar relative z-10 overflow-hidden rounded-full border border-zinc-700 bg-zinc-900 transition-transform duration-500 group-hover:scale-[1.02] ${embedded ? 'h-24 w-24' : 'h-28 w-28 sm:h-36 sm:w-36'}`}
            >
              {avatarIsVideo ? (
                <video
                  ref={avatarVideoRef}
                  src={avatarDisplaySrc}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="h-full w-full scale-105 object-cover"
                />
              ) : avatarDisplaySrc ? (
                <img
                  src={avatarDisplaySrc}
                  alt={ownerName ? `${ownerName} profile` : 'Profile'}
                  className="h-full w-full scale-105 object-cover"
                />
              ) : null}
            </div>
            {/* Soft shadow underlying the avatar */}
            <div className="absolute right-1 bottom-1 z-20 rounded-full bg-green-500 p-1.5 text-zinc-950 shadow-sm ring-4 ring-zinc-50 dark:ring-[#09090b]">
              <CheckCircle2 size={16} fill="white" className="text-green-500" />
            </div>
          </div>

          <div className="vbiz-header-badges mb-4 flex items-center gap-2">
            <span className="rounded-full border border-zinc-300/50 bg-zinc-200/50 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-zinc-700 sm:text-xs dark:border-zinc-700/50 dark:bg-zinc-800/50 dark:text-zinc-300">
              A.I. Enabled
            </span>
            <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-semibold tracking-wide text-zinc-700 sm:text-xs dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <Star size={10} fill="currentColor" className="text-zinc-400" /> Verified
            </span>
          </div>

          {ownerName ? (
            <h1
              className={`vbiz-header-title mb-3 font-bold tracking-tight text-zinc-900 dark:text-zinc-100 ${embedded ? 'px-1 text-2xl' : 'text-3xl sm:text-4xl'}`}
              style={headerTextColor ? { color: headerTextColor } : undefined}
            >
              {ownerName}
            </h1>
          ) : null}
          {tagline ? (
            <p
              className={`vbiz-header-tagline mb-8 max-w-md font-medium text-zinc-600 dark:text-zinc-400 ${embedded ? 'px-1 text-sm' : 'text-sm sm:text-base'}`}
              style={headerTextColor ? { color: headerTextColor } : undefined}
            >
              {tagline}
            </p>
          ) : null}

          {(showSaveContact || showShareBtn) && (
            <div
              className={`vbiz-header-cta flex w-full min-w-0 items-center gap-3 ${embedded ? 'max-w-full justify-center' : `max-w-[280px] ${isHeroLayout ? 'justify-start md:justify-center' : 'justify-center'}`}`}
            >
              {showSaveContact && (
                <button
                  onClick={() => setActiveModal('contact')}
                  className={`vbiz-cta-primary flex min-w-0 flex-1 items-center justify-center gap-2 py-3 text-sm font-bold transition-all active:scale-95 ${ctaButtonClass}`}
                  style={{
                    borderRadius: cornerRadius,
                    ...(design.buttonStyle === 'solid' || design.buttonStyle === 'soft'
                      ? {
                          backgroundColor:
                            design.buttonStyle === 'soft' ? `${design.primaryColor}22` : design.primaryColor,
                          color: design.buttonStyle === 'soft' ? design.primaryColor : '#fff',
                        }
                      : design.buttonStyle === 'outline'
                        ? { color: design.primaryColor, borderColor: design.primaryColor }
                        : {}),
                  }}
                >
                  <Download size={16} className="shrink-0" /> <span className="truncate">Save Contact</span>
                </button>
              )}
              <div className="vbiz-cta-icon-row flex shrink-0 items-center gap-3">
                <button
                  onClick={() => setActiveModal('settings')}
                  className="vbiz-cta-icon flex h-12 w-12 shrink-0 items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                  style={{ borderRadius: cornerRadius }}
                >
                  <Bell size={18} />
                </button>
                {showShareBtn && (
                  <button
                    type="button"
                    onClick={handleShare}
                    className="vbiz-cta-icon flex h-12 w-12 shrink-0 items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition-all hover:bg-zinc-100 active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                    style={{ borderRadius: cornerRadius }}
                    aria-label="Share profile"
                  >
                    <Share2 size={18} />
                  </button>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Floating Top Nav (Scrollable Pills) */}
        <div className="vbiz-floating-nav sticky top-4 z-50 mx-auto mb-8 flex w-full max-w-full justify-center sm:top-6">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`vbiz-floating-nav-inner relative rounded-4xl border border-zinc-200/80 bg-white/80 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-3xl sm:rounded-full dark:border-zinc-700/50 dark:bg-zinc-900/80 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] ${embedded ? 'w-full max-w-[calc(100%-0.5rem)] min-w-0 overflow-hidden' : 'w-full max-w-full'}`}
            style={navBgColor ? { backgroundColor: navBgColor } : undefined}
          >
            <div
              ref={scrollRef}
              role="tablist"
              aria-label="Profile navigation"
              aria-orientation="horizontal"
              className={`vbiz-floating-nav-scroll no-scrollbar mask-edges flex cursor-grab items-center gap-1.5 overflow-x-auto px-1 active:cursor-grabbing sm:gap-2 sm:px-2 ${embedded ? 'min-w-0 flex-1' : 'max-w-full'}`}
            >
              {visibleTabs.map((tab, index) => {
                const isActive = effectiveActiveTab === tab.id
                const tabBg = getNavTabBackgroundColor(displaySettings, tab.id)
                return (
                  <motion.button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    tabIndex={isActive ? 0 : -1}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    onClick={() => setActiveTab(tab.id)}
                    onKeyDown={(e) => {
                      let nextIndex = index
                      if (e.key === 'ArrowRight') {
                        nextIndex = (index + 1) % visibleTabs.length
                      } else if (e.key === 'ArrowLeft') {
                        nextIndex = (index - 1 + visibleTabs.length) % visibleTabs.length
                      } else if (e.key === 'Home') {
                        nextIndex = 0
                      } else if (e.key === 'End') {
                        nextIndex = visibleTabs.length - 1
                      }
                      if (nextIndex !== index) {
                        e.preventDefault()
                        setActiveTab(visibleTabs[nextIndex].id)
                        document.getElementById(`tab-${visibleTabs[nextIndex].id}`)?.focus()
                      }
                    }}
                    title={tab.label}
                    className={`vbiz-nav-tab relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:h-14 sm:w-14 ${
                      isActive
                        ? 'z-10 mx-0.5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] sm:mx-1 dark:shadow-[0_4px_15px_rgba(255,255,255,0.1)]'
                        : 'text-zinc-500 hover:bg-zinc-200/50 hover:text-zinc-900 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        initial={false}
                        className={`absolute inset-0 rounded-full ${tabBg ? '' : 'bg-zinc-900 dark:bg-white'}`}
                        style={tabBg ? { backgroundColor: tabBg } : undefined}
                        transition={{ type: 'spring', stiffness: 500, damping: 25, mass: 1.5 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-center">
                      <tab.icon
                        strokeWidth={isActive ? 2.5 : 2}
                        className={`vbiz-nav-tab-icon h-[18px] w-[18px] transition-colors duration-300 sm:h-[22px] sm:w-[22px] ${isActive ? 'text-white dark:text-zinc-950' : 'text-zinc-500'}`}
                      />
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Main Content Pane */}
        <main
          className="relative w-full"
          role="tabpanel"
          id={`panel-${effectiveActiveTab}`}
          aria-labelledby={`tab-${effectiveActiveTab}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={effectiveActiveTab}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <AnimatePresence>
        {shareFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed bottom-24 left-1/2 z-250 -translate-x-1/2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
          >
            {shareFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      <LiveAgent variant="v2" embedded={embedded} cardData={liveAgentCardData} readyToConnect={introAllowed} />

      {!embedded && (
        <>
          <NotificationModal
            cardOwnerId={cardOwnerId ?? '91'}
            ownerName={liveAgentCardData?.ownerName ?? ownerName ?? 'Guest'}
            enabled={introAllowed}
          />
          <NotificationToast />
          <SaveContactModal
            isOpen={activeModal === 'contact'}
            onClose={() => setActiveModal(null)}
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
            onClose={() => setActiveModal(null)}
            onAction={(saved) => {
              console.log('Wallet saved:', saved)
              setActiveModal('notification')
            }}
          />
          <NotificationAskModal
            isOpen={activeModal === 'notification'}
            onClose={() => {
              localStorage.setItem(`vbizme_notif_${cardOwnerId}`, JSON.stringify({ asked: true, accepted: false }))
              setActiveModal(null)
            }}
            cardOwnerId={cardOwnerId ?? '91'}
            onAccept={(sub, preferences) => {
              localStorage.setItem(
                `vbizme_notif_${cardOwnerId}`,
                JSON.stringify({ asked: true, accepted: true, subscription: sub, preferences })
              )
              console.log('Permission accepted, preferences:', preferences)
              setActiveModal('done')
            }}
          />
          <NotificationSettingsModal
            isOpen={activeModal === 'settings'}
            onClose={() => setActiveModal(null)}
            cardOwnerId={cardOwnerId ?? '91'}
          />
          <DoneModal isOpen={activeModal === 'done'} onClose={() => setActiveModal(null)} />
        </>
      )}
    </div>
  )
}
