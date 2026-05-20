'use client'

import { CardScopeProvider } from '@/lib/card-scope'
import { VCardProvider } from '@/lib/VCardContext'
import VCardEdit from '@/views/VCardEdit'

export default function CreateVCardClient() {
  return (
    <CardScopeProvider cardId={null} mode="create">
      <VCardProvider>
        <VCardEdit />
      </VCardProvider>
    </CardScopeProvider>
  )
}
