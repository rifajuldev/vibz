import type { VCardData, VCardPersonal } from '@/types/vcard'
import {
  createDefaultDisplaySettings,
  createDefaultFieldConfig,
  normalizeFieldConfig,
  type DisplayFieldConfig,
  type VCardDisplaySettings,
} from '@/types/vcardDisplaySettings'

export {
  createDefaultDisplaySettings,
  createDefaultFieldConfig,
  normalizeFieldConfig,
} from '@/types/vcardDisplaySettings'

export const MY_INFO_FIELDS = [
  'MyInfo section Name',
  'MyInfo Profession',
  'MyInfo Designation',
  'MyInfo Company',
  'MyInfo Address',
  'MyInfo Email',
  'MyInfo Phone',
  'MyInfo Whatsapp',
  'MyInfo Company / Office Name',
  'MyInfo section Company / Office Name',
  'MyInfo Relationship Status',
  'MyInfo Website',
  'Name',
  'Profession',
  'Designation',
  'Age',
  'Gender',
  'About Me',
] as const

export const SOCIAL_LINK_FIELDS = [
  'FaceBook',
  'Twitter',
  'Instagram',
  'TikTok',
  'Youtube',
  'LinkedIn',
  'Whatsapp',
  'Rumble',
  'Truth',
  'Pinterest',
  'Share',
  'Vcard View Counter',
  'Language',
  'CRM',
  'Website',
] as const

export const ICON_FIELDS = [
  'Profession Icon',
  'Name',
  'Age Icon',
  'Address Icon',
  'Email Icon',
  'Phone Icon',
  'Company/Office Icon',
  'Gender Icon',
  'Relationship Status Icon',
  'My Info Website Icon',
  'My Info Whatsapp',
] as const

export const GENERAL_SETTINGS_FIELDS = [
  'Zip',
  'Pages Header',
  'Save Contact',
  'My Info Btn',
  'My vCard Btn',
  'Share Btn',
  'Get your VCard Now',
  'Your QR Code',
  'Home Page BG Color',
  'Home Page Banner Color',
] as const

export const HOME_PAGE_FIELDS = [
  'Intro vCard Video',
  'Intro YouTube vCard Video Link',
  'Background Music',
  'YouTube Background Music Link',
  'Background Video/Image',
  'Profile Image/Video',
  'Save Contact',
  'Skills',
  'vCard Header Color',
  'Info Box Style',
  'Repeat Background Music',
] as const

export const NAV_BAR_FIELDS = [
  'About Me',
  'Additional Services',
  'Announcement',
  'BBB',
  'Blog',
  'Booking',
  'Breakfast',
  'Calender',
  'Certifications/Licenses',
  'Clients',
  'Company Mission Statement',
  'Contact Us',
  'DCP',
  'Dinner',
  'Events',
  'Faq',
  'Gallery',
  'Home',
  'Home Solar',
  'Inventory',
  'Join My Team',
  'Lunch',
  'Menu',
  'Meet Our Team',
  'Nav Background Color',
  'Press/Media',
  'Property Listing',
  'Public Cards',
  'Resiliency Products',
  'Resume',
  'Work Experience',
  'Reviews',
  'See Product',
  'Services',
  '24/h SalesPerson',
  'Video Links',
  'Videos',
  'Who We Are',
  '2D Explainer',
] as const

export const ALL_DISPLAY_FIELD_KEYS = [
  ...MY_INFO_FIELDS,
  ...SOCIAL_LINK_FIELDS,
  ...ICON_FIELDS,
  ...GENERAL_SETTINGS_FIELDS,
  ...HOME_PAGE_FIELDS,
  ...NAV_BAR_FIELDS,
] as const

/** Maps back-office My Info labels to personal data keys on the vCard. */
export const MY_INFO_TO_PERSONAL: Record<string, keyof VCardPersonal> = {
  'MyInfo section Name': 'fullName',
  Name: 'fullName',
  'MyInfo Profession': 'profession',
  Profession: 'profession',
  'MyInfo Designation': 'designation',
  Designation: 'designation',
  'MyInfo Company': 'company',
  'MyInfo Company / Office Name': 'company',
  'MyInfo section Company / Office Name': 'company',
  'MyInfo Address': 'address',
  'MyInfo Email': 'email',
  'MyInfo Phone': 'phone',
  'MyInfo Whatsapp': 'whatsapp',
  'MyInfo Website': 'website',
  'MyInfo Relationship Status': 'relationship',
  Gender: 'gender',
  'About Me': 'about',
}

/** Maps nav bar setting labels to profile tab ids (v2 shell). */
export const TAB_ID_TO_NAV_LABEL: Record<string, string> = {
  home: 'Home',
  about: 'About Me',
  mission: 'Company Mission Statement',
  services: 'Services',
  additional: 'Additional Services',
  blog: 'Blog',
  videos: 'Videos',
  gallery: 'Gallery',
  explainer: '2D Explainer',
  reviews: 'Reviews',
  certificates: 'Certifications/Licenses',
  education: 'Resume',
  work: 'Work Experience',
  calendar: 'Calender',
  'public-cards': 'Public Cards',
  faq: 'Faq',
}

export const NAV_LABEL_TO_TAB_ID: Record<string, string> = {
  Home: 'home',
  'About Me': 'about',
  'Company Mission Statement': 'mission',
  Services: 'services',
  'Additional Services': 'additional',
  Blog: 'blog',
  Videos: 'videos',
  'Video Links': 'videos',
  Gallery: 'gallery',
  '2D Explainer': 'explainer',
  Reviews: 'reviews',
  'Certifications/Licenses': 'certificates',
  Resume: 'education',
  'Work Experience': 'work',
  Calender: 'calendar',
  Calendar: 'calendar',
  'Public Cards': 'public-cards',
  Faq: 'faq',
  FAQ: 'faq',
}

