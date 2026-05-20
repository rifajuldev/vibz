'use client'

import {
  Activity,
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Download,
  Facebook,
  FileText,
  Globe,
  Instagram,
  MessageCircle,
  Save,
  TrendingUp,
  Twitter,
  Users,
  X,
  Youtube,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function ContactModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/80">
        <div className="animate-in zoom-in-95 w-full max-w-sm rounded-[32px] border border-emerald-500/20 bg-white p-8 text-center shadow-2xl duration-500 dark:bg-[#0b0f19]">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <Check className="h-8 w-8 text-emerald-500" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">Message Sent</h3>
          <p className="mb-8 text-[13px] font-medium text-slate-500 dark:text-slate-400">
            Our support team will get back to you shortly.
          </p>
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-slate-900 py-3 text-[14px] font-semibold text-white transition-all hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm dark:bg-black/60">
      <div className="animate-in zoom-in-95 w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl duration-200 dark:border-white/10 dark:bg-[#0b0f19]">
        <div className="flex items-center justify-between border-b-0 p-6 sm:px-8 sm:pt-8">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
            <span className="bg-primary-50 dark:bg-primary-500/10 flex h-8 w-8 items-center justify-center rounded-full">
              <MessageCircle className="text-primary-600 dark:text-primary-400 h-4 w-4" />
            </span>
            Contact Support
          </h3>
          <button
            onClick={onClose}
            className="rounded-full bg-slate-50 p-2 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>
        <div className="space-y-6 p-6 sm:px-8 sm:pb-8">
          <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/10">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-500" />
            <p className="text-[13px] leading-relaxed font-medium text-amber-800 dark:text-amber-200/80">
              If your order has passed the 24 hour mark, please let us know and we will prioritize it immediately.
            </p>
          </div>

          <div className="space-y-5 text-sm">
            <div className="group flex flex-col space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">Subject</label>
              <div className="relative">
                <select className="focus:border-primary-500 focus:ring-primary-500 w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] font-medium text-slate-900 transition-all outline-none focus:ring-1 dark:border-white/10 dark:bg-slate-800/50 dark:text-white">
                  <option>Order Status Inquiry</option>
                  <option>Report an Issue</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="group flex flex-col space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">Message</label>
              <textarea
                placeholder="How can we help you?"
                className="focus:border-primary-500 focus:ring-primary-500 min-h-[120px] w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[14px] font-medium text-slate-900 transition-all outline-none focus:ring-1 dark:border-white/10 dark:bg-slate-800/50 dark:text-white"
              ></textarea>
            </div>
          </div>

          <button
            onClick={() => setSent(true)}
            className="bg-primary-600 hover:bg-primary-700 shadow-primary-500/20 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[14px] font-bold text-white shadow-sm transition-all active:scale-95"
          >
            Send Message <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

const statCards = [
  {
    topText: '0',
    bottomText: 'Contacts Saved',
    icon: Save,
    color: 'text-slate-800 dark:text-slate-200',
    bg: 'bg-slate-100 dark:bg-slate-800',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'Facebook Clicks',
    icon: Facebook,
    color: 'text-[#1877F2]',
    bg: 'bg-[#1877F2]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'Twitter Clicks',
    icon: Twitter,
    color: 'text-[#1DA1F2]',
    bg: 'bg-[#1DA1F2]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'Instagram Clicks',
    icon: Instagram,
    color: 'text-[#E4405F]',
    bg: 'bg-[#E4405F]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'WhatsApp Clicks',
    icon: MessageCircle,
    color: 'text-[#25D366]',
    bg: 'bg-[#25D366]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'LinkedIn Clicks',
    icon: FileText,
    color: 'text-[#0A66C2]',
    bg: 'bg-[#0A66C2]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'YouTube Clicks',
    icon: Youtube,
    color: 'text-[#FF0000]',
    bg: 'bg-[#FF0000]/10',
    trend: '+0%',
  },
  {
    topText: '0',
    bottomText: 'Website Visits',
    icon: Globe,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    trend: '+0%',
  },
]

const chartData = [
  { name: 'Apr', total: 13 },
  { name: 'May', total: 2 },
  { name: 'Jun', total: 5 },
  { name: 'Jul', total: 12 },
  { name: 'Aug', total: 20 },
  { name: 'Sep', total: 34 },
]

const tableData = [
  {
    id: 1,
    event: 'Profile Viewed',
    viewer: 'Zakir',
    time: '2 mins ago',
    platform: 'Desktop',
  },
  {
    id: 2,
    event: 'Profile Viewed',
    viewer: 'Zakir',
    time: '1 hour ago',
    platform: 'Mobile',
  },
  {
    id: 3,
    event: 'Profile Viewed',
    viewer: 'Guest',
    time: '1 week ago',
    platform: 'Tablet',
  },
  {
    id: 4,
    event: 'Profile Viewed',
    viewer: 'Guest',
    time: '1 week ago',
    platform: 'Desktop',
  },
  {
    id: 5,
    event: 'Profile Viewed',
    viewer: 'Guest',
    time: '2 weeks ago',
    platform: 'Mobile',
  },
]

type TimeLeft = { hours: number; minutes: number; seconds: number }

const defaultTimeLeft: TimeLeft = { hours: 23, minutes: 59, seconds: 59 }

function getOrderTargetTime(): number | null {
  if (typeof window === 'undefined') return null
  const orderTimestamp = localStorage.getItem('customOrderPlaced')
  if (!orderTimestamp) return null
  return parseInt(orderTimestamp, 10) + 24 * 60 * 60 * 1000
}

function computeTimeLeft(targetTime: number): TimeLeft {
  const diff = targetTime - Date.now()
  if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 }
  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}

