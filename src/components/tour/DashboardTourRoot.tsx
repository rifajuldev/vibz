'use client'

import { DashboardTourOverlay } from '@/components/tour/DashboardTourOverlay'
import { DashboardTourProvider } from '@/context/DashboardTourContext'

export function DashboardTourRoot({ children }: { children: React.ReactNode }) {
  return (
    <DashboardTourProvider>
      {children}
      <DashboardTourOverlay />
    </DashboardTourProvider>
  )
}
