export type VCardUploadSection =
  | 'personal-info'
  | 'social-games'
  | 'home-media'
  | 'extra-fields'
  | 'education'
  | 'experience'
  | 'skill'
  | 'services'
  | 'portfolio'
  | 'general'
  | 'link-shortener'

export type VCardAutoFillResult = Record<string, string>

const DEMO_BY_SECTION: Record<VCardUploadSection, VCardAutoFillResult> = {
  'personal-info': {
    slug: 'alex-morgan',
    'personal.fullName': 'Alex Morgan',
    'personal.email': 'alex.morgan@example.com',
    'personal.dob': '1992-06-15',
    'personal.gender': 'Male',
    'personal.relationship': 'Single',
    'personal.profession': 'Developer',
    'personal.designation': 'Senior Product Engineer',
    'personal.company': 'Vibz Technologies',
    'personal.phone': '+1 555 010 2847',
    'personal.whatsapp': '+1 555 010 2847',
    'personal.address': '742 Evergreen Terrace, San Francisco, CA 94102',
    'personal.about':
      'Product-focused engineer with 8+ years building delightful digital experiences. Passionate about design systems, AI-assisted workflows, and helping teams ship faster.',
    'personal.explainerVideoUrl': 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    zip: '94102',
    state: 'California',
    city: 'San Francisco',
  },
  'social-games': {
    websiteUrl: 'https://alexmorgan.dev',
    instagram: 'alexmorgan',
    facebook: 'alexmorgan.dev',
    twitter: 'alexmorgan',
    tiktok: 'alexmorgan',
    youtube: 'alexmorgandev',
    truth: 'alexmorgan',
    rumble: 'alexmorgan',
    linkedin: 'alexmorgan',
    gameTitle: 'Chess Rush',
    gameUrl: 'https://chess.com/member/alexmorgan',
  },
  'home-media': {
    introYoutubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
    introStart: '5',
    introEnd: '45',
    musicYoutubeUrl: 'https://www.youtube.com/watch?v=RgKAFK5djSk',
    musicStart: '0',
    musicEnd: '120',
  },
  'extra-fields': {
    'field.0.name': 'Portfolio',
    'field.0.value': 'https://alexmorgan.dev/work',
    'field.0.icon': 'Link',
  },
  education: {
    institute: 'Stanford University',
    degree: 'B.S. Computer Science',
    fromDate: '2010-09-01',
    toDate: '2014-06-01',
  },
  experience: {
    company: 'Vibz Technologies',
    jobTitle: 'Senior Product Engineer',
    description:
      'Led cross-functional squads shipping vCard builder features, design system adoption, and AI-assisted profile imports.',
    fromDate: '2019-03-01',
    toDate: '2026-01-01',
  },
  skill: {
    type: 'Technical Skills',
    skills: 'React,TypeScript,Node.js,Next.js,UI Design,Figma',
  },
  services: {
    type: 'Consulting',
    title: 'Product Strategy Workshop',
    description: 'A focused 2-hour session to align your vCard, offer, and conversion funnel.',
    url: 'https://alexmorgan.dev/services/strategy',
    featuredImage: 'strategy-workshop.jpg',
  },
  portfolio: {
    type: 'Web App',
    title: 'Vibz Profile Builder',
    description: 'End-to-end digital business card platform with live preview and AI import.',
    youtubeUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
  },
  general: {
    category: 'Product Updates',
    title: 'Launched AI document import',
    description: 'Upload a resume or business card image to auto-fill your vCard fields in seconds.',
    customUrl: 'https://alexmorgan.dev/blog/ai-import',
    date: '2026-05-20',
  },
  'link-shortener': {
    urls: 'https://alexmorgan.dev\nhttps://alexmorgan.dev/portfolio\nhttps://linkedin.com/in/alexmorgan',
  },
}

export function getDemoAutoFillForSection(section: VCardUploadSection): VCardAutoFillResult {
  return { ...DEMO_BY_SECTION[section] }
}

export const VCARD_UPLOAD_SECTION_LABELS: Record<VCardUploadSection, { title: string; description: string }> = {
  'personal-info': {
    title: 'Import from document or photo',
    description:
      'Upload a resume, business card, or ID photo. We will read it and fill your personal details below (demo preview).',
  },
  'social-games': {
    title: 'Import social & link details',
    description: 'Upload a media kit or contact sheet to populate handles and custom links (demo preview).',
  },
  'home-media': {
    title: 'Import media settings',
    description: 'Upload a brief or storyboard PDF to suggest YouTube links and trim points (demo preview).',
  },
  'extra-fields': {
    title: 'Import custom fields',
    description: 'Upload a document listing extra profile fields to add them automatically (demo preview).',
  },
  education: {
    title: 'Import education history',
    description: 'Upload a transcript or CV to fill institute, degree, and dates (demo preview).',
  },
  experience: {
    title: 'Import work experience',
    description: 'Upload a resume to populate company, role, and timeline fields (demo preview).',
  },
  skill: {
    title: 'Import skills',
    description: 'Upload a resume or skills matrix to add categories and skill tags (demo preview).',
  },
  services: {
    title: 'Import services',
    description: 'Upload a rate card or brochure to draft your first service offering (demo preview).',
  },
  portfolio: {
    title: 'Import portfolio item',
    description: 'Upload a project brief or case study to fill title and description (demo preview).',
  },
  general: {
    title: 'Import blog / update post',
    description: 'Upload an article draft or PDF to fill post title, body, and URL (demo preview).',
  },
  'link-shortener': {
    title: 'Import URLs to shorten',
    description: 'Upload a text file or document containing links to paste them into the shortener (demo preview).',
  },
}
