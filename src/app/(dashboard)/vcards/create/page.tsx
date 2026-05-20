import { Suspense } from 'react'
import CreateVCardClient from './CreateVCardClient'

export default function VCardCreatePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm font-medium text-slate-500">Loading…</div>
      }
    >
      <CreateVCardClient />
    </Suspense>
  )
}
