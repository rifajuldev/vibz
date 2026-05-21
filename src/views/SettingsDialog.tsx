'use client'

import { logout, useAuth } from '@/components/Auth'
import { ProfileTemplateLayoutSettings } from '@/components/ProfileTemplateLayoutSettings'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useTheme } from '@/lib/ThemeProvider'
import {
  setButtonStyle,
  setCornerStyle,
  setFontFamily,
  setVcardBranding,
} from '@/redux/features/designSettings/designSettings.slice'
import { cn } from '@/utils/cn'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  BarChart2,
  Bell,
  Briefcase,
  ChevronRight,
  Key,
  Layers,
  LayoutTemplate,
  Loader2,
  LogOut,
  Megaphone,
  Menu,
  Palette,
  Search,
  Settings,
  Shield,
  User,
  X,
} from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type MouseEventHandler, type ReactNode } from 'react'

const inputClasses =
  'w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-[14px] px-4 py-3.5 text-[13px] font-medium text-slate-900 dark:text-white transition-all outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 shadow-sm'

const sectionsGroups = [
  {
    groupName: 'Personal',
    items: [
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'security', label: 'Security', icon: Shield },
      { id: 'billing', label: 'Billing', icon: Key },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ],
  },
  {
    groupName: 'Design',
    items: [
      { id: 'template', label: 'Template', icon: LayoutTemplate },
      { id: 'appearance', label: 'Appearance', icon: Palette },
    ],
  },
  {
    groupName: 'Growth',
    items: [
      { id: 'integrations', label: 'Integrations', icon: Layers },
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
      { id: 'seo', label: 'SEO', icon: Search },
    ],
  },
  // {
  //   groupName: "Monetization",
  //   items: [
  //     { id: "earn", label: "Earn", icon: DollarSign },
  //     { id: "affiliate", label: "Affiliates", icon: Briefcase },
  //     { id: "subscribe", label: "Subscribe", icon: Mail },
  //   ]
  // },
  {
    groupName: 'Banners',
    items: [
      { id: 'support', label: 'Support', icon: Megaphone },
      { id: 'sensitive', label: 'Sensitive', icon: AlertTriangle },
    ],
  },
]

function CanvaSettingsModal({ onClose, onConnect }: { onClose: () => void; onConnect: () => void }) {
  const [step, setStep] = useState<'connect' | 'connecting' | 'connected'>('connect')

  const handleConnect = () => {
    setStep('connecting')
    setTimeout(() => {
      setStep('connected')
      setTimeout(() => {
        onConnect()
        onClose()
      }, 1500)
    }, 1500)
  }

  return (
    <div className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-slate-400/20 p-4 backdrop-blur-sm duration-200 dark:bg-black/60">
      <div className="animate-in zoom-in-95 relative w-full max-w-[400px] overflow-hidden rounded-[28px] border border-slate-200 bg-white p-8 shadow-2xl duration-300 dark:border-white/10 dark:bg-[#0b0f19]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-slate-200 p-2 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/10"
        >
          <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
        </button>

        <div className="text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-[24px] bg-linear-to-tr from-[#00C4CC] to-[#7D2AE8] p-[2px] shadow-[0_0_30px_rgba(125,42,232,0.3)]">
            <div className="flex h-full w-full items-center justify-center rounded-[22px] bg-white dark:bg-[#0b0f19]">
              <Palette className="h-10 w-10 text-[#00C4CC]" />
            </div>
          </div>

          <h3 className="mb-2 text-[22px] font-black text-slate-900 dark:text-white">Canva Integration</h3>
          <p className="mb-8 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            {step === 'connect' &&
              'Connect your Canva account to create custom profile images and wallpapers directly from your dashboard.'}
            {step === 'connecting' && 'Securely connecting to Canva...'}
            {step === 'connected' && 'Account connected successfully!'}
          </p>

          {step === 'connect' && (
            <button
              onClick={handleConnect}
              className="w-full rounded-[16px] border border-slate-200 bg-white py-4 text-[15px] font-bold text-slate-900 transition-all hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-[#0b0f19] dark:text-white"
            >
              Connect Canva
            </button>
          )}

          {step === 'connecting' && (
            <div className="flex items-center justify-center py-4 text-[#00C4CC]">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          )}

          {step === 'connected' && (
            <div className="flex items-center justify-center py-4 text-[18px] font-bold text-emerald-400">
              Connected!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type TabButtonProps = {
  active: boolean
  icon: LucideIcon
  label: string
  onClick: MouseEventHandler<HTMLButtonElement>
  isCollapsed: boolean
}

function TabButton({ active, icon: Icon, label, onClick, isCollapsed }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex w-full items-center gap-3.5 overflow-hidden rounded-[16px] px-4 py-3 text-[13.5px] font-bold transition-all',
        active
          ? 'scale-[1.02] bg-slate-900 text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] dark:bg-white dark:text-slate-900 dark:shadow-[0_8px_20px_-6px_rgba(255,255,255,0.3)]'
          : 'border border-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white',
        isCollapsed ? 'mx-auto h-12 w-12 justify-center rounded-[14px] px-0' : ''
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon
        className={cn('h-5 w-5 shrink-0 transition-all duration-300', active ? 'scale-105' : 'group-hover:scale-110')}
      />
      <span
        className={cn(
          'font-bold tracking-wide whitespace-nowrap transition-all duration-300',
          isCollapsed ? 'w-0 opacity-0 md:hidden' : 'opacity-100'
        )}
      >
        {label}
      </span>
      {active && !isCollapsed && (
        <span className="absolute right-3 h-1.5 w-1.5 animate-pulse rounded-full bg-white/50 dark:bg-slate-900/50" />
      )}
    </button>
  )
}

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  active: boolean
}

function Section({ id, title, children, active }: SectionProps) {
  if (!active) return null
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      id={id}
      className="scroll-mt-28 space-y-6"
    >
      <div className="flex flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/70 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl dark:border-white/10 dark:bg-[#070a13]/70 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
        <div className="relative p-8 sm:p-10">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent dark:via-white/10" />

          <div className="mb-8 flex items-center justify-between">
            <h3 className="flex items-center gap-4 text-[28px] font-black tracking-tight text-slate-900 dark:text-white">
              {title}
            </h3>
            {/* Optional decorative element */}
            <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-[18px] border border-slate-200/50 bg-slate-50 shadow-inner dark:border-white/5 dark:bg-white/5">
              <Settings className="h-5 w-5 text-slate-400 opacity-50" />
            </div>
          </div>

          <div className="space-y-10">{children}</div>
        </div>
      </div>
    </motion.div>
  )
}

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked?: boolean
  onChange?: () => void
}) {
  return (
    <label className="group flex cursor-pointer items-start justify-between gap-4 rounded-[20px] border border-transparent p-4 transition-colors hover:border-slate-200/50 hover:bg-slate-50/50 sm:items-center dark:hover:border-white/5 dark:hover:bg-white/2">
      <div className="flex-1">
        <h4 className="mb-0.5 text-[14px] font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-[13px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">{description}</p>
      </div>
      <button
        type="button"
        onClick={onChange}
        className={cn(
          'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full shadow-inner transition-colors',
          checked ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'
        )}
      >
        <span
          className={cn(
            'inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-300',
            checked ? 'translate-x-[22px]' : 'translate-x-1'
          )}
        />
      </button>
    </label>
  )
}

