'use client'

import { CardScopeProvider } from '@/lib/card-scope'
import { VCardProvider } from '@/lib/VCardContext'
import VCardEdit from '@/views/VCardEdit'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function EditVCardClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cardId = searchParams.get('cardId')

  useEffect(() => {
    if (!cardId) {
      router.replace('/vcards')
    }
  }, [cardId, router])

  if (!cardId) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm font-medium text-slate-500">
        Redirecting…
      </div>
    )
  }

  return (
    <CardScopeProvider cardId={cardId} mode="edit">
      <VCardProvider>
        <VCardEdit />
      </VCardProvider>
    </CardScopeProvider>
  )
}
