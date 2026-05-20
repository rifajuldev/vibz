import { FirebaseError } from 'firebase/app'
import { GoogleAuthProvider, signInWithPopup, type User } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Building2,
  Download,
  Eye,
  Facebook,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  PlaySquare,
  QrCode,
  TrendingUp,
  Twitter,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useState } from 'react'
import { auth, db, isFirebaseAvailable } from '../lib/firebase'
import { handleFirestoreError, OperationType } from '../lib/firebaseUtils'

type PublishUser = Pick<User, 'uid'> & {
  displayName?: string | null
  email?: string | null
}

const TypewriterText = ({ text, delay = 0, speed = 100 }: { text: string; delay?: number; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [startTyping, setStartTyping] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStartTyping(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!startTyping) return
    let i = 0
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1))
      i++
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [text, startTyping, speed])

  return (
    <span className="inline-flex min-h-[1.5em] items-center">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="ml-1.5 inline-block h-[1.1em] w-[3px] bg-[#eab308]"
      />
    </span>
  )
}

type ContactDetailItemData = {
  icon: LucideIcon
  label: string
  value: string
  detail: string
  isLink?: boolean
  href?: string
}

const ContactDetailItem: React.FC<{ item: ContactDetailItemData }> = ({ item }) => {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    if (item.isLink) return
    e.preventDefault()
    navigator.clipboard.writeText(item.value)
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 2000)
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative flex items-center rounded-xl p-3 transition-all duration-200 hover:bg-zinc-800/50 ${!item.isLink ? 'cursor-pointer active:scale-95' : ''}`}
    >
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center rounded-xl bg-[#eab308] text-xs font-bold tracking-wider text-zinc-950 uppercase"
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-100">
        <item.icon size={18} />
      </div>

      <div className="min-w-0 flex-1">
        <span className="block text-xs font-medium text-zinc-500">{item.label}</span>
        {item.isLink ? (
          <a
            href={item.href}
            onClick={(e) => e.stopPropagation()}
            className="group/link flex items-center gap-1 truncate text-sm font-semibold text-zinc-100 transition-colors hover:text-[#eab308]"
          >
            {item.value}
            <ArrowUpRight
              size={14}
              className="translate-x-1 -translate-y-1 text-zinc-400 opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:translate-y-0 group-hover/link:text-[#eab308] group-hover/link:opacity-100"
            />
          </a>
        ) : (
          <span className="block truncate text-sm font-semibold text-zinc-100">{item.value}</span>
        )}
      </div>

      <div className="rounded-md bg-zinc-800/80 px-2 py-1 text-[10px] font-semibold text-zinc-500">{item.detail}</div>
    </div>
  )
}

export const HomeSection = () => {
  const handlePublish = async () => {
    try {
      let user: PublishUser | null = auth.currentUser
      if (!isFirebaseAvailable) {
        user = { uid: 'guest_user', displayName: 'Guest Profile', email: 'guest@vbizme.com' }
      } else if (!user) {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        user = result.user
      }
      if (!user) return

      if (isFirebaseAvailable) {
        const cardRef = doc(db, 'cards', 'michaelangelo_casanova')
        const cardSnap = await getDoc(cardRef)
        if (cardSnap.exists()) {
          await updateDoc(cardRef, { lastUpdated: serverTimestamp() })
        } else {
          await setDoc(cardRef, {
            ownerId: user.uid,
            name: 'Michaelangelo Casanova',
            lastUpdated: serverTimestamp(),
            isPublic: true,
          })
        }
      }
      window.dispatchEvent(
        new CustomEvent('vbiz_platform_update', {
          detail: { title: 'Update Published', message: 'Card synced via quick action.' },
        })
      )
    } catch (error: unknown) {
      if (isFirebaseAvailable) {
        if (error instanceof FirebaseError && error.code === 'auth/popup-closed-by-user') {
          return
        }
        handleFirestoreError(error, OperationType.WRITE, 'cards')
      }
    }
  }

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row">
      {/* Left Column - Core Info */}
      <div className="flex flex-1 flex-col gap-6">
        {/* Quick Stats Bento */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Connections', val: '2.4K', icon: Users, color: 'text-zinc-300', bg: 'bg-zinc-800' },
            { label: 'Profile Views', val: '14.2K', icon: Eye, color: 'text-[#eab308]', bg: 'bg-[#eab308]/10' },
            { label: 'Growth', val: '+45%', icon: TrendingUp, color: 'text-zinc-300', bg: 'bg-zinc-800' },
            { label: 'Activity', val: 'High', icon: Activity, color: 'text-zinc-300', bg: 'bg-zinc-800' },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative flex flex-col items-start rounded-3xl border border-zinc-800/80 bg-zinc-900/50 p-5 backdrop-blur-xl transition-colors hover:bg-zinc-800/50"
            >
              <div className="mb-4 flex w-full items-center justify-between">
                <div className={`h-10 w-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon size={18} />
                </div>
                <h4 className="text-2xl font-bold text-zinc-100">{stat.val}</h4>
              </div>
              <p className="text-xs font-semibold tracking-wider text-zinc-500 uppercase">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Contact Details Grid */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-zinc-800/80 p-5">
            <h3 className="font-bold text-zinc-100">Contact Details</h3>
            <span className="text-[10px] font-bold tracking-wider text-[#eab308] uppercase">Verified</span>
          </div>
          <div className="grid grid-cols-1 gap-2 p-3 sm:grid-cols-2">
            {[
              { icon: Briefcase, label: 'Profession', value: 'CEO', detail: 'Growth' },
              {
                icon: Mail,
                label: 'Email',
                value: 'mcasanova',
                isLink: true,
                href: 'mailto:mcasanova@vbizme.com',
                detail: 'Contact',
              },
              {
                icon: Phone,
                label: 'Phone',
                value: '860-770-9893',
                isLink: true,
                href: 'tel:8607709893',
                detail: 'Direct',
              },
              { icon: Building2, label: 'Company', value: 'vBiz Me', detail: 'Innovation' },
              {
                icon: Globe,
                label: 'Website',
                value: 'vbizme.com',
                isLink: true,
                href: 'https://www.vbizme.com',
                detail: 'Digital',
              },
              { icon: MapPin, label: 'Address', value: 'CT', detail: 'HQ' },
            ].map((item, idx) => (
              <ContactDetailItem key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Actions & Social */}
      <div className="flex w-full shrink-0 flex-col gap-6 lg:w-[320px]">
        {/* Quick Actions */}
        <div className="relative flex flex-col overflow-hidden rounded-[1.5rem] border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl">
          <h3 className="mb-2 font-bold text-zinc-100">Save & Sync</h3>
          <p className="mb-6 text-sm font-medium text-zinc-400">Add my complete profile to your device instantly.</p>

          <button className="group/btn mb-3 flex w-full items-center justify-between rounded-xl bg-zinc-100 px-5 py-3.5 text-sm font-bold text-zinc-950 transition-all hover:bg-white active:scale-95">
            <span className="flex items-center gap-3">
              <Download size={18} /> Add to Contacts
            </span>
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>

          <button
            onClick={handlePublish}
            className="group/btn flex w-full items-center justify-between rounded-xl bg-zinc-800 px-5 py-3.5 text-sm font-bold text-zinc-200 transition-all hover:bg-zinc-700 active:scale-95"
          >
            <span className="flex items-center gap-3">
              <QrCode size={18} /> Sync Online
            </span>
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>

        {/* Social Network */}
        <div className="flex flex-col rounded-[1.5rem] border border-zinc-800/80 bg-zinc-900/50 p-6 backdrop-blur-xl">
          <h3 className="mb-6 font-bold text-zinc-100">Network</h3>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Twitter, brand: 'hover:bg-[#1da1f2] hover:border-[#1da1f2]' },
              { icon: Facebook, brand: 'hover:bg-[#1877f2] hover:border-[#1877f2]' },
              { icon: Instagram, brand: 'hover:bg-[#e1306c] hover:border-[#e1306c]' },
              { icon: Linkedin, brand: 'hover:bg-[#0a66c2] hover:border-[#0a66c2]' },
              { icon: PlaySquare, brand: 'hover:bg-[#ff0000] hover:border-[#ff0000]' },
              { icon: Globe, brand: 'hover:bg-zinc-700 hover:border-zinc-600' },
            ].map((item, idx) => (
              <a
                key={idx}
                href="#"
                className={`flex aspect-square items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800 text-zinc-400 ${item.brand} transition-all hover:text-white active:scale-95`}
              >
                <item.icon size={20} fill="currentColor" className="opacity-90" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