type ConnectRowProps = {
  icon: LucideIcon
  title: string
  isConnected?: boolean
  color?: string
  iconStyle?: string
  onClick?: () => void
  onDisconnect?: () => void
}

function ConnectRow({ icon: Icon, title, isConnected, color, iconStyle, onClick, onDisconnect }: ConnectRowProps) {
  return (
    <div className="group flex items-center justify-between rounded-[20px] border border-slate-200 bg-white p-4 font-medium shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] transition-all hover:shadow-md dark:border-white/5 dark:bg-[#0b0f19]">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-[16px] shadow-sm transition-transform group-hover:scale-105',
            iconStyle || 'border border-slate-100 bg-slate-50 dark:border-white/5 dark:bg-white/5'
          )}
        >
          <Icon className={cn('h-5 w-5', color || 'text-slate-900 dark:text-white')} />
        </div>
        <span className="text-[15px] font-bold text-slate-900 dark:text-white">{title}</span>
      </div>
      {isConnected ? (
        <button
          onClick={onDisconnect || onClick}
          className="group/btn flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-[12px] font-bold text-emerald-600 shadow-sm transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:border-red-500/20 dark:hover:bg-red-500/10 dark:hover:text-red-400"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-colors group-hover/btn:bg-red-500 dark:bg-emerald-400" />
          <span className="group-hover/btn:hidden">Connected</span>
          <span className="hidden group-hover/btn:inline">Disconnect</span>
        </button>
      ) : (
        <button
          onClick={onClick}
          className="flex items-center gap-2 rounded-[14px] bg-slate-900 px-5 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] active:scale-95 dark:bg-white dark:text-slate-900"
        >
          Connect <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default function SettingsDialog() {
  const { user } = useAuth()
  const router = useRouter()
  const { accentColor, setAccentColor } = useTheme()
  const dispatch = useAppDispatch()
  const buttonStyle = useAppSelector((s) => s.designSettings.buttonStyle)
  const cornerStyle = useAppSelector((s) => s.designSettings.cornerStyle)
  const fontFamily = useAppSelector((s) => s.designSettings.fontFamily)
  const vcardPrimaryColor = useAppSelector((s) => s.designSettings.vcardPrimaryColor)
  const vcardAccentColor = useAppSelector((s) => s.designSettings.vcardAccentColor)
  const [activeTab, setActiveTab] = useState('profile')
  const [showCanvaModal, setShowCanvaModal] = useState(false)
  const [canvaConnected, setCanvaConnected] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'dark-mode': document.documentElement.classList.contains('dark'),
    'email-notif': true,
    'security-alerts': true,
    'product-updates': false,
    'show-followers': false,
    'social-analysis': true,
    'publish-shop': false,
    'main-tab-shop': false,
    'support-banner': false,
    'sensitive-warning': false,
    'subscribe-btn': true,
    'utm-params': false,
    'hide-search': false,
  })

  const toggle = (key: string) => setToggles((p) => ({ ...p, [key]: !p[key] }))

  useEffect(() => {
    // Scroll spy logic removed in favor of content swapping
  }, [activeTab])

  useEffect(() => {
    const handleThemeChange = () => {
      setToggles((p) => ({
        ...p,
        'dark-mode': document.documentElement.classList.contains('dark'),
      }))
    }
    window.addEventListener('theme-change', handleThemeChange)
    return () => window.removeEventListener('theme-change', handleThemeChange)
  }, [])

  // Removed scrollToSection in favor of content swapping

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="bg-primary-600/10 pointer-events-none absolute top-20 left-1/2 h-[400px] w-full max-w-[800px] -translate-x-1/2 rounded-full blur-[150px]" />
      <div className="relative z-10 mx-auto max-w-[1100px] px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <div className="mb-14 flex items-center justify-between gap-5">
          <div className="flex items-center gap-5">
            <div className="bg-primary-50 dark:bg-primary-500/10 border-primary-100 dark:border-primary-500/20 relative flex h-16 w-16 items-center justify-center rounded-[20px] border shadow-sm">
              <div className="from-primary-500/10 pointer-events-none absolute inset-0 rounded-[20px] bg-linear-to-tr to-transparent" />
              <Settings className="text-primary-600 dark:text-primary-400 h-8 w-8" />
            </div>
            <div>
              <h2 className="text-[32px] leading-tight font-black tracking-tight text-slate-900 dark:text-white">
                Account Settings
              </h2>
              <p className="mt-1 text-[15px] font-medium text-slate-500 dark:text-slate-400">
                Manage your profile, preferences, and integrations.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-start gap-10 md:flex-row lg:gap-14">
          {/* Sidebar Nav */}
          <div
            className={cn(
              'no-scrollbar max-h-[calc(100vh-140px)] shrink-0 space-y-1.5 overflow-y-auto rounded-[32px] border border-slate-200/80 bg-white/70 pb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-3xl transition-all duration-400 ease-[0.23,1,0.32,1] md:sticky md:top-28 dark:border-white/10 dark:bg-[#070a13]/70 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]',
              isSidebarCollapsed ? 'w-full p-2 md:w-[84px] md:p-3' : 'w-full p-4 sm:p-5 md:w-[280px]'
            )}
          >
            <div className="mt-1 mb-3 flex items-center justify-between px-4">
              <h3
                className={cn(
                  'text-[11px] font-black tracking-[0.2em] whitespace-nowrap text-slate-500 uppercase transition-all duration-300 dark:text-slate-400',
                  isSidebarCollapsed ? 'hidden w-0 opacity-0 md:block' : 'opacity-100'
                )}
              >
                Settings
              </h3>
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="hidden rounded-2xl p-2 text-slate-500 transition-colors hover:bg-slate-200/50 md:flex dark:bg-white/5 dark:hover:bg-white/10"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              {sectionsGroups.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-1.5">
                  <h4
                    className={cn(
                      'mb-2 px-4 text-[10px] font-black tracking-widest text-slate-400 uppercase dark:text-slate-500',
                      isSidebarCollapsed ? 'mx-auto hidden text-center' : 'block'
                    )}
                  >
                    {group.groupName}
                  </h4>
                  {group.items.map((s) => (
                    <TabButton
                      key={s.id}
                      active={activeTab === s.id}
                      icon={s.icon}
                      label={s.label}
                      onClick={() => setActiveTab(s.id)}
                      isCollapsed={isSidebarCollapsed}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mx-2 my-6 h-px bg-slate-200/60 dark:bg-white/10"></div>
            <button
              onClick={handleLogout}
              className={cn(
                'group flex w-full items-center overflow-hidden rounded-2xl border border-transparent px-4 py-3.5 text-[13.5px] font-bold text-red-500 transition-all hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400',
                isSidebarCollapsed ? 'mx-auto h-12 w-12 justify-center rounded-[18px] px-0' : 'gap-3'
              )}
              title={isSidebarCollapsed ? 'Sign Out' : undefined}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span
                className={cn(
                  'font-semibold whitespace-nowrap transition-all duration-300',
                  isSidebarCollapsed ? 'w-0 opacity-0 md:hidden' : 'opacity-100'
                )}
              >
                Sign Out
              </span>
            </button>
          </div>

          {/* Content Area */}
          <div className="w-full flex-1 space-y-12 pb-32">
            <Section id="profile" active={activeTab === 'profile'} title="My Profile">
              <div className="flex flex-col items-start gap-6 rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-6 sm:flex-row sm:items-center dark:border-white/5 dark:bg-white/2">
                <div className="group relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b0f19]">
                  {user?.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Avatar"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <User className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                  )}
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-slate-900/40 opacity-0 backdrop-blur-[2px] transition-opacity group-hover:opacity-100">
                    <span className="text-[11px] font-bold tracking-wider text-white uppercase">Change</span>
                  </div>
                </div>
                <div>
                  <h4 className="mb-1 text-[20px] leading-tight font-black tracking-tight text-slate-900 dark:text-white">
                    {user?.displayName || 'User'}
                  </h4>
                  <p className="mb-4 text-[14px] font-medium text-slate-500 dark:text-slate-400">{user?.email}</p>
                  <div className="flex gap-3">
                    <button className="flex h-10 items-center rounded-[14px] border border-slate-200 bg-white px-5 py-2.5 text-[13px] font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                      Upload new
                    </button>
                    <button className="flex h-10 items-center rounded-[14px] bg-transparent px-5 py-2.5 text-[13px] font-bold text-slate-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="group space-y-2">
                    <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.displayName || ''}
                      className={inputClasses}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="group space-y-2">
                    <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        defaultValue={user?.email || ''}
                        readOnly
                        className={inputClasses + ' cursor-not-allowed bg-slate-100 opacity-60 dark:bg-slate-800/50'}
                      />
                      <span className="absolute top-1/2 right-3 -translate-y-1/2 rounded-[6px] bg-slate-200 px-2 py-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-700 dark:text-slate-400">
                        Read Only
                      </span>
                    </div>
                  </div>
                </div>
                <div className="group space-y-2">
                  <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                    Location
                  </label>
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className={inputClasses}
                    placeholder="e.g. San Francisco, CA"
                  />
                </div>
                <div className="group space-y-2">
                  <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                    Bio
                  </label>
                  <textarea
                    placeholder="Write a short bio about yourself..."
                    className={inputClasses + ' min-h-[120px] resize-none'}
                  ></textarea>
                  <p className="pr-2 text-right text-[12px] text-slate-400">Max 160 characters</p>
                </div>
              </div>

              <div className="flex justify-end border-t border-slate-200/50 pt-4 dark:border-white/5">
                <button className="rounded-[16px] bg-slate-900 px-8 py-3.5 text-[14px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] transition-all hover:shadow-[0_8px_25px_-6px_rgba(0,0,0,0.4)] active:scale-95 dark:bg-white dark:text-slate-900">
                  Save Changes
                </button>
              </div>
            </Section>

            <Section id="template" active={activeTab === 'template'} title="Template">
              <div className="space-y-12">
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
                  These choices are the default template and layout for every new vCard you create. Each card can be
                  customized separately in the vCard editor.
                </p>
                <ProfileTemplateLayoutSettings scope="account" />

                <div className="h-px w-full bg-slate-200/50 dark:bg-white/5"></div>

                <div>
                  <h4 className="mb-4 text-[15px] font-black text-slate-900 dark:text-white">Button Style</h4>
                  <div className="no-scrollbar inline-flex w-full gap-2 overflow-x-auto rounded-[20px] border border-slate-200/50 bg-slate-50/50 p-2 dark:border-white/5 dark:bg-white/2">
                    {['solid', 'glass', 'outline', 'soft'].map((style) => (
                      <button
                        key={style}
                        onClick={() => dispatch(setButtonStyle(style))}
                        className={cn(
                          'min-w-[100px] flex-1 rounded-[14px] px-6 py-3 text-[13.5px] font-bold capitalize transition-all',
                          buttonStyle === style
                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4 text-[15px] font-black text-slate-900 dark:text-white">Corner Roundness</h4>
                  <div className="no-scrollbar inline-flex w-full gap-2 overflow-x-auto rounded-[20px] border border-slate-200/50 bg-slate-50/50 p-2 dark:border-white/5 dark:bg-white/2">
                    {[
                      { id: 'square', label: 'Square', class: 'rounded-none' },
                      { id: 'soft', label: 'Soft', class: 'rounded-[8px]' },
                      { id: 'round', label: 'Round', class: 'rounded-[16px]' },
                      { id: 'pill', label: 'Pill', class: 'rounded-full' },
                    ].map((corner) => (
                      <button
                        key={corner.id}
                        onClick={() => dispatch(setCornerStyle(corner.id))}
                        className={cn(
                          'min-w-[100px] flex-1 rounded-[14px] px-4 py-3 text-[13.5px] font-bold transition-all',
                          cornerStyle === corner.id
                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        )}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <div className={cn('h-4 w-4 border-2 border-current opacity-50', corner.class)}></div>
                          {corner.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section id="appearance" active={activeTab === 'appearance'} title="Appearance">
              <div className="space-y-6">
                <ToggleRow
                  title="Dark mode pattern"
                  description="Toggle between light and dark visual themes for this dashboard."
                  checked={toggles['dark-mode']}
                  onChange={() => {
                    const isNowDark = !toggles['dark-mode']
                    toggle('dark-mode')
                    if (isNowDark) {
                      document.documentElement.classList.add('dark')
                      localStorage.setItem('theme', 'dark')
                    } else {
                      document.documentElement.classList.remove('dark')
                      localStorage.setItem('theme', 'light')
                    }
                    window.dispatchEvent(new Event('theme-change'))
                  }}
                />
              </div>

              <div className="my-8 h-px w-full bg-slate-200/50 dark:bg-white/5"></div>

              <div className="space-y-6">
                <div>
                  <h4 className="mb-1.5 text-[15px] font-black text-slate-900 dark:text-white">
                    vCard Branding Colors
                  </h4>
                  <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                    Set the foundational color scheme for your public vCard.
                  </p>

                  <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Color Pickers */}
                    <div className="flex shrink-0 gap-4">
                      <div className="flex flex-col gap-3">
                        <label className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800">
                          Primary
                        </label>
                        <div className="relative h-20 w-20 overflow-hidden rounded-[20px] border border-slate-200/50 shadow-sm transition-transform hover:scale-105 dark:border-white/10">
                          <input
                            type="color"
                            value={vcardPrimaryColor}
                            onChange={(e) => dispatch(setVcardBranding({ primary: e.target.value }))}
                            className="absolute -top-4 -left-4 h-[150%] w-[150%] cursor-pointer"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="inline-flex w-fit rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:bg-slate-800">
                          Accent
                        </label>
                        <div className="relative h-20 w-20 overflow-hidden rounded-[20px] border border-slate-200/50 shadow-sm transition-transform hover:scale-105 dark:border-white/10">
                          <input
                            type="color"
                            value={vcardAccentColor}
                            onChange={(e) => dispatch(setVcardBranding({ accent: e.target.value }))}
                            className="absolute -top-4 -left-4 h-[150%] w-[150%] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Visual Preview */}
                    <div className="relative flex flex-1 flex-col justify-center gap-6 overflow-hidden rounded-[24px] border border-slate-200/50 bg-linear-to-br from-slate-50 to-slate-100/50 p-8 shadow-inner dark:border-white/5 dark:from-[#0b0f19] dark:to-slate-900/50">
                      <div
                        className="pointer-events-none absolute top-0 right-0 h-64 w-64 opacity-20 blur-[80px] transition-colors duration-500"
                        style={{ backgroundColor: vcardPrimaryColor }}
                      ></div>
                      <div
                        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 opacity-10 blur-[60px] transition-colors duration-500"
                        style={{ backgroundColor: vcardAccentColor }}
                      ></div>

                      <p className="z-10 mb-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                        Live UI Preview
                      </p>

                      <div className="z-10 flex w-full flex-wrap items-center gap-4">
                        <button
                          className="rounded-[16px] px-6 py-3 text-[14px] font-bold text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-0.5"
                          style={{ backgroundColor: vcardPrimaryColor }}
                        >
                          Primary Action
                        </button>
                        <button
                          className="rounded-[16px] border-2 bg-white px-6 py-3 text-[14px] font-bold shadow-sm transition-transform hover:-translate-y-0.5 dark:bg-slate-900"
                          style={{ color: vcardPrimaryColor, borderColor: vcardPrimaryColor }}
                        >
                          Secondary
                        </button>
                      </div>
                      <div className="z-10 flex w-full items-center gap-4 rounded-[18px] border border-slate-100/50 bg-white p-4 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] transition-transform hover:translate-x-1 dark:border-white/5 dark:bg-slate-800">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-white shadow-inner"
                          style={{ backgroundColor: vcardAccentColor }}
                        >
                          <Briefcase className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-[14px] font-bold text-slate-900 dark:text-white">Professional Role</p>
                          <span
                            className="text-[12px] font-semibold underline decoration-2 underline-offset-4"
                            style={{ textDecorationColor: vcardAccentColor, color: vcardAccentColor }}
                          >
                            View More details
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-8 h-px w-full bg-slate-200/50 dark:bg-white/5"></div>

                <div>
                  <h4 className="mb-6 text-[15px] font-black text-slate-900 dark:text-white">Typography System</h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        id: 'inter',
                        name: 'Inter',
                        desc: 'Clean, versatile, highly legible UI standard.',
                        preview_class: 'font-sans tracking-tight',
                      },
                      {
                        id: 'outfit',
                        name: 'Outfit',
                        desc: 'Modern, geometric, bold appearance.',
                        preview_class: 'font-sans tracking-wide',
                      },
                      {
                        id: 'mono',
                        name: 'JetBrains',
                        desc: 'Technical, crisp, code-like aesthetic.',
                        preview_class: 'font-mono tracking-tight',
                      },
                      {
                        id: 'serif',
                        name: 'Playfair',
                        desc: 'Elegant, classic, editorial feel.',
                        preview_class: 'font-serif tracking-normal',
                      },
                    ].map((font) => (
                      <button
                        key={font.id}
                        onClick={() => dispatch(setFontFamily(font.id))}
                        className={cn(
                          'group relative flex items-start gap-5 overflow-hidden rounded-[24px] border p-6 text-left transition-all hover:shadow-md',
                          fontFamily === font.id
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-[0_4px_20px_-4px_rgba(99,102,241,0.2)]'
                            : 'hover:border-primary-500/30 border-slate-200/80 bg-slate-50/30 dark:border-white/10 dark:bg-slate-800/20'
                        )}
                      >
                        {fontFamily === font.id && (
                          <div className="from-primary-500/5 pointer-events-none absolute inset-0 bg-linear-to-br to-transparent"></div>
                        )}
                        <div
                          className={cn(
                            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[2.5px] transition-colors',
                            fontFamily === font.id
                              ? 'border-primary-500'
                              : 'group-hover:border-primary-400 border-slate-300/80 dark:border-slate-600'
                          )}
                        >
                          {fontFamily === font.id && (
                            <div className="bg-primary-500 h-2.5 w-2.5 rounded-full shadow-sm" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className={cn(
                              'mb-1.5 text-[18px] font-black text-slate-900 dark:text-white',
                              font.preview_class
                            )}
                            style={{
                              fontFamily:
                                font.id === 'mono' ? 'monospace' : font.id === 'serif' ? 'serif' : 'sans-serif',
                            }}
                          >
                            Aa - {font.name}
                          </p>
                          <p className="text-[13px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                            {font.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="my-8 h-px w-full bg-slate-200/50 dark:bg-white/5"></div>
              <div>
                <h4 className="mb-2 text-[15px] font-black text-slate-900 dark:text-white">Dashboard Accent</h4>
                <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                  Select a primary accent color specifically for your private application dashboard.
                </p>
                <div className="flex w-full flex-wrap items-center gap-4 rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-4 dark:border-white/5 dark:bg-white/2">
                  {(['indigo', 'emerald', 'amber', 'rose', 'sky'] as const).map((color) => (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      className={cn(
                        'flex h-12 w-12 max-w-[80px] min-w-[60px] flex-1 items-center justify-center rounded-[16px] transition-all',
                        accentColor === color
                          ? 'ring-primary-500 z-10 scale-110 shadow-lg ring-2 ring-offset-2 dark:ring-offset-[#0b0f19]'
                          : 'opacity-80 hover:scale-105 hover:opacity-100',
                        color === 'indigo' && 'bg-[#6366f1]',
                        color === 'emerald' && 'bg-[#10b981]',
                        color === 'amber' && 'bg-[#f59e0b]',
                        color === 'rose' && 'bg-[#f43f5e]',
                        color === 'sky' && 'bg-[#0ea5e9]'
                      )}
                    >
                      {accentColor === color && (
                        <div className="h-5 w-5 rounded-full bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="notifications" active={activeTab === 'notifications'} title="Notifications">
              <div className="space-y-4">
                <ToggleRow
                  title="Email notifications"
                  description="Receive a daily summary of your activity and audience insights."
                  checked={toggles['email-notif']}
                  onChange={() => toggle('email-notif')}
                />
                <ToggleRow
                  title="Security alerts"
                  description="Get notified about unrecognized logins or password changes."
                  checked={toggles['security-alerts']}
                  onChange={() => toggle('security-alerts')}
                />
                <ToggleRow
                  title="Product updates"
                  description="Stay in the loop with the latest features and announcements."
                  checked={toggles['product-updates']}
                  onChange={() => toggle('product-updates')}
                />
              </div>
            </Section>

            <Section id="security" active={activeTab === 'security'} title="Security">
              <div className="space-y-8">
                <div className="space-y-6 rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/2">
                  <div className="group space-y-2">
                    <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                      Current Password
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClasses} />
                  </div>
                  <div className="h-px bg-slate-200/50 dark:bg-white/5"></div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="group space-y-2">
                      <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                        New Password
                      </label>
                      <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                    <div className="group space-y-2">
                      <label className="group-focus-within:text-primary-500 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors dark:text-slate-400">
                        Confirm Password
                      </label>
                      <input type="password" placeholder="••••••••" className={inputClasses} />
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button className="rounded-[14px] bg-slate-900 px-6 py-3 text-[13px] font-bold text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] transition-all hover:shadow-[0_8px_25px_-6px_rgba(0,0,0,0.4)] active:scale-95 dark:bg-white dark:text-slate-900">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </Section>

            <Section id="integrations" active={activeTab === 'integrations'} title="Integrations">
              <div className="space-y-12">
                {/* <div>
                  <h4 className="text-[15px] font-black text-slate-900 dark:text-white mb-2">
                    Social media
                  </h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    Display your social content, compare your analytics, create
                    shoppable posts, and auto-reply to comments.
                  </p>
                  <div className="space-y-3 mb-8">
                    <ConnectRow
                      icon={Instagram}
                      title="Instagram"
                      iconStyle="bg-pink-50 dark:bg-pink-500/10 border-pink-100 dark:border-pink-500/20"
                      color="text-pink-600 dark:text-pink-400"
                    />
                    <ConnectRow
                      icon={PlaySquare}
                      title="TikTok"
                      iconStyle="bg-slate-100 dark:bg-white/10 border-slate-200 dark:border-white/20"
                      color="text-slate-900 dark:text-white"
                    />
                    <ConnectRow
                      icon={Youtube}
                      title="YouTube"
                      iconStyle="bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20"
                      color="text-red-600 dark:text-red-400"
                    />
                  </div>
                  <div className="space-y-4">
                    <ToggleRow
                      title="Show total followers"
                      description="Display your total follower count across Instagram, TikTok, and YouTube below your profile image."
                      checked={toggles["show-followers"]}
                      onChange={() => toggle("show-followers")}
                    />
                    <ToggleRow
                      title="Social content analysis"
                      description="Use connected social content and metrics to analyze engagement and generate AI insights."
                      checked={toggles["social-analysis"]}
                      onChange={() => toggle("social-analysis")}
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-slate-200/50 dark:bg-white/5"></div>

                <div>
                  <h4 className="text-[15px] font-black text-slate-900 dark:text-white mb-2">
                    Mailing list
                  </h4>
                  <p className="text-[14px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    Sync your Audience to your favorite tools to send
                    newsletters and promotions.
                  </p>
                  <div className="space-y-3">
                    <ConnectRow
                      icon={Mailbox}
                      title="Mailchimp"
                      iconStyle="bg-yellow-50 dark:bg-yellow-500/10 border-yellow-100 dark:border-yellow-500/20"
                      color="text-yellow-600 dark:text-yellow-400"
                    />
                    <ConnectRow
                      icon={Layers}
                      title="Klaviyo"
                      iconStyle="bg-red-50 dark:bg-red-500/10 border-red-100 dark:border-red-500/20"
                      color="text-red-500 dark:text-red-400"
                    />
                    <ConnectRow
                      icon={Database}
                      title="Google Sheets"
                      iconStyle="bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20"
                      color="text-emerald-600 dark:text-emerald-400"
                    />
                  </div>
                </div>

                <div className="h-px w-full bg-slate-200/50 dark:bg-white/5"></div> */}

                <div>
                  <h4 className="mb-2 text-[15px] font-black text-slate-900 dark:text-white">Design tools</h4>
                  <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                    Connect with Canva to create custom profile images and wallpapers.
                  </p>
                  <div className="space-y-3">
                    <ConnectRow
                      icon={Palette}
                      title="Canva"
                      iconStyle="bg-primary-50 dark:bg-primary-500/10 border-primary-100 dark:border-primary-500/20"
                      color="text-primary-600 dark:text-primary-400"
                      isConnected={canvaConnected}
                      onClick={() => {
                        if (!canvaConnected) setShowCanvaModal(true)
                      }}
                      onDisconnect={() => setCanvaConnected(false)}
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section id="analytics" active={activeTab === 'analytics'} title="Analytics">
              <p className="mb-8 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                Integrate pixels to track your events in Facebook and Google.
              </p>
              <div className="space-y-8">
                <div>
                  <h4 className="mb-3 pl-1 text-[14px] font-bold text-slate-900 dark:text-white">Facebook</h4>
                  <div className="space-y-4 rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/2">
                    <input type="text" placeholder="Pixel ID (Example: 1234567890)" className={inputClasses} />
                    <input type="text" placeholder="Facebook Conversions API Access Token" className={inputClasses} />
                  </div>
                </div>
                <div>
                  <h4 className="mb-3 pl-1 text-[14px] font-bold text-slate-900 dark:text-white">Google</h4>
                  <div className="rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/2">
                    <input
                      type="text"
                      placeholder="Google Measurement ID (Example: G-XXXXXXX)"
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div className="pt-2"></div>
                <ToggleRow
                  title="UTM Parameters"
                  description="Make Google Analytics show traffic as 'social' traffic. The campaign parameter is set dynamically from the title of each link."
                  checked={toggles['utm-params']}
                  onChange={() => toggle('utm-params')}
                />
              </div>
            </Section>

            <Section id="earn" active={activeTab === 'earn'} title="Earn">
              <div className="space-y-10">
                <div>
                  <h4 className="mb-3 text-[15px] font-black text-slate-900 dark:text-white">Shop</h4>
                  <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                    Manage how your Shop tab appears on your profile.
                  </p>
                  <div className="space-y-4">
                    <ToggleRow
                      title="Publish Shop"
                      description="Have your Shop tab visible on your profile."
                      checked={toggles['publish-shop']}
                      onChange={() => toggle('publish-shop')}
                    />
                    <ToggleRow
                      title="Set Shop as main tab"
                      description="When visitors arrive on your profile, they'll see your Shop first."
                      checked={toggles['main-tab-shop']}
                      onChange={() => toggle('main-tab-shop')}
                    />
                  </div>
                </div>
              </div>
            </Section>

            <Section id="support" active={activeTab === 'support'} title="Support Banner">
              <ToggleRow
                title="Show your support"
                description="Show your support for important causes with a profile banner. Only one banner can be active at a time."
                checked={toggles['support-banner']}
                onChange={() => toggle('support-banner')}
              />
            </Section>

            <Section id="sensitive" active={activeTab === 'sensitive'} title="Sensitive Material">
              <ToggleRow
                title="Sensitive material"
                description="Display a sensitive content warning before visitors can view your profile."
                checked={toggles['sensitive-warning']}
                onChange={() => toggle('sensitive-warning')}
              />
            </Section>

            <Section id="subscribe" active={activeTab === 'subscribe'} title="Subscribe">
              <div className="space-y-8">
                <ToggleRow
                  title="Let visitors subscribe"
                  description="Add a button so visitors can subscribe to your profile. Turning off this feature will not affect your current subscriber count."
                  checked={toggles['subscribe-btn']}
                  onChange={() => toggle('subscribe-btn')}
                />
                <button className="inline-flex items-center gap-2 rounded-[14px] border border-slate-200/80 bg-white px-6 py-3 text-[13px] font-bold text-slate-900 shadow-sm transition-all hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
                  See subscriber insights
                </button>
              </div>
            </Section>

            <Section id="seo" active={activeTab === 'seo'} title="SEO">
              <div className="space-y-8">
                <div>
                  <h4 className="mb-2 pl-1 text-[15px] font-black text-slate-900 dark:text-white">Custom metadata</h4>
                  <p className="mb-6 pl-1 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                    Changes to metadata may take some time to appear on other platforms.
                  </p>
                  <div className="space-y-4 rounded-[24px] border border-slate-200/50 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/2">
                    <input type="text" placeholder="Meta title (Example: @yourname)" className={inputClasses} />
                    <textarea
                      placeholder="Meta description (Example: Make your link do more.)"
                      className={inputClasses + ' min-h-[100px] resize-none'}
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2"></div>
                <ToggleRow
                  title="Hide profile from search engines"
                  description="Adds a noindex tag to your profile so search engines won't include it in results."
                  checked={toggles['hide-search']}
                  onChange={() => toggle('hide-search')}
                />
              </div>
            </Section>

            <Section id="affiliate" active={activeTab === 'affiliate'} title="Affiliates">
              <div>
                <h4 className="mb-2 text-[15px] font-black text-slate-900 dark:text-white">Affiliate programs</h4>
                <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                  Earn commission by referring visitors to products and services from your links. Not a member of an
                  affiliate program?{' '}
                  <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline">
                    Learn how to get started
                  </a>
                </p>
                <button className="inline-flex items-center gap-2 rounded-[14px] bg-slate-900 px-6 py-3 text-[13px] font-bold text-white shadow-md transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                  Connect program
                </button>
                <div className="mt-8 rounded-[16px] border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/10 dark:bg-amber-500/5">
                  <p className="text-[13px] leading-relaxed font-medium text-amber-800 dark:text-amber-400/80">
                    Unknown affiliate credentials are applied by default to some products. We encourage you to replace
                    them with your own credentials.{' '}
                    <a href="#" className="font-bold text-amber-900 underline dark:text-amber-300">
                      How it works
                    </a>
                  </p>
                </div>
              </div>
            </Section>

            <Section id="billing" active={activeTab === 'billing'} title="Billing & Plan">
              <div>
                <h4 className="mb-2 text-[15px] font-black text-slate-900 dark:text-white">Subscription & Billing</h4>
                <p className="mb-6 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
                  Manage your plan, billing details, and view payment history.
                </p>
                <button className="inline-flex items-center gap-2 rounded-[14px] bg-slate-900 px-6 py-3.5 text-[13px] font-bold text-white shadow-[0_4px_12px_-4px_rgba(0,0,0,0.3)] transition-all hover:shadow-md active:scale-95 dark:bg-white dark:text-slate-900">
                  Manage Billing settings <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              </div>
            </Section>
          </div>
        </div>

        {showCanvaModal && (
          <CanvaSettingsModal onClose={() => setShowCanvaModal(false)} onConnect={() => setCanvaConnected(true)} />
        )}
      </div>
    </div>
  )
}
