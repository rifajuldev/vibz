'use client'

import { TabEducation } from '@/components/VCardEducation'
import { TabExperience } from '@/components/VCardExperience'
import { TabGeneral } from '@/components/VCardGeneral'
import { TabLinkShortener } from '@/components/VCardLinkShortener'
import { VCardLivePreview } from '@/components/VCardLivePreview'
import { TabPortfolio } from '@/components/VCardPortfolio'
import { TabServices } from '@/components/VCardServices'
import { TabSetting } from '@/components/VCardSetting'
import { TabSkill } from '@/components/VCardSkill'
import { Tab1MediaProfile } from '@/components/VCardTab1'
import { Tab2PersonalInfo } from '@/components/VCardTab2'
import { Tab3SocialGames } from '@/components/VCardTab3'
import { Tab4HomeMedia } from '@/components/VCardTab4'
import { Tab5ExtraFields } from '@/components/VCardTab5'
import { useVCard } from '@/lib/VCardContext'
import { cn } from '@/utils/cn'
import {
  ArrowLeft,
  Briefcase,
  CheckCircle,
  ChevronRight,
  Eye,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Settings,
  Star,
  User,
} from 'lucide-react'
import Link from 'next/link'
import { MouseEvent, useRef, useState } from 'react'

const navItems = [
  { name: 'Personal', icon: User },
  { name: 'Education', icon: GraduationCap },
  { name: 'Experience', icon: Briefcase },
  { name: 'Skill', icon: Star },
  { name: 'Services', icon: Settings },
  { name: 'Portfolio', icon: ImageIcon },
  { name: 'General', icon: FileText },
  { name: 'Link shortener', icon: LinkIcon },
]

const subTabs = [
  { id: 1, name: 'Media & Profile' },
  { id: 2, name: 'Personal Info' },
  { id: 3, name: 'Social & Games' },
  { id: 4, name: 'Home Media' },
  { id: 5, name: 'Extra Fields' },
]

function useDragScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [didDrag, setDidDrag] = useState(false) // To prevent click if dragged

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    setIsDragging(true)
    setDidDrag(false)
    setStartX(e.pageX - ref.current.offsetLeft)
    setScrollLeft(ref.current.scrollLeft)
  }

  const onMouseLeave = () => {
    setIsDragging(false)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) return
    e.preventDefault()
    setDidDrag(true)
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - startX) * 2
    ref.current.scrollLeft = scrollLeft - walk
  }

  return {
    scrollProps: {
      ref,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onMouseMove,
      className: cn('no-scrollbar overflow-x-auto', isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'),
    },
    didDrag,
    className: cn('no-scrollbar overflow-x-auto', isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'), // keep it just in case
  }
}

export default function VCardEdit() {
  const { vCardData, updateData, saveVCard, isCreateMode } = useVCard()
  const [activeTab, setActiveTab] = useState(1)
  const [activeNav, setActiveNav] = useState('Personal')
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const mainNavScroll = useDragScroll()
  const rightNavScroll = useDragScroll()
  const subNavScroll = useDragScroll()

  return (
    <div className="relative flex min-h-screen w-full justify-center px-4 pt-10 pb-24 sm:px-6">
      {/* Background glow for premium feel */}
      <div className="bg-primary-500/10 pointer-events-none fixed top-20 left-1/2 h-[500px] w-full max-w-[1000px] -translate-x-1/2 rounded-full blur-[150px]" />

      <div className="relative z-10 flex w-full max-w-[1300px] flex-col gap-6">
        {isCreateMode && (
          <Link
            href="/vcards"
            className="hover:border-primary-500/30 inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white/80 px-4 py-2.5 text-[13px] font-semibold text-slate-700 shadow-sm backdrop-blur transition-all hover:text-slate-900 dark:border-white/10 dark:bg-[#0b0f19]/80 dark:text-slate-300 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My vCards
          </Link>
        )}

        {/* Top Navigation Bar */}
        <div className="flex w-full justify-center">
          <div className="relative flex w-full flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white/60 p-2 shadow-sm backdrop-blur-2xl md:flex-row md:items-center dark:border-white/5 dark:bg-[#0b0f19]/60">
            <div
              {...mainNavScroll.scrollProps}
              className={cn('flex flex-1 shrink-0 items-center gap-1 px-2 md:px-4', mainNavScroll.className)}
            >
              {navItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    if (mainNavScroll.didDrag) {
                      e.preventDefault()
                      return
                    }
                    setActiveNav(item.name)
                    if (item.name === 'Personal') setActiveTab(1)
                  }}
                  className={cn(
                    'flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-300',
                    activeNav === item.name
                      ? 'bg-primary-600 border-primary-500/50 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/30 scale-[1.02] border text-white shadow-sm'
                      : 'border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                  )}
                >
                  <item.icon
                    className={cn(
                      'h-4 w-4',
                      activeNav === item.name
                        ? 'dark:text-primary-400 text-white'
                        : 'text-slate-500 dark:text-slate-400'
                    )}
                  />
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mx-2 hidden h-8 w-px shrink-0 bg-slate-200 md:block dark:bg-white/10" />

            <div
              {...rightNavScroll.scrollProps}
              className={cn('flex shrink-0 items-center gap-3 px-2 pb-2 md:pb-0', rightNavScroll.className)}
            >
              <button
                onClick={(e) => {
                  if (rightNavScroll.didDrag) {
                    e.preventDefault()
                    return
                  }
                  setActiveNav('Setting')
                }}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-300',
                  activeNav === 'Setting'
                    ? 'bg-primary-600 border-primary-500/50 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/30 scale-[1.02] border text-white shadow-sm'
                    : 'border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                )}
              >
                <Settings
                  className={cn('h-4 w-4', activeNav === 'Setting' ? 'dark:text-primary-400 text-white' : '')}
                />
                Settings
              </button>

              <button className="hover:border-primary-500/50 dark:hover:text-primary-400 group flex shrink-0 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap text-slate-700 shadow-sm transition-all duration-300 hover:text-slate-900 dark:border-white/10 dark:bg-[#1e2333] dark:text-slate-200">
                <FileText className="text-primary-600 dark:text-primary-400 h-4 w-4" />
                My vCard
              </button>

              <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 whitespace-nowrap shadow-sm dark:border-white/5 dark:bg-white/5">
                <span className="pointer-events-none text-[11px] font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                  Visibility
                </span>
                <label
                  className="group flex cursor-pointer items-center justify-center"
                  onClick={(e) => rightNavScroll.didDrag && e.preventDefault()}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={vCardData.isPublic}
                      onChange={(e) => !rightNavScroll.didDrag && updateData('isPublic', e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-10 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex w-full flex-col">
          {activeNav === 'Setting' ? (
            <TabSetting />
          ) : (
            <div className="relative flex min-h-[700px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#0b0f19]">
              {/* Subtle inner top highlight */}
              <div className="via-primary-500/10 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

              {/* Context Header and Sub Navigation for the active section inside the card */}
              {activeNav === 'Personal' && (
                <div className="px-6 pt-8 sm:px-12">
                  <div
                    {...subNavScroll.scrollProps}
                    className={cn(
                      'flex items-center gap-10 border-b border-slate-200 dark:border-white/5',
                      subNavScroll.className
                    )}
                  >
                    {subTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={(e) => {
                          if (subNavScroll.didDrag) {
                            e.preventDefault()
                            return
                          }
                          setActiveTab(tab.id)
                        }}
                        className={cn(
                          'group relative flex shrink-0 flex-col gap-4 pb-5 text-[14px] font-semibold whitespace-nowrap transition-all',
                          activeTab === tab.id
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'dark:hover:text-primary-300 text-slate-500 hover:text-slate-900 dark:text-slate-400'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              'flex h-7 w-7 items-center justify-center rounded-full border text-[11px] font-bold transition-all duration-300',
                              activeTab === tab.id
                                ? 'bg-primary-600 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/40 scale-110 border-transparent text-white shadow-sm'
                                : 'group-hover:border-primary-500/50 dark:group-hover:border-primary-500/50 dark:group-hover:text-primary-400 border-slate-200 bg-slate-50 text-slate-500 group-hover:text-slate-900 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400'
                            )}
                          >
                            {tab.id}
                          </div>
                          <span>{tab.name}</span>
                        </div>
                        {/* Active Indicator Line */}
                        {activeTab === tab.id && (
                          <div className="bg-primary-600 dark:bg-primary-500 absolute right-0 bottom-0 left-0 h-[2px] shadow-sm" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Editor Body */}
              <div className="relative flex-1 p-6 sm:p-12">
                <div className="animate-in fade-in zoom-in-95 fill-mode-both h-full duration-500">
                  {activeNav === 'Personal' ? (
                    <>
                      {activeTab === 1 && <Tab1MediaProfile />}
                      {activeTab === 2 && <Tab2PersonalInfo />}
                      {activeTab === 3 && <Tab3SocialGames />}
                      {activeTab === 4 && <Tab4HomeMedia />}
                      {activeTab === 5 && <Tab5ExtraFields />}
                    </>
                  ) : activeNav === 'Education' ? (
                    <TabEducation />
                  ) : activeNav === 'Experience' ? (
                    <TabExperience />
                  ) : activeNav === 'Skill' ? (
                    <TabSkill />
                  ) : activeNav === 'Services' ? (
                    <TabServices />
                  ) : activeNav === 'Portfolio' ? (
                    <TabPortfolio />
                  ) : activeNav === 'General' ? (
                    <TabGeneral />
                  ) : activeNav === 'Link shortener' ? (
                    <TabLinkShortener />
                  ) : null}
                </div>
              </div>

              {/* Bottom Actions sticky inside the card */}
              {activeNav === 'Personal' && (
                <div className="mt-auto flex items-center justify-between border-t border-slate-200 bg-slate-50 p-6 sm:px-12 dark:border-white/5 dark:bg-white/2">
                  {activeTab > 1 ? (
                    <button
                      onClick={() => setActiveTab(activeTab - 1)}
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-7 py-3 text-[13.5px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#1e2333] dark:text-slate-300 dark:hover:bg-[#252b3d]"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />{' '}
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {activeTab < 5 ? (
                    <button
                      onClick={() => setActiveTab(activeTab + 1)}
                      className="group flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-9 py-3 text-[13.5px] font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#1e2333] dark:text-white dark:hover:bg-[#252b3d]"
                    >
                      Next Step{' '}
                      <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      onClick={async () => {
                        setIsSaving(true)
                        try {
                          await saveVCard()
                        } catch (e) {
                          alert('Error saving Profile: ' + (e as Error).message)
                        } finally {
                          setIsSaving(false)
                        }
                      }}
                      disabled={isSaving}
                      className="bg-primary-600 hover:bg-primary-700 border-primary-500/20 flex items-center gap-2.5 rounded-xl border px-9 py-3 text-[13.5px] font-semibold text-white shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4.5 w-4.5" />
                      )}
                      {isSaving
                        ? isCreateMode
                          ? 'Creating...'
                          : 'Saving...'
                        : isCreateMode
                          ? 'Create vCard'
                          : 'Save Everything'}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Preview Button */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className={cn(
          'group fixed right-4 bottom-4 z-60 flex items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 sm:right-8 sm:bottom-8 lg:right-12',
          showPreview &&
            'max-sm:right-3 max-sm:bottom-[calc(0.75rem+env(safe-area-inset-bottom))] max-sm:scale-90 max-sm:opacity-90',
          showPreview
            ? 'h-14 w-14 border-slate-200 bg-white text-slate-900 shadow-lg hover:bg-slate-100 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
            : 'bg-primary-600 h-14 w-14 border-transparent text-white shadow-xl hover:scale-105'
        )}
      >
        <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        {showPreview ? (
          <Eye className="h-5 w-5 text-slate-500 transition-colors group-hover:text-slate-900 dark:text-slate-400 dark:group-hover:text-white" />
        ) : (
          <Eye className="h-6 w-6 shrink-0" />
        )}
      </button>

      {/* Live Preview Pane */}
      <VCardLivePreview isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  )
}