export default function Dashboard() {
  const [showContactModal, setShowContactModal] = useState(false)
  const [hasOrder] = useState(() => getOrderTargetTime() !== null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => {
    const targetTime = getOrderTargetTime()
    return targetTime ? computeTimeLeft(targetTime) : defaultTimeLeft
  })

  useEffect(() => {
    const targetTime = getOrderTargetTime()
    if (!targetTime) return

    const updateTimer = () => {
      setTimeLeft(computeTimeLeft(targetTime))
    }

    const timer = setInterval(updateTimer, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="animate-in fade-in mx-auto max-w-7xl p-4 duration-500 sm:p-6 lg:p-8">
      {/* Header section */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-[32px] leading-tight font-black tracking-tight text-slate-900 sm:text-[40px] dark:text-white">
            Overview
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500 sm:text-[15px] dark:text-slate-400">
            Track your vCard performance and engagement metrics in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 rounded-[14px] border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-[#0b0f19] dark:text-slate-300 dark:hover:bg-white/5">
            <Calendar className="h-4 w-4 text-slate-400" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 rounded-[14px] bg-slate-900 px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
            <Download className="h-4 w-4" /> Export
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Chart inside a Bento Box */}
        <div className="group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] lg:col-span-2 dark:border-white/10 dark:bg-[#0b0f19] dark:hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]">
          <div className="relative z-10 flex h-full flex-col justify-between p-8 pb-0">
            <div className="mb-6 flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-purple-100 bg-purple-50 shadow-sm dark:border-purple-500/20 dark:bg-purple-500/10">
                    <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </span>
                  <h2 className="pl-1 text-[13px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                    Website Visits
                  </h2>
                </div>
                <div className="mt-2 flex items-baseline gap-4">
                  <span className="text-6xl font-black tracking-tighter text-slate-900 dark:text-white">86</span>
                  <span className="flex items-center gap-1.5 rounded-[10px] border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[13px] font-bold text-emerald-600 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                    <TrendingUp className="h-4 w-4" /> +12%
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-2 -ml-4 h-[260px] w-full min-w-0 sm:ml-0">
              <div className="pointer-events-none absolute inset-0 top-auto bottom-0 z-10 h-8 bg-linear-to-t from-white via-transparent to-transparent dark:from-[#0b0f19]"></div>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#e2e8f0"
                    strokeOpacity={0.4}
                    className="dark:stroke-white/10"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }}
                    dx={-10}
                  />
                  <Tooltip
                    cursor={{
                      stroke: 'var(--primary-500)',
                      strokeWidth: 1,
                      strokeDasharray: '4 4',
                    }}
                    contentStyle={{
                      backgroundColor: 'var(--tooltip-bg, #fff)',
                      borderColor: 'var(--tooltip-border, rgba(0,0,0,0.1))',
                      borderRadius: '16px',
                      color: 'var(--tooltip-text, #0f172a)',
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      fontWeight: 600,
                      padding: '12px',
                      border: 'none',
                    }}
                    itemStyle={{
                      color: 'var(--primary-500)',
                      fontWeight: 700,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="var(--primary-500)"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                    activeDot={{ r: 6, strokeWidth: 0, fill: 'var(--primary-500)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Contacts Saved & Insights Bento */}
        <div className="flex h-full flex-col gap-6">
          <div className="from-primary-600 to-primary-800 group relative flex flex-1 flex-col justify-between overflow-hidden rounded-[32px] bg-linear-to-br p-8 text-white shadow-[0_20px_40px_-10px_rgba(var(--primary-600),0.3)] transition-transform duration-300 hover:-translate-y-1">
            <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-white/10 blur-3xl transition-transform duration-1000 ease-out group-hover:scale-125"></div>

            <div>
              <div className="relative z-10 mb-4 flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/20 shadow-sm backdrop-blur-md">
                  <Save className="h-5 w-5 text-white" />
                </span>
                <h2 className="text-primary-100 pl-1 text-[13px] font-bold tracking-widest uppercase">
                  Contacts Saved
                </h2>
              </div>
              <div className="relative z-10 mt-2 flex items-baseline gap-3">
                <span className="text-6xl font-black tracking-tighter sm:text-7xl">24</span>
              </div>
            </div>

            <div className="relative z-10 mt-8 rounded-[24px] border border-white/10 bg-black/20 p-5 shadow-inner backdrop-blur-md transition-colors group-hover:bg-black/30">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-white/5 bg-white/10 shadow-sm">
                  <Users className="text-primary-200 h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="mb-0.5 text-[15px] font-bold text-white">High Conversion</p>
                  <p className="text-primary-200 text-[12px] leading-relaxed font-medium">
                    Your profile is performing well! People are saving your contact details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Metrics Section */}
      <div className="animate-in slide-in-from-bottom-4 fill-mode-both mb-10 delay-100">
        <h3 className="mb-5 flex items-center gap-2 px-1 text-[15px] font-bold text-slate-900 dark:text-white">
          <Activity className="h-4 w-4 text-slate-400" />
          Social Engagement Channels
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {statCards
            .filter((s) => s.bottomText !== 'Website Visits' && s.bottomText !== 'Contacts Saved')
            .map((stat, i) => (
              <div
                key={i}
                className="group rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.05)] dark:border-white/5 dark:bg-[#0b0f19] dark:hover:border-white/10 dark:hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.4)]"
              >
                <div
                  className={`mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] ${stat.bg} ${stat.color} border border-black/5 shadow-sm transition-transform group-hover:scale-110 dark:border-white/5`}
                >
                  <stat.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="mb-1 text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                    {stat.topText}
                  </p>
                  <p className="text-[11px] leading-tight font-bold tracking-widest text-slate-500 uppercase">
                    {stat.bottomText.replace(' Clicks', '')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Active Orders Section */}
      {hasOrder && (
        <div className="animate-in slide-in-from-bottom-4 mb-10">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="flex items-center gap-2 px-1 text-[15px] font-bold text-slate-900 dark:text-white">
              <Activity className="h-4 w-4 text-slate-400" />
              Active Orders
            </h2>
            <span className="bg-primary-500 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-sm">
              1
            </span>
          </div>
          <div className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_40px_-5px_rgba(0,0,0,0.05)] sm:p-8 dark:border-white/5 dark:bg-[#0b0f19]">
            <div className="bg-primary-500/5 dark:bg-primary-500/10 absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div className="flex items-center gap-5">
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50 shadow-sm transition-transform duration-500 group-hover:scale-105 dark:border-white/10 dark:bg-slate-800">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=200&h=200')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110"></div>
                </div>
                <div>
                  <div className="mb-1.5 flex items-center gap-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Custom Intro Video</h3>
                    <span className="bg-primary-50 dark:bg-primary-500/10 border-primary-100 dark:border-primary-500/20 text-primary-600 dark:text-primary-400 flex items-center gap-1.5 rounded-[10px] border px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                      <div className="bg-primary-500 h-1.5 w-1.5 animate-pulse rounded-full"></div>
                      In Progress
                    </span>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400">
                    Order #INV-2094 • Placed recently
                  </p>
                </div>
              </div>

              <div className="w-full flex-1 rounded-[20px] border border-slate-200 bg-slate-50 p-5 transition-colors group-hover:border-slate-300 lg:max-w-md dark:border-white/5 dark:bg-slate-900/50 dark:group-hover:border-white/10">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] font-bold">
                    <Clock className="h-4 w-4" /> Est. Delivery: {timeLeft.hours}h{' '}
                    {timeLeft.minutes.toString().padStart(2, '0')}m {timeLeft.seconds.toString().padStart(2, '0')}s
                  </span>
                  <span className="text-[11px] font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                    In Queue
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div className="bg-primary-500 absolute top-0 left-0 h-full w-[1%] rounded-full shadow-[0_0_10px_2px_rgba(99,102,241,0.5)]"></div>
                </div>
              </div>

              <button
                onClick={() => setShowContactModal(true)}
                className="flex shrink-0 items-center justify-center gap-2 rounded-[16px] border border-slate-200 bg-white px-5 py-3.5 text-[14px] font-bold text-slate-900 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] transition-all hover:bg-slate-50 active:scale-95 dark:border-white/10 dark:bg-[#1e2333] dark:text-white dark:hover:bg-[#252b3d]"
              >
                <MessageCircle className="text-primary-500 h-4 w-4 shrink-0" /> Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="mb-10 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] dark:border-white/5 dark:bg-[#0b0f19]">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 px-6 py-8 sm:flex-row sm:items-center md:px-8 dark:border-white/5">
          <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-slate-200/50 bg-slate-50 shadow-sm dark:border-white/5 dark:bg-slate-800/50">
              <Activity className="h-5 w-5 text-slate-500" />
            </span>
            Recent Engagement
          </h2>
          <button className="text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 rounded-xl px-4 py-2 text-[13px] font-bold transition-colors">
            View All Activity
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 text-slate-500 dark:bg-white/2 dark:text-slate-400">
              <tr>
                <th className="px-8 py-4 text-[11px] font-bold tracking-widest whitespace-nowrap uppercase">Event</th>
                <th className="px-8 py-4 text-[11px] font-bold tracking-widest whitespace-nowrap uppercase">Viewer</th>
                <th className="px-8 py-4 text-[11px] font-bold tracking-widest whitespace-nowrap uppercase">Time</th>
                <th className="px-8 py-4 text-right text-[11px] font-bold tracking-widest whitespace-nowrap uppercase">
                  Platform
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {tableData.map((row) => (
                <tr
                  key={row.id}
                  className="group cursor-default transition-colors hover:bg-slate-50/80 dark:hover:bg-[#121827]"
                >
                  <td className="flex items-center gap-4 px-8 py-5 font-bold text-slate-900 dark:text-slate-200">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-sky-50 text-sky-600 transition-transform group-hover:scale-110 dark:bg-sky-500/10 dark:text-sky-400">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    {row.event}
                  </td>
                  <td className="px-8 py-5 font-semibold text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      {row.viewer !== 'Guest' ? (
                        <div className="bg-primary-100 dark:bg-primary-500/20 text-primary-600 dark:text-primary-400 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold">
                          {row.viewer.charAt(0)}
                        </div>
                      ) : (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 dark:bg-slate-800">
                          G
                        </div>
                      )}
                      {row.viewer}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-medium text-slate-500 dark:text-slate-400">{row.time}</td>
                  <td className="px-8 py-5 text-right font-medium">
                    <span className="group-hover:border-primary-500/30 group-hover:text-primary-600 dark:group-hover:text-primary-400 inline-flex items-center rounded-[10px] border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-bold tracking-wider text-slate-600 uppercase shadow-sm transition-colors dark:border-white/10 dark:bg-slate-800 dark:text-slate-300">
                      {row.platform}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </div>
  )
}
