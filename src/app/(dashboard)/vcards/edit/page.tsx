import { Suspense } from 'react'
import EditVCardClient from './EditVCardClient'

export default function VCardEditPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center text-sm font-medium text-slate-500">
          Loading editor…
        </div>
      }
    >
      <EditVCardClient />
    </Suspense>
  )
}
