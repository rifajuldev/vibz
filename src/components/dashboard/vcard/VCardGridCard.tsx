import type { VCardRecord } from '@/types/vcard'
import { formatViewCount, getVCardPublicPath, getVCardPublicUrl } from '@/utils/vcard'
import { Copy, ExternalLink, MoreHorizontal, QrCode, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type VCardGridCardProps = {
  card: VCardRecord
  onOpenQr: (url: string) => void
}

export function VCardGridCard({ card, onOpenQr }: VCardGridCardProps) {
  const slug = card.slug.trim()
  const publicPath = getVCardPublicPath(slug)
  const fullUrl = getVCardPublicUrl(slug)
  const avatarSrc = card.avatarImageUrl?.trim() || null

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-[28px] border border-slate-200/80 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.03)] transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_20px_40px_-5px_rgba(6,81,237,0.08)] dark:border-white/10 dark:bg-[#0b0f19] dark:hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.5)]">
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
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={card.personal.fullName || 'Avatar'}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={100}
                height={100}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-200 dark:bg-slate-700">
                <User className="h-10 w-10 text-slate-400 dark:text-slate-500" aria-hidden />
              </div>
            )}
          </div>

          <div className="mb-1.5 flex gap-4 sm:gap-5">
            <div className="text-center">
              <p className="text-[15px] font-black text-slate-900 dark:text-white">{formatViewCount(card.views)}</p>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">Views</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
            <div className="text-center">
              <p className="text-[15px] font-black text-slate-900 dark:text-white">{card.saves}</p>
              <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase dark:text-slate-500">Saves</p>
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
            onClick={() => fullUrl && onOpenQr(fullUrl)}
            className="hover:border-primary-500/50 flex w-11 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-700 shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-slate-800 dark:text-slate-300"
            title="Generate QR Code"
          >
            <QrCode className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