/** Maps social link setting labels to lucide/network keys used in the profile home grid. */
export const SOCIAL_LABEL_TO_NETWORK: Record<string, string> = {
  FaceBook: 'facebook',
  Twitter: 'twitter',
  Instagram: 'instagram',
  LinkedIn: 'linkedin',
  Youtube: 'youtube',
  Whatsapp: 'whatsapp',
  Website: 'website',
}

const DEFAULT_SETTINGS = createDefaultDisplaySettings([...ALL_DISPLAY_FIELD_KEYS])

export function resolveDisplaySettings(raw?: VCardDisplaySettings | null): VCardDisplaySettings {
  if (!raw) return DEFAULT_SETTINGS
  const fields = { ...DEFAULT_SETTINGS.fields }
  for (const [key, config] of Object.entries(raw.fields || {})) {
    fields[key] = normalizeFieldConfig({ ...createDefaultFieldConfig(), ...config })
  }
  return {
    globalEnabled: raw.globalEnabled ?? true,
    fields,
  }
}

/** Colors shown in the back-office pickers when a field has no custom override yet. */
export function getFieldColorPreview(
  kind: 'text' | 'bg' | 'icon',
  theme?: { primaryColor?: string; accentColor?: string },
  profileTemplate: 'v1' | 'v2' = 'v2'
): string {
  const accent = theme?.accentColor || (profileTemplate === 'v1' ? '#dcc969' : '#eab308')
  const primary = theme?.primaryColor || accent
  switch (kind) {
    case 'text':
      return profileTemplate === 'v1' ? '#e0e0e0' : '#18181b'
    case 'bg':
      return profileTemplate === 'v1' ? '#050505' : '#fafafa'
    case 'icon':
      return accent
    default:
      return primary
  }
}

export function getFieldConfig(settings: VCardDisplaySettings, key: string): DisplayFieldConfig {
  return settings.fields[key] ?? createDefaultFieldConfig()
}

/** Content sections that always appear on mobile; desktop may still respect Card Settings visibility. */
export const MOBILE_ALWAYS_VISIBLE_NAV_FIELDS = new Set(['Resume', 'Work Experience', 'Services', 'Blog'])

export function isFieldVisible(settings: VCardDisplaySettings, key: string): boolean {
  if (!settings.globalEnabled) return false
  return getFieldConfig(settings, key).visible
}

export function isFieldVisibleInProfile(
  settings: VCardDisplaySettings,
  key: string,
  options?: { isMobileViewport?: boolean }
): boolean {
  if (options?.isMobileViewport && MOBILE_ALWAYS_VISIBLE_NAV_FIELDS.has(key)) return true
  return isFieldVisible(settings, key)
}

export function getDisplaySettingsFromVCard(data: VCardData): VCardDisplaySettings {
  return resolveDisplaySettings(data.displaySettings)
}

export function patchDisplayField(
  settings: VCardDisplaySettings,
  key: string,
  patch: Partial<DisplayFieldConfig>
): VCardDisplaySettings {
  const current = getFieldConfig(settings, key)
  return {
    ...settings,
    fields: {
      ...settings.fields,
      [key]: { ...current, ...patch },
    },
  }
}

export function setCategoryEnableAll(
  settings: VCardDisplaySettings,
  keys: readonly string[],
  enabled: boolean
): VCardDisplaySettings {
  let next = settings
  for (const key of keys) {
    next = patchDisplayField(next, key, { visible: enabled })
  }
  return next
}

export function getPersonalValueForField(personal: VCardPersonal, fieldKey: string): string {
  const path = MY_INFO_TO_PERSONAL[fieldKey]
  if (!path) return ''
  const value = personal[path]
  return typeof value === 'string' ? value.trim() : ''
}

export function getHomeMediaUrls(settings: VCardDisplaySettings, personal: VCardPersonal) {
  const introVideo =
    getFieldConfig(settings, 'Intro vCard Video').customValue?.trim() ||
    getFieldConfig(settings, 'Intro YouTube vCard Video Link').customValue?.trim() ||
    personal.explainerVideoUrl?.trim() ||
    ''
  const bgMedia = getFieldConfig(settings, 'Background Video/Image').customValue?.trim() || ''
  const profileMedia = getFieldConfig(settings, 'Profile Image/Video').customValue?.trim() || ''
  return { introVideo, bgMedia, profileMedia }
}

/** Background color for a profile nav tab from Card Settings → Nav Bar (e.g. "About Me"). */
export function getNavTabBackgroundColor(settings: VCardDisplaySettings, tabId: string): string | undefined {
  const navLabel = TAB_ID_TO_NAV_LABEL[tabId]
  if (!navLabel) return undefined
  return getFieldConfig(settings, navLabel).backgroundColor || undefined
}

export function getPageColors(settings: VCardDisplaySettings) {
  const pageBg = getFieldConfig(settings, 'Home Page BG Color').backgroundColor
  const pageBanner = getFieldConfig(settings, 'Home Page Banner Color').backgroundColor
  const headerColor = getFieldConfig(settings, 'vCard Header Color').textColor
  const navBg = getFieldConfig(settings, 'Nav Background Color').backgroundColor
  return {
    pageBg: pageBg || undefined,
    pageBanner: pageBanner || undefined,
    headerColor: headerColor || undefined,
    navBg: navBg || undefined,
  }
}
