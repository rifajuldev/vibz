'use client'

import { EditorNavEmptyPanel } from '@/components/EditorNavEmptyPanel'
import { TabBlog } from '@/components/VCardBlog'
import { TabEducation } from '@/components/VCardEducation'
import { TabExperience } from '@/components/VCardExperience'
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
import { getDisplaySettingsFromVCard } from '@/lib/vcardDisplaySettings'
import { filterNavItemsByVisibility, getNavItemById, NAV_BAR_NAV_ITEMS, type EditorNavPanel } from '@/lib/vcardNavbar'
import { cn } from '@/utils/cn'
import { ArrowLeft, CheckCircle, ChevronLeft, ChevronRight, Eye, FileText, Loader2, Settings } from 'lucide-react'
import Link from 'next/link'
import { MouseEvent, useMemo, useRef, useState } from 'react'

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

function renderEditorPanel(panel: EditorNavPanel, activeTab: number) {
  switch (panel.kind) {
    case 'personal':
      return (
        <>
          {activeTab === 1 && <Tab1MediaProfile />}
          {activeTab === 2 && <Tab2PersonalInfo />}
          {activeTab === 3 && <Tab3SocialGames />}
          {activeTab === 4 && <Tab4HomeMedia />}
          {activeTab === 5 && <Tab5ExtraFields />}
        </>
      )
    case 'education':
      return <TabEducation />
    case 'experience':
      return <TabExperience />
    case 'skill':
      return <TabSkill />
    case 'services':
      return <TabServices />
    case 'portfolio':
      return <TabPortfolio />
    case 'blog':
      return <TabBlog />
    case 'link-shortener':
      return <TabLinkShortener />
    case 'empty':
    default:
      return null
  }
}

