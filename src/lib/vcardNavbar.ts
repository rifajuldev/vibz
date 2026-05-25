import { createDefaultFieldConfig, normalizeFieldConfig, type VCardDisplaySettings } from '@/types/vcardDisplaySettings'
import type { LucideIcon } from 'lucide-react'
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  CalendarDays,
  Camera,
  Coffee,
  FileEdit,
  FileText,
  Film,
  GraduationCap,
  Headphones,
  Home,
  Lightbulb,
  Megaphone,
  Menu,
  Newspaper,
  Package,
  Phone,
  PlaySquare,
  ScrollText,
  Settings,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Star,
  Sun,
  User,
  UserPlus,
  Users,
  Utensils,
  UtensilsCrossed,
  Video,
  Wrench,
} from 'lucide-react'

/** Card Settings → Nav Bar field order (primary tabs first, chrome last). */
export const NAV_BAR_FIELDS = [
  'Home',
  'About Me',
  'Company Mission Statement',
  'Services',
  'Additional Services',
  'Announcement',
  'BBB',
  'Blog',
  'Booking',
  'Breakfast',
  'Calender',
  'Certifications/Licenses',
  'Clients',
  'Contact Us',
  'DCP',
  'Dinner',
  'Events',
  'Faq',
  'Gallery',
  'Home Solar',
  'Inventory',
  'Join My Team',
  'Lunch',
  'Menu',
  'Meet Our Team',
  'Press/Media',
  'Property Listing',
  'Public Cards',
  'Resiliency Products',
  'Resume',
  'Work Experience',
  'Reviews',
  'See Product',
  '24/h SalesPerson',
  'Video Links',
  'Videos',
  'Who We Are',
  '2D Explainer',
  'Nav Background Color',
] as const

/** Global nav chrome color — not a profile tab. */
export const NAV_BACKGROUND_COLOR_FIELD = 'Nav Background Color' as const

export type ProfileNavContentKey =
  | 'home'
  | 'about'
  | 'mission'
  | 'services'
  | 'additional'
  | 'blog'
  | 'videos'
  | 'video-links'
  | 'gallery'
  | 'explainer'
  | 'reviews'
  | 'certificates'
  | 'education'
  | 'work'
  | 'calendar'
  | 'public-cards'
  | 'faq'
  | 'empty'

export type EditorNavPanel =
  | { kind: 'personal'; subTab?: number }
  | { kind: 'education' }
  | { kind: 'experience' }
  | { kind: 'skill' }
  | { kind: 'services' }
  | { kind: 'portfolio' }
  | { kind: 'blog' }
  | { kind: 'link-shortener' }
  | { kind: 'empty' }

export type NavBarNavItem = {
  id: string
  /** Card Settings → Nav Bar field key (visibility / colors). */
  label: string
  icon: LucideIcon
  profileContent: ProfileNavContentKey
  editorPanel: EditorNavPanel
}

