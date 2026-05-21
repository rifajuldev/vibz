'use client'

import { VCardDocumentUpload } from '@/components/vcard/VCardDocumentUpload'
import { useVCard } from '@/lib/VCardContext'
import type { VCardAutoFillResult } from '@/lib/vcardAutoFillDemo'
import { getDisplaySettingsFromVCard, patchDisplayField } from '@/lib/vcardDisplaySettings'
import { createDefaultExperienceEntry, normalizeExperienceList } from '@/lib/vcardExperience'
import type { VCardExperienceEntry } from '@/types/vcard'
import { cn } from '@/utils/cn'
import { Briefcase, Plus, Trash2 } from 'lucide-react'

const inputClasses =
  'w-full bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-[16px] px-5 py-4 text-[13px] font-medium text-slate-900 dark:text-white transition-all outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 shadow-sm'

const EXPERIENCE_NAV_FIELD = 'Work Experience'

export function TabExperience() {
  const { vCardData, updateData } = useVCard()
  const experiences = normalizeExperienceList(vCardData.experience)
  const display = getDisplaySettingsFromVCard(vCardData)
  const sectionVisible = display.fields[EXPERIENCE_NAV_FIELD]?.visible !== false

  const setExperiences = (next: VCardExperienceEntry[]) => {
    updateData('experience', next)
  }

  const addExperience = () => {
    setExperiences([...experiences, createDefaultExperienceEntry()])
  }

  const removeExperience = (id: string) => {
    const next = experiences.filter((exp) => exp.id !== id)
    setExperiences(next.length ? next : [createDefaultExperienceEntry()])
  }

  const updateExperience = (id: string, field: keyof VCardExperienceEntry, value: string | boolean) => {
    setExperiences(experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const handleAutoFill = (fields: VCardAutoFillResult) => {
    setExperiences(
      experiences.map((exp, i) =>
        i === 0
          ? {
              ...exp,
              company: fields.company || exp.company,
              jobTitle: fields.jobTitle || exp.jobTitle,
              description: fields.description || exp.description,
              fromDate: fields.fromDate || exp.fromDate,
              toDate: fields.toDate || exp.toDate,
            }
          : exp
      )
    )
  }

  const toggleSectionVisibility = () => {
    updateData('displaySettings', patchDisplayField(display, EXPERIENCE_NAV_FIELD, { visible: !sectionVisible }))
  }

  return (
    <div className="animate-in fade-in mx-auto flex h-full w-full max-w-7xl flex-col pb-12 duration-500">
      <VCardDocumentUpload section="experience" onAutoFill={handleAutoFill} />

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-[24px] border border-orange-100 bg-orange-50/50 p-6 dark:border-orange-500/10 dark:bg-orange-500/2">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-orange-100 bg-orange-50 dark:border-orange-500/20 dark:bg-orange-500/10">
              <Briefcase className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-black text-orange-600 dark:text-orange-400">Work Experience</h3>
          </div>
          <p className="mb-0 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            Add your professional work experience and career milestones. Changes appear instantly in the live preview
            (v1 and v2 layouts).
          </p>
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-sm dark:border-white/10 dark:bg-[#0b0f19]">
          <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
            Show in app
          </span>
          <div className="relative flex items-center justify-center">
            <input
              type="checkbox"
              checked={sectionVisible}
              onChange={toggleSectionVisibility}
              className="peer sr-only"
            />
            <div className="peer h-6 w-10 rounded-full bg-slate-200 shadow-sm peer-checked:bg-emerald-500 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:bg-slate-700" />
          </div>
        </label>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <section
            key={exp.id}
            className="group/card overflow-hidden rounded-[32px] border border-transparent bg-slate-50/50 shadow-sm transition-all hover:border-slate-200/80 hover:bg-slate-50 dark:border-white/5 dark:bg-white/2"
          >
            <div className="flex items-center justify-between border-b border-slate-200/50 px-8 py-6 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-orange-100 bg-orange-50 font-black text-orange-600 shadow-sm dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-400">
                  {index + 1}
                </div>
                <h4 className="text-[16px] font-black text-slate-900 dark:text-white">
                  {exp.company || 'New Experience Entry'}
                </h4>
              </div>
              {experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="flex items-center gap-2 rounded-[12px] bg-red-50 px-4 py-2.5 font-bold text-red-500 opacity-0 transition-all group-hover/card:opacity-100 hover:bg-red-100 hover:text-red-600 focus:opacity-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                  title="Remove Entry"
                >
                  <Trash2 className="h-4 w-4" /> Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 p-8 md:grid-cols-2">
              <div className="group flex flex-col space-y-1.5 md:col-span-2">
                <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                  Company Name
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="e.g. Google"
                  className={inputClasses}
                />
              </div>
              <div className="group flex flex-col space-y-1.5 md:col-span-2">
                <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                  Job Title
                </label>
                <input
                  type="text"
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className={inputClasses}
                />
              </div>
              <div className="group flex flex-col space-y-1.5 md:col-span-2">
                <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                  Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                  className={inputClasses.replace('h-min', 'resize-y')}
                />
              </div>
              <div className="group flex flex-col space-y-1.5">
                <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                  Start Date
                </label>
                <input
                  type="date"
                  value={exp.fromDate}
                  onChange={(e) => updateExperience(exp.id, 'fromDate', e.target.value)}
                  className={`${inputClasses} [&::-webkit-calendar-picker-indicator]:invert`}
                />
              </div>
              <div className="group flex flex-col space-y-1.5">
                <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                  End Date
                </label>
                <input
                  type="date"
                  value={exp.toDate}
                  onChange={(e) => updateExperience(exp.id, 'toDate', e.target.value)}
                  disabled={exp.tillNow}
                  className={cn(
                    `${inputClasses} [&::-webkit-calendar-picker-indicator]:invert`,
                    exp.tillNow
                      ? 'cursor-not-allowed border-transparent bg-slate-200/50 opacity-50 dark:bg-white/5'
                      : ''
                  )}
                />
              </div>
              <div className="flex items-center gap-3 pt-2 md:col-span-2">
                <label className="group flex cursor-pointer items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={exp.tillNow}
                      onChange={(e) => updateExperience(exp.id, 'tillNow', e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] border-slate-600 shadow-inner transition-colors group-hover:border-slate-400 peer-checked:border-orange-500 peer-checked:bg-orange-500">
                      <svg
                        className={cn(
                          'h-3 w-3 scale-0 text-slate-900 transition-transform peer-checked:scale-100',
                          exp.tillNow ? 'scale-100' : ''
                        )}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400">
                    I currently work here
                  </span>
                </label>
              </div>
            </div>
          </section>
        ))}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 pt-6 sm:flex-row">
          <button
            type="button"
            onClick={addExperience}
            className="flex w-full items-center justify-center gap-2 rounded-[16px] border border-black/5 bg-white px-6 py-4 text-[13px] font-bold text-orange-600 shadow-sm transition-all hover:border-orange-500/30 hover:bg-slate-200 active:scale-95 sm:w-auto dark:border-white/5 dark:bg-[#0b0f19] dark:text-orange-400"
          >
            <Plus className="h-4 w-4" /> Add Experience
          </button>
        </div>
      </div>
    </div>
  )
}
