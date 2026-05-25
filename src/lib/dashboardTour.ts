export const DASHBOARD_TOUR_STORAGE_PREFIX = 'vbiz_dashboard_tour_'

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right' | 'center'

export type EditorTourAssist = {
  settingsOpen?: boolean
  settingsTab?: string
  activeNavId?: string
}

export type SettingsTourAssist = {
  activeTab?: string
}

export type DashboardTourStep = {
  id: string
  title: string
  description: string
  /** CSS selector via data-tour-id attribute */
  target?: string
  /** Pathname the step belongs to. Omit for steps valid on any dashboard route. */
  route?: string
  placement?: TourPlacement
  /** Navigate when the user clicks Next */
  nextNavigate?: string
  editorAssist?: EditorTourAssist
  settingsAssist?: SettingsTourAssist
  /** Open mobile nav before highlighting (small screens) */
  openMobileNav?: boolean
  /** Scroll the page to bring the target into view (default: true for editor panel targets) */
  scrollTarget?: boolean
}

export const DASHBOARD_TOUR_STEPS: DashboardTourStep[] = [
  {
    id: 'welcome',
    route: '/',
    placement: 'center',
    title: 'Welcome to vbiz.me',
    description:
      'This quick tour shows you how to create your first vCard and explore the key areas of your dashboard. You can skip anytime.',
  },
  {
    id: 'nav-vcards',
    route: '/',
    target: 'tour-nav-vcards',
    placement: 'bottom',
    title: 'My vCards',
    description: 'Your digital business cards live here. Open My vCards to create, edit, and manage every card.',
    nextNavigate: '/vcards',
    openMobileNav: true,
  },
  {
    id: 'create-vcard',
    route: '/vcards',
    target: 'tour-create-vcard',
    placement: 'bottom',
    title: 'Create your first vCard',
    description: 'Tap Create New to start building your profile. You can add more cards anytime from this page.',
    nextNavigate: '/vcards/create',
  },
  {
    id: 'editor-settings',
    route: '/vcards/create',
    target: 'tour-editor-settings',
    placement: 'bottom',
    title: 'Card settings',
    description: 'Open Settings to customize layout, colors, navigation, and the template for this vCard.',
  },
  {
    id: 'card-template',
    route: '/vcards/create',
    target: 'tour-card-template-tab',
    placement: 'right',
    title: 'Template',
    description: 'Open Template to customize your vCard design — layout, colors, and styling options live here.',
    editorAssist: { settingsOpen: true, settingsTab: 'template' },
  },
  {
    id: 'card-template-picker',
    route: '/vcards/create',
    target: 'tour-card-template-picker',
    placement: 'left',
    title: 'Profile templates',
    description:
      'Link in Bio is selected by default for new vCards. This is where you browse layouts — switch anytime when you want a different look. No need to change it now.',
    editorAssist: { settingsOpen: true, settingsTab: 'template' },
    scrollTarget: true,
  },
  {
    id: 'template-default-note',
    route: '/vcards/create',
    placement: 'center',
    title: 'Default template for new cards',
    description:
      'Changes here apply to this vCard only. To set a default layout for every new card you create, go to Settings → Design → Template on your account.',
    editorAssist: { settingsOpen: true, settingsTab: 'template' },
  },
  {
    id: 'card-navbar-settings',
    route: '/vcards/create',
    target: 'tour-card-navbar-content',
    placement: 'left',
    title: 'Navigation bar settings',
    description:
      'Enable or disable sections like About Me, Services, Blog, Contact Us, and Events. Only visible tabs appear on your live vCard.',
    editorAssist: { settingsOpen: true, settingsTab: 'navbar' },
    scrollTarget: true,
  },
  {
    id: 'card-home-settings',
    route: '/vcards/create',
    target: 'tour-card-home-content',
    placement: 'left',
    title: 'Home page settings',
    description: 'Control which elements show on your home section — banners, media, and profile highlights.',
    editorAssist: { settingsOpen: true, settingsTab: 'home' },
    scrollTarget: true,
  },
  {
    id: 'editor-home',
    route: '/vcards/create',
    target: 'tour-editor-panel-home',
    placement: 'bottom',
    title: 'Home section',
    description:
      'The Home tab is your main landing area. Edit media, profile details, and first-impression content here.',
    editorAssist: { activeNavId: 'home' },
    scrollTarget: true,
  },
  {
    id: 'editor-about',
    route: '/vcards/create',
    target: 'tour-editor-panel-about',
    placement: 'bottom',
    title: 'About Me',
    description:
      'Share your story, bio, and personal details. Visitors often read this section first after your home page.',
    editorAssist: { activeNavId: 'about' },
    scrollTarget: true,
  },
  {
    id: 'editor-services',
    route: '/vcards/create',
    target: 'tour-editor-panel-services',
    placement: 'bottom',
    title: 'Services',
    description:
      'List what you offer with descriptions and pricing. Great for freelancers, agencies, and local businesses.',
    editorAssist: { activeNavId: 'services' },
    scrollTarget: true,
  },
  {
    id: 'editor-blog',
    route: '/vcards/create',
    target: 'tour-editor-panel-blog',
    placement: 'bottom',
    title: 'Blog',
    description: 'Publish articles and updates directly on your vCard to keep your audience engaged.',
    editorAssist: { activeNavId: 'blog' },
    scrollTarget: true,
  },
  {
    id: 'editor-contact',
    route: '/vcards/create',
    target: 'tour-editor-panel-contact-us',
    placement: 'bottom',
    title: 'Contact Us',
    description: 'Make it easy for visitors to reach you. Enable this tab when you want a dedicated contact section.',
    editorAssist: { activeNavId: 'contact-us' },
    scrollTarget: true,
  },
  {
    id: 'editor-events',
    route: '/vcards/create',
    target: 'tour-editor-panel-events',
    placement: 'bottom',
    title: 'Events',
    description: 'Promote upcoming events, workshops, or appearances on your vCard.',
    editorAssist: { activeNavId: 'events' },
    scrollTarget: true,
  },
  {
    id: 'nav-settings',
    target: 'tour-nav-settings',
    placement: 'bottom',
    title: 'Account settings',
    description: 'Manage your profile, security, billing, and platform-wide design defaults from Settings.',
    nextNavigate: '/settings',
    openMobileNav: true,
  },
  {
    id: 'account-template',
    route: '/settings',
    target: 'tour-account-template',
    placement: 'right',
    title: 'Account template defaults',
    description:
      'Set the default template and appearance for every new vCard you create. Individual cards can still override these.',
    settingsAssist: { activeTab: 'template' },
  },
  {
    id: 'complete',
    route: '/settings',
    placement: 'center',
    title: "You're ready to go",
    description:
      'You now know the essentials — create vCards, customize templates, and manage sections. Build something great!',
  },
]

