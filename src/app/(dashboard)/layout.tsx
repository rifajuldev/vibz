import Layout from '@/components/Layout'
import { RequireAuth } from '@/components/require-auth'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <Layout>{children}</Layout>
    </RequireAuth>
  )
}
