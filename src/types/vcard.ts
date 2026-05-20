export type VCardTheme = {
  primaryColor: string
  accentColor: string
  darkMode: boolean
  /** Matches Settings → Appearance typography id when synced */
  fontFamily?: string
}

export type VCardPersonal = {
  fullName: string
  email: string
  dob: string
  gender: string
  relationship: string
  profession: string
  designation: string
  company: string
  phone: string
  whatsapp: string
  address: string
  about: string
  /** Shown on the public profile preloader (Personal → Explainer Video) */
  explainerVideoUrl?: string
}

export type VCardData = {
  slug: string
  isPublic: boolean
  personal: VCardPersonal
  theme: VCardTheme
  services: unknown[]
  portfolio: unknown[]
  socials: unknown[]
}

export type VCardListMeta = {
  views: number
  saves: number
  /** Dashboard card image (Media & Profile) */
  avatarImageUrl: string
  isActive: boolean
}

export type VCardRecord = VCardData &
  VCardListMeta & {
    id: string
    createdAt: string
    updatedAt: string
  }

export function createDefaultVCardData(overrides?: Partial<VCardData>): VCardData {
  const base: VCardData = {
    slug: '',
    isPublic: true,
    personal: {
      fullName: '',
      email: '',
      dob: '',
      gender: 'Male',
      relationship: 'Single',
      profession: '',
      designation: '',
      company: '',
      phone: '',
      whatsapp: '',
      address: '',
      about: '',
      explainerVideoUrl: '',
    },
    theme: {
      primaryColor: '#6366f1',
      accentColor: '#f43f5e',
      darkMode: true,
      fontFamily: 'inter',
    },
    services: [],
    portfolio: [],
    socials: [],
  }
  if (!overrides) return base
  return {
    ...base,
    ...overrides,
    personal: { ...base.personal, ...overrides.personal },
    theme: { ...base.theme, ...overrides.theme },
  }
}