export function getTourStorageKey(uid: string) {
  return `${DASHBOARD_TOUR_STORAGE_PREFIX}${uid}`
}

export function isTourCompleted(uid: string): boolean {
  if (typeof window === 'undefined') return true
  return localStorage.getItem(getTourStorageKey(uid)) === 'completed'
}

export function markTourCompleted(uid: string) {
  localStorage.setItem(getTourStorageKey(uid), 'completed')
}

export function findTourTargetElement(targetId: string): HTMLElement | null {
  const selectors = [`#${CSS.escape(targetId)}`, `[data-tour-id="${targetId}"]`]

  for (const selector of selectors) {
    const nodes = document.querySelectorAll<HTMLElement>(selector)
    for (const node of nodes) {
      if (node.isConnected) return node
    }
  }

  return null
}

export function findVisibleTourTarget(targetId: string): HTMLElement | null {
  const selectors = [`#${CSS.escape(targetId)}`, `[data-tour-id="${targetId}"]`]

  for (const selector of selectors) {
    const nodes = document.querySelectorAll<HTMLElement>(selector)
    for (const node of nodes) {
      if (isElementVisibleForTour(node)) return node
    }
  }

  return null
}

function isElementVisibleForTour(el: HTMLElement): boolean {
  const candidate = el.closest<HTMLElement>('a, button, [data-tour-id]') ?? el
  const rect = candidate.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) return false

  let node: HTMLElement | null = candidate
  while (node) {
    const style = window.getComputedStyle(node)
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false
    }
    node = node.parentElement
  }

  return true
}

const HIGHLIGHT_ATTR = 'data-vbiz-tour-highlight'
const HEADER_BOOST_ATTR = 'data-vbiz-tour-header-boost'

/** Elevates the active tour target above the overlay (fixes sticky header stacking). */
export function setTourTargetHighlight(targetId: string | null | undefined) {
  clearTourTargetHighlight()

  if (!targetId) return

  const el = findVisibleTourTarget(targetId)
  if (!el) return

  const highlightEl = el.closest<HTMLElement>('a, button') ?? el

  highlightEl.setAttribute(HIGHLIGHT_ATTR, 'true')
  if (window.getComputedStyle(highlightEl).position === 'static') {
    highlightEl.style.position = 'relative'
  }
  highlightEl.style.zIndex = '10003'

  const header = highlightEl.closest('header')
  if (header instanceof HTMLElement) {
    header.setAttribute(HEADER_BOOST_ATTR, 'true')
    header.style.position = 'sticky'
    header.style.zIndex = '10003'
  }
}

export function clearTourTargetHighlight() {
  document.querySelectorAll<HTMLElement>(`[${HIGHLIGHT_ATTR}]`).forEach((el) => {
    el.removeAttribute(HIGHLIGHT_ATTR)
    el.style.zIndex = ''
    el.style.position = ''
  })

  document.querySelectorAll<HTMLElement>(`[${HEADER_BOOST_ATTR}]`).forEach((header) => {
    header.removeAttribute(HEADER_BOOST_ATTR)
    header.style.zIndex = ''
    header.style.position = ''
  })
}

