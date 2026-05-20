'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { seedDemoIfEmpty, selectVCardList } from '@/redux/features/vcards/vcards.slice'
import type { VCardRecord } from '@/types/vcard'
import { Copy, Download, ExternalLink, Image as ImageIcon, MoreHorizontal, Plus, QrCode, Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { QRCodeCanvas } from 'qrcode.react'
import React, { useEffect, useRef, useState } from 'react'

export default function VCardsList() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const cards = useAppSelector(selectVCardList) as VCardRecord[]

  const [isQrModalOpen, setIsQrModalOpen] = useState(false)
  const [selectedVCardUrl, setSelectedVCardUrl] = useState('')
  const [qrFgColor, setQrFgColor] = useState('#000000')
  const [qrBgColor, setQrBgColor] = useState('#ffffff')
  const [qrLogo, setQrLogo] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const qrRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(seedDemoIfEmpty())
  }, [dispatch])

  const openQrModal = (url: string) => {
    setSelectedVCardUrl(url)
    setIsQrModalOpen(true)
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        setQrLogo(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadQR = () => {
    if (!qrRef.current) return
    const canvas = qrRef.current.querySelector('canvas')
    if (canvas) {
      const url = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.download = 'vcard-qr.png'
      link.href = url
      link.click()
    }
  }

  const handleCreate = () => {
    router.push('/vcards/create')
  }

  const filtered = cards.filter((c) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      c.personal.fullName.toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q) ||
      c.personal.designation.toLowerCase().includes(q)
    )
  })

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl p-4 duration-500 sm:p-6 lg:p-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">My vCards</h1>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            Manage and edit your digital business cards.
          </p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your cards..."
              className="focus:ring-primary-500/20 focus:border-primary-500 dark:focus:ring-primary-500/20 dark:focus:border-primary-500 w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-10 text-[13.5px] font-medium text-slate-900 shadow-sm transition-all outline-none placeholder:text-slate-400 focus:ring-2 dark:border-white/10 dark:bg-[#0b0f19] dark:text-slate-100"
            />
          </div>
          <button
            type="button"
            onClick={handleCreate}
            className="bg-primary-600 hover:bg-primary-700 hover:shadow-primary-500/20 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13.5px] font-semibold text-white shadow-sm transition-all hover:shadow-md active:scale-95 sm:w-auto"
          >
            <Plus className="h-4 w-4" /> Create New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((card) => {
          const slug = card.slug.trim()
          const publicPath = slug ? `/v/${encodeURIComponent(slug)}` : '#'
          const fullUrl =
            typeof window !== 'undefined' && slug ? `${window.location.origin}/v/${encodeURIComponent(slug)}` : ''

          return (
            <div
              key={card.id}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(6,81,237,0.08)] dark:border-white/10 dark:bg-[#0b0f19] dark:hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)]"
            >
              <div className="absolute top-4 right-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/70 text-slate-700 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100 hover:bg-white dark:border-white/10 dark:bg-black/50 dark:text-slate-200 dark:hover:bg-slate-800">
                <MoreHorizontal className="h-4 w-4" />
              </div>

              <div className="from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/10 relative h-[140px] shrink-0 overflow-hidden bg-linear-to-br transition-transform duration-500 group-hover:scale-[1.02]">
                <div
                  className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
                <div className="absolute top-4 left-4 z-10">
                  <div className="flex items-center gap-1.5 rounded-full border border-black/5 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-900/90">
                    <div
                      className={`h-1.5 w-1.5 rounded-full shadow-[0_0_8px_0_rgba(16,185,129,0.5)] ${card.isActive ? 'animate-pulse bg-emerald-500' : 'bg-slate-400'}`}
                    ></div>
                    <span className="mt-0.5 text-[10px] font-bold tracking-widest text-slate-700 uppercase dark:text-slate-300">
                      {card.isActive ? 'Active' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-20 flex flex-1 flex-col bg-white px-6 pt-0 pb-6 dark:bg-[#0b0f19]">
                <div className="mb-5 flex items-end justify-between">
                  <div className="group-hover:shadow-primary-500/20 relative -mt-11 h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md transition-shadow dark:border-[#0b0f19] dark:bg-slate-800">
                    <Image
                      src={card.avatarImageUrl}
                      alt={card.personal.fullName || 'Avatar'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className="mb-1.5 flex gap-4 sm:gap-5">
                    <div className="text-center">
                      <p className="text-[15px] font-black text-slate-900 dark:text-white">
                        {card.views >= 1000 ? `${(card.views / 1000).toFixed(1)}k` : card.views}
                      </p>
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                        Views
                      </p>
                    </div>
                    <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                    <div className="text-center">
                      <p className="text-[15px] font-black text-slate-900 dark:text-white">{card.saves}</p>
                      <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                        Saves
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <h2 className="mb-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {card.personal.fullName || 'Untitled card'}
                  </h2>
                  <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400">
                    {card.personal.designation || 'Add a title'}
                  </p>
                </div>

                <div className="group/url hover:border-primary-500/30 relative mb-6 flex items-center justify-between overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/50 p-3.5 transition-colors dark:border-white/5 dark:bg-slate-800/30">
                  <div className="bg-primary-500/5 absolute inset-0 opacity-0 transition-opacity group-hover/url:opacity-100"></div>
                  <div className="relative z-10 flex w-full items-center gap-2.5 truncate pr-8">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-slate-800">
                      <ExternalLink className="text-primary-500 h-3 w-3" />
                    </div>
                    <span className="text-primary-600 dark:text-primary-400 mt-0.5 truncate font-mono text-[13px] font-medium">
                      {slug ? `vbiz.me/${slug}` : 'Set URL slug in editor'}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={!fullUrl}
                    onClick={() => fullUrl && navigator.clipboard.writeText(fullUrl)}
                    className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-lg border border-slate-200 bg-white p-2 text-slate-400 shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-all hover:bg-white hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:text-slate-200"
                    title="Copy Link"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-auto grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Link
                    href={`/vcards/edit?cardId=${encodeURIComponent(card.id)}`}
                    className="hover:border-primary-500/50 hover:bg-primary-50 dark:hover:bg-primary-500/10 flex items-center justify-center rounded-xl border-2 border-slate-200 bg-transparent py-2.5 text-[13px] font-bold text-slate-700 shadow-sm transition-all dark:border-white/10 dark:text-slate-300"
                  >
                    Edit
                  </Link>
                  {slug ? (
                    <Link
                      href={publicPath}
                      className="flex items-center justify-center rounded-xl bg-slate-900 py-2.5 text-[13px] font-bold text-white shadow-sm shadow-slate-900/10 transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:shadow-white/10 dark:hover:bg-slate-100"
                    >
                      View
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex cursor-not-allowed items-center justify-center rounded-xl bg-slate-300 py-2.5 text-[13px] font-bold text-white opacity-70 dark:bg-slate-700"
                    >
                      View
                    </button>
                  )}
                  <button
                    type="button"
                    disabled={!fullUrl}
                    onClick={() => fullUrl && openQrModal(fullUrl)}
                    className="hover:border-primary-500/50 flex w-11 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
                    title="Generate QR Code"
                  >
                    <QrCode className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )
        })}

        <button
          type="button"
          onClick={handleCreate}
          className="hover:border-primary-500/30 group flex min-h-[400px] cursor-pointer flex-col items-center justify-center rounded-[28px] border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-[#070a13] dark:hover:bg-white/2"
        >
          <div className="group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:shadow-primary-500/20 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:text-white dark:border-white/10 dark:bg-[#0b0f19]">
            <Plus className="h-8 w-8" strokeWidth={2.5} />
          </div>
          <h3 className="text-[17px] font-bold text-slate-900 dark:text-white">Create New vCard</h3>
          <p className="mt-1 max-w-[200px] text-center text-[13px] font-medium text-slate-500 dark:text-slate-400">
            Set up a new digital identity in seconds.
          </p>
        </button>
      </div>

      {isQrModalOpen && (
        <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm duration-200 dark:bg-black/60">
          <div className="animate-in zoom-in-95 flex w-full max-w-md flex-col overflow-hidden rounded-[32px] border border-slate-200/50 bg-white shadow-2xl duration-300 dark:border-white/10 dark:bg-[#0b0f19]">
            <div className="flex items-center justify-between border-b border-slate-200/50 px-6 py-5 dark:border-white/5">
              <h3 className="flex items-center gap-2 text-[18px] font-black text-slate-900 dark:text-white">
                <QrCode className="text-primary-500 h-5 w-5" />
                vCard QR Code
              </h3>
              <button
                onClick={() => setIsQrModalOpen(false)}
                className="-mr-2 rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="hidden-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto p-6 md:p-8">
              <div
                className="flex items-center justify-center rounded-[24px] border border-slate-200 bg-slate-50 p-6 shadow-sm dark:border-white/5 dark:bg-white/2"
                ref={qrRef}
              >
                <QRCodeCanvas
                  value={selectedVCardUrl}
                  size={200}
                  fgColor={qrFgColor}
                  bgColor={qrBgColor}
                  level="H"
                  includeMargin={false}
                  imageSettings={qrLogo ? { src: qrLogo, height: 48, width: 48, excavate: true } : undefined}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-[12px] font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                    QR Color
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/5 dark:bg-white/2">
                    <input
                      type="color"
                      value={qrFgColor}
                      onChange={(e) => setQrFgColor(e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded-xl border-none bg-transparent"
                    />
                    <span className="font-mono text-[13px] text-slate-600 uppercase dark:text-slate-300">
                      {qrFgColor}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="pl-1 text-[12px] font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                    Background
                  </label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 dark:border-white/5 dark:bg-white/2">
                    <input
                      type="color"
                      value={qrBgColor}
                      onChange={(e) => setQrBgColor(e.target.value)}
                      className="h-8 w-8 cursor-pointer rounded-xl border-none bg-transparent"
                    />
                    <span className="font-mono text-[13px] text-slate-600 uppercase dark:text-slate-300">
                      {qrBgColor}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="pl-1 text-[12px] font-bold tracking-widest text-slate-600 uppercase dark:text-slate-400">
                  Center Logo (Optional)
                </label>
                <label className="group flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-white/10 dark:bg-white/2 dark:hover:bg-white/5">
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <ImageIcon className="group-hover:text-primary-500 h-5 w-5 text-slate-400 transition-colors" />
                  <span className="text-[14px] font-semibold text-slate-600 dark:text-slate-300">
                    {qrLogo ? 'Change Logo' : 'Upload Logo'}
                  </span>
                </label>
                {qrLogo && (
                  <button
                    onClick={() => setQrLogo(null)}
                    className="self-start pl-1 text-[12px] font-medium text-red-500 hover:underline"
                  >
                    Remove Logo
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-slate-200/50 bg-slate-50/50 p-6 dark:border-white/5 dark:bg-white/1">
              <button
                onClick={downloadQR}
                className="bg-primary-600 hover:bg-primary-700 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-[14px] font-bold text-white shadow-sm transition-all active:scale-[0.98]"
              >
                <Download className="h-4 w-4" /> Download QR Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