export default function VCardEdit() {
  const { vCardData, updateData, saveVCard, isCreateMode } = useVCard()
  const display = useMemo(() => getDisplaySettingsFromVCard(vCardData), [vCardData])
  const visibleNavItems = useMemo(() => filterNavItemsByVisibility(NAV_BAR_NAV_ITEMS, display), [display])
  const [activeTab, setActiveTab] = useState(1)
  const [activeNavId, setActiveNavId] = useState('home')
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const activeNavItem = getNavItemById(activeNavId)
  const editorPanel = activeNavItem?.editorPanel ?? { kind: 'empty' as const }
  const isPersonalEditor = editorPanel.kind === 'personal'
  const isSettingsOpen = activeNavId === '__settings__'

  const mainNavScroll = useDragScroll()
  const rightNavScroll = useDragScroll()
  const subNavScroll = useDragScroll()

  const selectNavItem = (id: string, panel: EditorNavPanel) => {
    setActiveNavId(id)
    if (panel.kind === 'personal' && panel.subTab) {
      setActiveTab(panel.subTab)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full justify-center pt-4 pb-24 sm:pt-10">
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
          <div className="relative flex w-full flex-col justify-between gap-2 rounded-3xl border border-slate-200 bg-white/60 p-2 shadow-sm backdrop-blur-2xl md:flex-row md:items-center dark:border-white/5 dark:bg-[#0b0f19]/60">
            <div
              {...mainNavScroll.scrollProps}
              className={cn('flex flex-1 shrink-0 items-center gap-1 px-2 md:px-4', mainNavScroll.className)}
            >
              {visibleNavItems.map((item) => {
                const isActive = !isSettingsOpen && activeNavId === item.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    title={item.label}
                    onClick={(e) => {
                      if (mainNavScroll.didDrag) {
                        e.preventDefault()
                        return
                      }
                      selectNavItem(item.id, item.editorPanel)
                    }}
                    className={cn(
                      'flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-3 text-[13px] font-semibold whitespace-nowrap transition-all duration-300',
                      isActive
                        ? 'bg-primary-600 border-primary-500/50 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/30 scale-[1.02] border text-white shadow-sm'
                        : 'border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-4 w-4 shrink-0',
                        isActive ? 'dark:text-primary-400 text-white' : 'text-slate-500 dark:text-slate-400'
                      )}
                    />
                    <span className="max-w-[9rem] truncate sm:max-w-none">{item.label}</span>
                  </button>
                )
              })}
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
                  setActiveNavId('__settings__')
                }}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-all duration-300',
                  isSettingsOpen
                    ? 'bg-primary-600 border-primary-500/50 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/30 scale-[1.02] border text-white shadow-sm'
                    : 'border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200'
                )}
              >
                <Settings className={cn('h-4 w-4', isSettingsOpen ? 'dark:text-primary-400 text-white' : '')} />
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
                    <div className="peer h-6 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-4 peer-checked:after:border-white dark:bg-slate-700"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex w-full flex-col">
          {isSettingsOpen ? (
            <TabSetting />
          ) : (
            <div className="relative flex min-h-[700px] flex-col overflow-visible rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-[#0b0f19]">
              {/* Subtle inner top highlight */}
              <div className="via-primary-500/10 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

              {/* Context Header and Sub Navigation for the active section inside the card */}
              {isPersonalEditor && (
                <div className="px-6 pt-8 sm:px-12">
                  <div
                    {...subNavScroll.scrollProps}
                    className={cn(
                      'flex items-end gap-10 border-b border-slate-200 dark:border-white/5',
                      subNavScroll.className
                    )}
                  >
                    {subTabs.map((tab) => {
                      const isActive = activeTab === tab.id
                      return (
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
                            'group relative shrink-0 pb-4 text-[14px] font-semibold whitespace-nowrap transition-colors duration-200',
                            isActive
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'dark:hover:text-primary-300 text-slate-500 hover:text-slate-900 dark:text-slate-400'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-full border text-[11px] font-bold transition-colors duration-200',
                                isActive
                                  ? 'bg-primary-600 dark:bg-primary-500/15 dark:text-primary-400 dark:border-primary-500/40 border-transparent text-white shadow-sm'
                                  : 'group-hover:border-primary-500/50 dark:group-hover:border-primary-500/50 dark:group-hover:text-primary-400 border-slate-200 bg-slate-50 text-slate-500 group-hover:text-slate-900 dark:border-white/10 dark:bg-slate-800 dark:text-slate-400'
                              )}
                            >
                              {tab.id}
                            </div>
                            <span>{tab.name}</span>
                          </div>
                          <div
                            className={cn(
                              'bg-primary-600 dark:bg-primary-500 absolute inset-x-0 -bottom-px h-0.5 transition-opacity duration-200',
                              isActive ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Editor Body */}
              <div className="relative flex-1 p-6 sm:p-12">
                <div className="animate-in fade-in zoom-in-95 fill-mode-both h-full duration-500">
                  {editorPanel.kind === 'empty' ? (
                    <EditorNavEmptyPanel title={activeNavItem?.label ?? 'Section'} />
                  ) : (
                    renderEditorPanel(editorPanel, activeTab)
                  )}
                </div>
              </div>

              {/* Bottom Actions sticky inside the card */}
              {isPersonalEditor && (
                <div className="mt-auto flex items-center justify-between rounded-b-3xl border-t border-slate-200 bg-slate-50 p-6 sm:px-12 dark:border-white/5 dark:bg-white/2">
                  {activeTab > 1 ? (
                    <button
                      onClick={() => setActiveTab(activeTab - 1)}
                      className="group mobile:px-7 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13.5px] font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#1e2333] dark:text-slate-300 dark:hover:bg-[#252b3d]"
                    >
                      <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />{' '}
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {activeTab < 5 ? (
                    <button
                      onClick={() => setActiveTab(activeTab + 1)}
                      className="group mobile:px-7 flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-5 py-3 text-[13.5px] font-semibold text-slate-900 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#1e2333] dark:text-white dark:hover:bg-[#252b3d]"
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
                      className="bg-primary-600 hover:bg-primary-700 border-primary-500/20 mobile:px-7 flex items-center gap-2.5 rounded-xl border px-5 py-3 text-[13.5px] font-semibold text-white shadow-sm transition-all disabled:opacity-50"
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
          'group fixed right-4 bottom-4 z-60 flex items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 lg:right-8 lg:bottom-8',
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
