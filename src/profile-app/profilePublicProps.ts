import type { ResolvedProfileDesign } from '@/lib/resolvedProfileDesign'
import { resolveProfileDesignFromData } from '@/lib/resolvedProfileDesign'
import { DEFAULT_LIVE_AGENT_CARD, type LiveAgentCardData } from '@/profile-app/lib/liveAgentPrompt'
import type { DesignSettingsState } from '@/redux/features/designSettings/designSettings.slice'
import type { VCardData, VCardRecord } from '@/types/vcard'

const DEFAULT_COVER = 'https://app.vbizme.com/storage/ecard/backgroundVideos/91/Untitled%20design-36.mp4'
const DEFAULT_AVATAR = 'https://app.vbizme.com/storage/ecard/profileimages/91/mc%20vbizme.mp4'

export type VBizProfileAppProps = {
  explainerVideoUrl?: string | null
  cardOwnerId?: string
  ownerName?: string
  tagline?: string
  coverVideoUrl?: string
  avatarVideoUrl?: string
  liveAgentCardData?: LiveAgentCardData
  design?: ResolvedProfileDesign
  /** Public slug used to build the share URL. */
  shareSlug?: string
  /** Skip intro preloader and scope theme (editor preview). */
  embedded?: boolean
  /** Controlled theme for live preview chrome (optional). */
  previewTheme?: 'light' | 'dark'
  onPreviewThemeChange?: (theme: 'light' | 'dark') => void
}

export function buildProfileShareUrl(slug: string): string {
  const trimmed = slug.trim()
  if (!trimmed) return ''
  if (typeof window !== 'undefined') {
    return `${window.location.origin}/v/${trimmed}`
  }
  return `https://vbiz.me/${trimmed}`
}

export function vCardDataToProfileProps(
  data: VCardData,
  designSettings: DesignSettingsState,
  meta?: { id?: string; avatarImageUrl?: string }
): VBizProfileAppProps {
  const slug = data.slug.trim()
  return {
    explainerVideoUrl: data.personal.explainerVideoUrl,
    cardOwnerId: meta?.id ?? 'preview',
    ownerName: data.personal.fullName || 'Your Name',
    tagline:
      data.personal.about?.trim() ||
      [data.personal.designation, data.personal.company].filter(Boolean).join(' · ') ||
      'Your digital introduction',
    coverVideoUrl: DEFAULT_COVER,
    avatarVideoUrl: meta?.avatarImageUrl?.includes('.mp4') ? meta.avatarImageUrl : DEFAULT_AVATAR,
    design: resolveProfileDesignFromData(data, designSettings),
    shareSlug: slug || undefined,
    liveAgentCardData: {
      ownerName: data.personal.fullName || DEFAULT_LIVE_AGENT_CARD.ownerName,
      title: data.personal.designation || data.personal.profession || DEFAULT_LIVE_AGENT_CARD.title,
      company: data.personal.company || DEFAULT_LIVE_AGENT_CARD.company,
      email: data.personal.email || DEFAULT_LIVE_AGENT_CARD.email,
      phone: data.personal.phone || DEFAULT_LIVE_AGENT_CARD.phone,
      website: slug ? `https://vbiz.me/${slug}` : DEFAULT_LIVE_AGENT_CARD.website,
      location: data.personal.address || DEFAULT_LIVE_AGENT_CARD.location,
    },
  }
}

export function vCardRecordToProfileProps(
  record: VCardRecord,
  designSettings: DesignSettingsState
): VBizProfileAppProps {
  return vCardDataToProfileProps(record, designSettings, {
    id: record.id,
    avatarImageUrl: record.avatarImageUrl,
  })
}

export const DEMO_PROFILE_PROPS: VBizProfileAppProps = {
  cardOwnerId: '91',
  ownerName: 'Michaelangelo C.',
  tagline: 'Visionary founder and growth strategist scaling vBiz ecosystem globally.',
  coverVideoUrl: DEFAULT_COVER,
  avatarVideoUrl: DEFAULT_AVATAR,
  liveAgentCardData: DEFAULT_LIVE_AGENT_CARD,
}