const NAV_ITEM_DEFS: NavBarNavItem[] = [
  { id: 'home', label: 'Home', icon: Home, profileContent: 'home', editorPanel: { kind: 'personal', subTab: 4 } },
  { id: 'about', label: 'About Me', icon: User, profileContent: 'about', editorPanel: { kind: 'personal', subTab: 2 } },
  {
    id: 'mission',
    label: 'Company Mission Statement',
    icon: ScrollText,
    profileContent: 'mission',
    editorPanel: { kind: 'empty' },
  },
  { id: 'services', label: 'Services', icon: Wrench, profileContent: 'services', editorPanel: { kind: 'services' } },
  {
    id: 'additional',
    label: 'Additional Services',
    icon: Settings,
    profileContent: 'additional',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'announcement',
    label: 'Announcement',
    icon: Megaphone,
    profileContent: 'empty',
    editorPanel: { kind: 'empty' },
  },
  { id: 'bbb', label: 'BBB', icon: Shield, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'blog', label: 'Blog', icon: FileEdit, profileContent: 'blog', editorPanel: { kind: 'blog' } },
  { id: 'booking', label: 'Booking', icon: CalendarDays, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'breakfast', label: 'Breakfast', icon: Coffee, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'calendar', label: 'Calender', icon: Calendar, profileContent: 'calendar', editorPanel: { kind: 'empty' } },
  {
    id: 'certificates',
    label: 'Certifications/Licenses',
    icon: Award,
    profileContent: 'certificates',
    editorPanel: { kind: 'empty' },
  },
  { id: 'clients', label: 'Clients', icon: Users, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'contact-us', label: 'Contact Us', icon: Phone, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'dcp', label: 'DCP', icon: FileText, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'dinner', label: 'Dinner', icon: Utensils, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'events', label: 'Events', icon: CalendarDays, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'faq', label: 'Faq', icon: Lightbulb, profileContent: 'faq', editorPanel: { kind: 'empty' } },
  { id: 'gallery', label: 'Gallery', icon: Camera, profileContent: 'gallery', editorPanel: { kind: 'portfolio' } },
  { id: 'home-solar', label: 'Home Solar', icon: Sun, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'inventory', label: 'Inventory', icon: Package, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'join-team', label: 'Join My Team', icon: UserPlus, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'lunch', label: 'Lunch', icon: UtensilsCrossed, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'menu', label: 'Menu', icon: Menu, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'meet-team', label: 'Meet Our Team', icon: Users, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  { id: 'press', label: 'Press/Media', icon: Newspaper, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  {
    id: 'property-listing',
    label: 'Property Listing',
    icon: Building2,
    profileContent: 'empty',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'public-cards',
    label: 'Public Cards',
    icon: Users,
    profileContent: 'public-cards',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'resiliency',
    label: 'Resiliency Products',
    icon: ShieldCheck,
    profileContent: 'empty',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'education',
    label: 'Resume',
    icon: GraduationCap,
    profileContent: 'education',
    editorPanel: { kind: 'education' },
  },
  {
    id: 'work',
    label: 'Work Experience',
    icon: Briefcase,
    profileContent: 'work',
    editorPanel: { kind: 'experience' },
  },
  { id: 'reviews', label: 'Reviews', icon: Star, profileContent: 'reviews', editorPanel: { kind: 'empty' } },
  {
    id: 'see-product',
    label: 'See Product',
    icon: ShoppingBag,
    profileContent: 'empty',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'sales-24h',
    label: '24/h SalesPerson',
    icon: Headphones,
    profileContent: 'empty',
    editorPanel: { kind: 'empty' },
  },
  {
    id: 'video-links',
    label: 'Video Links',
    icon: Film,
    profileContent: 'video-links',
    editorPanel: { kind: 'empty' },
  },
  { id: 'videos', label: 'Videos', icon: Video, profileContent: 'videos', editorPanel: { kind: 'empty' } },
  { id: 'who-we-are', label: 'Who We Are', icon: Users, profileContent: 'empty', editorPanel: { kind: 'empty' } },
  {
    id: 'explainer',
    label: '2D Explainer',
    icon: PlaySquare,
    profileContent: 'explainer',
    editorPanel: { kind: 'empty' },
  },
]

/** Nav items in Card Settings order (excludes Nav Background Color). */
export const NAV_BAR_NAV_ITEMS: NavBarNavItem[] = NAV_BAR_FIELDS.filter((key) => key !== NAV_BACKGROUND_COLOR_FIELD)
  .map((label) => NAV_ITEM_DEFS.find((item) => item.label === label))
  .filter((item): item is NavBarNavItem => Boolean(item))

export const TAB_ID_TO_NAV_LABEL: Record<string, string> = Object.fromEntries(
  NAV_BAR_NAV_ITEMS.map((item) => [item.id, item.label])
)

export const NAV_LABEL_TO_TAB_ID: Record<string, string> = Object.fromEntries(
  NAV_BAR_NAV_ITEMS.map((item) => [item.label, item.id])
)

export function isNavItemVisible(settings: VCardDisplaySettings, label: string): boolean {
  if (!settings.globalEnabled) return false
  const raw = settings.fields[label]
  const config = raw ? normalizeFieldConfig({ ...createDefaultFieldConfig(), ...raw }) : createDefaultFieldConfig()
  return config.visible
}

export function filterNavItemsByVisibility(items: NavBarNavItem[], settings: VCardDisplaySettings): NavBarNavItem[] {
  return items.filter((item) => isNavItemVisible(settings, item.label))
}

export function getNavItemBackgroundColor(settings: VCardDisplaySettings, label: string): string | undefined {
  const bg = settings.fields[label]?.backgroundColor?.trim()
  return bg || undefined
}

export function getNavItemById(id: string): NavBarNavItem | undefined {
  return NAV_BAR_NAV_ITEMS.find((item) => item.id === id)
}
