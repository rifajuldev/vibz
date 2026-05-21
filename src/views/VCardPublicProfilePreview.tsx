'use client'

import { useAppSelector } from '@/hooks/redux'
import { CardScopeProvider } from '@/lib/card-scope'
import { ProfileApp } from '@/profile-app/ProfileApp'
import '@/profile-app/profile-app.css'
import { vCardRecordToProfileProps } from '@/profile-app/profilePublicProps'
import { selectVCardById, selectVCardIdBySlug } from '@/redux/features/vcards/vcards.slice'

export default function VCardPublicProfilePreview({ slug }: { slug: string }) {
  const cardId = useAppSelector((s) => selectVCardIdBySlug(s, slug))
  const record = useAppSelector((s) => (cardId ? selectVCardById(s, cardId) : null))
  const designSettings = useAppSelector((s) => s.designSettings)

  if (!cardId || !record) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-6 text-center dark:bg-[#09090b]">
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">vCard not found</p>
        <p className="mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
          No saved card matches <span className="font-mono text-zinc-900 dark:text-zinc-200">{slug}</span>. Create one
          from My vCards, set its URL slug, then open View again.
        </p>
      </div>
    )
  }

  const profileProps = vCardRecordToProfileProps(record, designSettings)

  return (
    <CardScopeProvider cardId={cardId}>
      <ProfileApp {...profileProps} />
    </CardScopeProvider>
  )
}
