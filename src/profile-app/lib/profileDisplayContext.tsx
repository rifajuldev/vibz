'use client'

import type { ResolvedProfileDesign } from '@/lib/resolvedProfileDesign'
import {
  getFieldConfig,
  getHomeMediaUrls,
  getPageColors,
  getPersonalValueForField,
  isFieldVisible,
  resolveDisplaySettings,
} from '@/lib/vcardDisplaySettings'
import { createDefaultVCardSocial, getSocialHrefForDisplayLabel } from '@/lib/vcardSocial'
import type {
  VCardEducationEntry,
  VCardExperienceEntry,
  VCardExtraField,
  VCardGeneralPost,
  VCardPersonal,
  VCardServiceEntry,
  VCardSocial,
} from '@/types/vcard'
import type { VCardDisplaySettings } from '@/types/vcardDisplaySettings'
import React, { createContext, useContext, useMemo } from 'react'

export type ProfileDisplayContextValue = {
  settings: VCardDisplaySettings
  personal: VCardPersonal
  social: VCardSocial
  extraFields: VCardExtraField[]
  education: VCardEducationEntry[]
  experience: VCardExperienceEntry[]
  services: VCardServiceEntry[]
  generalPosts: VCardGeneralPost[]
  design: ResolvedProfileDesign | null
  isVisible: (key: string) => boolean
  field: (key: string) => ReturnType<typeof getFieldConfig>
  personalValue: (fieldKey: string) => string
  socialHref: (displayLabel: string) => string
  pageColors: ReturnType<typeof getPageColors>
  homeMedia: ReturnType<typeof getHomeMediaUrls>
}

const FALLBACK_PERSONAL: VCardPersonal = {
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
  website: '',
  about: '',
}

const defaultValue: ProfileDisplayContextValue = {
  settings: resolveDisplaySettings(),
  personal: FALLBACK_PERSONAL,
  social: createDefaultVCardSocial(),
  extraFields: [],
  education: [],
  experience: [],
  services: [],
  generalPosts: [],
  design: null,
  isVisible: () => true,
  field: (key) => getFieldConfig(resolveDisplaySettings(), key),
  personalValue: () => '',
  socialHref: () => '',
  pageColors: getPageColors(resolveDisplaySettings()),
  homeMedia: getHomeMediaUrls(resolveDisplaySettings(), FALLBACK_PERSONAL),
}

const ProfileDisplayContext = createContext<ProfileDisplayContextValue>(defaultValue)

export function ProfileDisplayProvider({
  children,
  personal,
  displaySettings,
  social,
  extraFields,
  education,
  experience,
  services,
  generalPosts,
  design,
}: {
  children: React.ReactNode
  personal?: VCardPersonal
  displaySettings?: VCardDisplaySettings | null
  social?: VCardSocial | null
  extraFields?: VCardExtraField[]
  education?: VCardEducationEntry[]
  experience?: VCardExperienceEntry[]
  services?: VCardServiceEntry[]
  generalPosts?: VCardGeneralPost[]
  design?: ResolvedProfileDesign | null
}) {
  const value = useMemo<ProfileDisplayContextValue>(() => {
    const settings = resolveDisplaySettings(displaySettings)
    const p = personal ?? FALLBACK_PERSONAL
    const soc = social ?? createDefaultVCardSocial()
    const extras = extraFields ?? []
    const edu = education ?? []
    const exp = experience ?? []
    const svc = services ?? []
    const posts = generalPosts ?? []
    return {
      settings,
      personal: p,
      social: soc,
      extraFields: extras,
      education: edu,
      experience: exp,
      services: svc,
      generalPosts: posts,
      design: design ?? null,
      isVisible: (key: string) => isFieldVisible(settings, key),
      field: (key: string) => getFieldConfig(settings, key),
      personalValue: (fieldKey: string) => getPersonalValueForField(p, fieldKey),
      socialHref: (label: string) => getSocialHrefForDisplayLabel(label, soc, p.website),
      pageColors: getPageColors(settings),
      homeMedia: getHomeMediaUrls(settings, p),
    }
  }, [personal, displaySettings, social, extraFields, education, experience, services, generalPosts, design])

  return <ProfileDisplayContext.Provider value={value}>{children}</ProfileDisplayContext.Provider>
}

export function useProfileDisplay() {
  return useContext(ProfileDisplayContext)
}
