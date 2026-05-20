'use client'

import { VCardDocumentUpload } from '@/components/vcard/VCardDocumentUpload'
import type { VCardAutoFillResult } from '@/lib/vcardAutoFillDemo'
import { BellRing, Image as ImageIcon, LayoutGrid, Link as LinkIcon, Plus, Trash2, Type, Wrench } from 'lucide-react'
import { useState } from 'react'

interface ServiceItem {
  id: number
  type: string
  title: string
  description: string
  url: string
  featuredImage: string
  active: boolean
}

const inputClasses =
  'w-full bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-[16px] px-5 py-4 text-[13px] font-medium text-slate-900 dark:text-white transition-all outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 shadow-sm'
const selectClasses =
  'appearance-none bg-white dark:bg-[#0b0f19] border border-slate-200/80 dark:border-white/10 rounded-[16px] px-5 py-4 w-full text-[13px] font-medium text-slate-900 dark:text-white outline-none cursor-pointer focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm'

export function TabServices() {
  const [services, setServices] = useState<ServiceItem[]>([])

  const addService = () => {
    setServices([
      {
        id: Date.now(),
        type: '',
        title: '',
        description: '',
        url: '',
        featuredImage: '',
        active: true,
      },
      ...services,
    ])
  }

  const removeService = (id: number) => {
    setServices(services.filter((s) => s.id !== id))
  }

  const updateService = (id: number, field: keyof ServiceItem, value: ServiceItem[keyof ServiceItem]) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)))
  }

  const handleAutoFill = (fields: VCardAutoFillResult) => {
    const seed: ServiceItem = {
      id: Date.now(),
      type: fields.type || '',
      title: fields.title || '',
      description: fields.description || '',
      url: fields.url || '',
      featuredImage: fields.featuredImage || '',
      active: true,
    }
    setServices((prev) =>
      prev.length === 0 ? [seed] : prev.map((s, i) => (i === 0 ? { ...s, ...seed, id: s.id } : s))
    )
  }

  return (
    <div className="animate-in fade-in mx-auto flex h-full w-full max-w-7xl flex-col pb-12 duration-500">
      <VCardDocumentUpload section="services" onAutoFill={handleAutoFill} />

      <div className="mb-8 rounded-[24px] border border-indigo-100 bg-indigo-50/50 p-6 dark:border-indigo-500/10 dark:bg-indigo-500/[0.02]">
        <div className="mb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-indigo-100 bg-indigo-50 dark:border-indigo-500/20 dark:bg-indigo-500/10">
              <Wrench className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-lg font-black text-indigo-600 dark:text-indigo-400">Services Collection</h3>
          </div>
          <button
            onClick={addService}
            className="hidden items-center justify-center gap-2 rounded-[12px] bg-indigo-600 px-5 py-2.5 text-sm font-bold whitespace-nowrap text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95 sm:flex"
          >
            <Plus className="h-4 w-4" /> Add Service
          </button>
        </div>
        <p className="mb-0 text-[14px] leading-relaxed font-medium text-slate-500 dark:text-slate-400">
          Offerings you provide to clients.
        </p>
        <button
          onClick={addService}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-[12px] bg-indigo-600 px-5 py-3.5 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95 sm:hidden"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="flex flex-1 flex-col">
        {services.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200/50 bg-slate-50/50 p-12 text-center shadow-sm dark:border-white/5 dark:bg-white/[0.02]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] border border-slate-200 bg-slate-100 dark:border-white/5 dark:bg-white/5">
              <BellRing className="h-8 w-8 text-slate-400" />
            </div>
            <h4 className="mb-2 text-[16px] font-black text-slate-900 dark:text-white">No services found</h4>
            <p className="mx-auto mb-6 max-w-md text-[13px] text-slate-500 dark:text-slate-400">{`Click the "Add Service" button to get started and showcase your offerings.`}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service, index) => (
              <section
                key={service.id}
                className="group/card overflow-hidden rounded-[32px] border border-slate-200/50 border-transparent bg-slate-50/50 shadow-sm transition-all hover:border-slate-200/80 hover:bg-slate-50 dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between border-b border-slate-200/50 px-8 py-6 dark:border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-indigo-100 bg-indigo-50 font-black text-indigo-600 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
                      {services.length - index}
                    </div>
                    <h4 className="text-[16px] font-black text-slate-900 dark:text-white">
                      {service.title || 'New Service'}
                    </h4>
                  </div>
                  <button
                    onClick={() => removeService(service.id)}
                    className="flex items-center gap-2 rounded-[12px] bg-red-50 px-4 py-2.5 font-bold text-red-500 opacity-0 transition-all group-hover/card:opacity-100 hover:bg-red-100 hover:text-red-600 focus:opacity-100 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                    title="Remove Service"
                  >
                    <Trash2 className="h-4 w-4" /> Remove
                  </button>
                </div>

                <div className="p-8">
                  <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="group flex flex-col space-y-1.5">
                      <label className="flex items-center gap-2 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                        <LayoutGrid className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Service Type
                      </label>
                      <div className="relative">
                        <select
                          value={service.type}
                          onChange={(e) => updateService(service.id, 'type', e.target.value)}
                          className={selectClasses}
                        >
                          <option value="" disabled>
                            Select Type
                          </option>
                          <option value="Web Development">Web Development</option>
                          <option value="App Design">App Design</option>
                          <option value="SEO">SEO</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-slate-500 dark:text-slate-400">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="group flex flex-col space-y-1.5">
                      <label className="flex items-center gap-2 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                        <Type className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => updateService(service.id, 'title', e.target.value)}
                        placeholder="Enter service title"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="group mb-8 flex flex-col space-y-1.5">
                    <label className="pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                      Service Description
                    </label>
                    <div className="overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-sm transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-white/10 dark:bg-[#0b0f19]">
                      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/50 bg-slate-50/50 px-4 py-3 dark:border-white/5 dark:bg-white/[0.02]">
                        {/* Fake toolbar for visual resemblance to rich text editor */}
                        <span className="mr-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                          Format
                        </span>
                        <div className="h-4 w-px bg-slate-200 dark:bg-white/10"></div>
                        <button className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10">
                          <strong className="text-[13px] leading-none font-black">B</strong>
                        </button>
                        <button className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10">
                          <em className="font-serif text-[13px] leading-none italic">I</em>
                        </button>
                        <button className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10">
                          <u className="text-[13px] leading-none font-medium underline">U</u>
                        </button>
                        <div className="mx-1 h-4 w-px bg-slate-200 dark:bg-white/10"></div>
                        <button className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-white/10">
                          <LinkIcon className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <textarea
                        value={service.description}
                        onChange={(e) => updateService(service.id, 'description', e.target.value)}
                        placeholder="Write your service description here..."
                        rows={5}
                        className="min-h-[120px] w-full resize-y bg-transparent px-5 py-4 text-[13px] font-medium text-slate-900 focus:outline-none dark:text-white"
                      ></textarea>
                    </div>
                  </div>

                  <div className="group mb-8 flex flex-col space-y-1.5">
                    <label className="flex items-center gap-2 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                      <LinkIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> URL
                    </label>
                    <input
                      type="text"
                      value={service.url}
                      onChange={(e) => updateService(service.id, 'url', e.target.value)}
                      placeholder="Enter URL"
                      className={inputClasses}
                    />
                  </div>

                  <div className="group mb-8 flex flex-col space-y-1.5">
                    <label className="flex items-center gap-2 pl-1 text-[11px] font-bold tracking-wider text-slate-500 uppercase transition-colors group-focus-within:text-slate-500 dark:text-slate-400">
                      <ImageIcon className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" /> Featured Image
                    </label>
                    <div className="group flex overflow-hidden rounded-[16px] border border-slate-200/80 shadow-sm transition-colors focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 dark:border-white/10">
                      <span className="cursor-pointer border-r border-slate-200/50 bg-slate-50 px-5 py-4 text-[13px] font-bold whitespace-nowrap text-slate-700 transition-colors group-hover:text-indigo-600 hover:bg-slate-100 dark:border-white/5 dark:bg-white/[0.02] dark:text-slate-200 dark:group-hover:text-indigo-400 dark:hover:bg-white/[0.05]">
                        Choose File
                      </span>
                      <span className="flex w-full items-center truncate bg-white px-5 py-4 text-[13px] font-medium text-slate-500 dark:bg-[#0b0f19] dark:text-slate-400">
                        No file chosen
                      </span>
                    </div>
                    <p className="mt-1 pl-1 text-[11px] font-medium text-slate-500 dark:text-slate-500">
                      Max file size: 2MB
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <label className="group flex cursor-pointer items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={service.active}
                          onChange={(e) => updateService(service.id, 'active', e.target.checked)}
                          className="peer sr-only"
                        />
                        <div className="relative h-[22px] w-[38px] rounded-[12px] bg-slate-200 shadow-inner transition-colors peer-checked:bg-green-500 dark:bg-white/10">
                          <div className="absolute top-[3px] left-[3px] h-4 w-4 rounded-[10px] bg-white shadow transition-transform peer-checked:translate-x-4"></div>
                        </div>
                      </div>
                      <span className="text-[13px] font-bold text-slate-500 transition-colors group-hover:text-slate-700 dark:text-slate-400">
                        Active Status
                      </span>
                    </label>
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