export function resolveTourBackRoute(prevStepIndex: number): string {
  for (let i = prevStepIndex; i >= 0; i--) {
    const route = DASHBOARD_TOUR_STEPS[i]?.route
    if (route) return route
  }
  return '/'
}

export function routeMatchesStep(pathname: string, step: DashboardTourStep): boolean {
  if (!step.route) return true
  if (step.route === '/') return pathname === '/'
  return pathname === step.route || pathname.startsWith(`${step.route}/`)
}

export function shouldScrollTourStep(step: DashboardTourStep): boolean {
  if (step.scrollTarget === false) return false
  if (step.scrollTarget === true) return true
  if (!step.target || step.placement === 'center') return false
  return (
    step.target.startsWith('tour-editor-panel-') ||
    step.target.startsWith('tour-card-template') ||
    step.target.startsWith('tour-card-')
  )
}

function getScrollableAncestors(el: HTMLElement): HTMLElement[] {
  const scrollables: HTMLElement[] = []
  let node: HTMLElement | null = el.parentElement

  while (node) {
    const style = window.getComputedStyle(node)
    if (/(auto|scroll|overlay)/.test(style.overflowY) && node.scrollHeight > node.clientHeight + 1) {
      scrollables.push(node)
    }
    node = node.parentElement
  }

  const main = document.getElementById('main-scroll')
  if (main && main.scrollHeight > main.clientHeight + 1 && !scrollables.includes(main)) {
    scrollables.push(main)
  }

  return scrollables
}

let tourProgrammaticScroll = false

export function runWithTourProgrammaticScroll(fn: () => void) {
  tourProgrammaticScroll = true
  try {
    fn()
  } finally {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        tourProgrammaticScroll = false
      })
    })
  }
}

const TOUR_SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])

function isTourUiEventTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest('[data-vbiz-tour-ui]'))
}

/** Blocks manual scroll during the tour; programmatic scroll still works. */
export function attachTourScrollLock(): () => void {
  const prevent = (e: Event) => {
    if (tourProgrammaticScroll) return
    if (isTourUiEventTarget(e.target)) return

    if (e.type === 'keydown') {
      const ke = e as KeyboardEvent
      if (!TOUR_SCROLL_KEYS.has(ke.key)) return
      if (ke.ctrlKey || ke.metaKey || ke.altKey) return
      const target = ke.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return
      }
    }

    e.preventDefault()
  }

  const opts: AddEventListenerOptions = { capture: true, passive: false }
  document.addEventListener('wheel', prevent, opts)
  document.addEventListener('touchmove', prevent, opts)
  document.addEventListener('keydown', prevent, opts)

  return () => {
    document.removeEventListener('wheel', prevent, opts)
    document.removeEventListener('touchmove', prevent, opts)
    document.removeEventListener('keydown', prevent, opts)
  }
}

export function scrollTourTargetIntoView(targetId: string): boolean {
  const el = findTourTargetElement(targetId)
  if (!el) return false

  let scrolled = false
  runWithTourProgrammaticScroll(() => {
    scrolled = scrollTourTargetIntoViewInner(el)
  })
  return scrolled
}

function scrollTourTargetIntoViewInner(el: HTMLElement): boolean {
  const viewportPad =
    window.innerWidth < 640 ? 72 : window.innerWidth < 1024 ? 96 : window.innerWidth < 1280 ? 112 : 128
  const tooltipPad = window.innerWidth < 640 ? 200 : 240

  for (let pass = 0; pass < 3; pass += 1) {
    const scrollables = getScrollableAncestors(el)

    for (let i = scrollables.length - 1; i >= 0; i -= 1) {
      const container = scrollables[i]
      const containerRect = container.getBoundingClientRect()
      const elRect = el.getBoundingClientRect()
      const idealTop = containerRect.top + viewportPad
      const delta = elRect.top - idealTop

      if (Math.abs(delta) > 4) {
        container.scrollBy({ top: delta, behavior: 'instant' as ScrollBehavior })
      }
    }

    const rect = el.getBoundingClientRect()
    if (rect.top >= viewportPad && rect.bottom <= window.innerHeight - tooltipPad) {
      break
    }
  }

  const rect = el.getBoundingClientRect()
  if (rect.top < viewportPad || rect.bottom > window.innerHeight - tooltipPad) {
    window.scrollTo({
      top: window.scrollY + rect.top - viewportPad,
      behavior: 'instant' as ScrollBehavior,
    })
  }

  return true
}

/** Reserved viewport height for the tour tooltip (step card). */
export function getTourTooltipViewportReserve(): number {
  return 240
}
