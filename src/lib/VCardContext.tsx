'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { useCardScopeId, useCardScopeMode } from '@/lib/card-scope'
import { setFontFamily, setVcardBranding } from '@/redux/features/designSettings/designSettings.slice'
import { addVCard, replaceVCardData, selectVCardById } from '@/redux/features/vcards/vcards.slice'
import type { RootState } from '@/redux/store'
import type { VCardData, VCardRecord } from '@/types/vcard'
import { createDefaultVCardData } from '@/types/vcard'
import { useRouter } from 'next/navigation'
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

interface VCardContextType {
  cardId: string | null
  isCreateMode: boolean
  vCardData: VCardData
  updateData: (path: string, value: unknown) => void
  saveVCard: () => Promise<void>
  loading: boolean
}

const VCardContext = createContext<VCardContextType | undefined>(undefined)

function setByPath(obj: Record<string, unknown>, path: string, value: unknown): Record<string, unknown> {
  const keys = path.split('.')
  const clone = JSON.parse(JSON.stringify(obj)) as Record<string, unknown>
  let current: Record<string, unknown> = clone
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i]
    if (typeof current[k] !== 'object' || current[k] === null) {
      current[k] = {}
    }
    current = current[k] as Record<string, unknown>
  }
  current[keys[keys.length - 1]] = value
  return clone
}

function toVCardData(record: VCardRecord): VCardData {
  const rest = { ...record } as Record<string, unknown>
  delete rest.id
  delete rest.createdAt
  delete rest.updatedAt
  delete rest.views
  delete rest.saves
  delete rest.avatarImageUrl
  delete rest.isActive
  return rest as VCardData
}

function newCardId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `vc_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

function buildCreateDraft(design: RootState['designSettings']): VCardData {
  return createDefaultVCardData({
    theme: {
      primaryColor: design.vcardPrimaryColor,
      accentColor: design.vcardAccentColor,
      darkMode: true,
      fontFamily: design.fontFamily,
    },
  })
}

export function VCardProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const cardId = useCardScopeId()
  const mode = useCardScopeMode()
  const isCreateMode = mode === 'create'
  const design = useAppSelector((s) => s.designSettings)
  const record = useAppSelector((s: RootState) => selectVCardById(s, cardId))

  const syncedDesignTheme = {
    primaryColor: design.vcardPrimaryColor,
    accentColor: design.vcardAccentColor,
    fontFamily: design.fontFamily,
  }

  const [createDraft, setCreateDraft] = useState<VCardData>(() => buildCreateDraft(design))
  const [appliedDesignTheme, setAppliedDesignTheme] = useState(syncedDesignTheme)

  if (
    isCreateMode &&
    (appliedDesignTheme.primaryColor !== syncedDesignTheme.primaryColor ||
      appliedDesignTheme.accentColor !== syncedDesignTheme.accentColor ||
      appliedDesignTheme.fontFamily !== syncedDesignTheme.fontFamily)
  ) {
    setAppliedDesignTheme(syncedDesignTheme)
    setCreateDraft((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...syncedDesignTheme,
      },
    }))
  }

  useEffect(() => {
    if (isCreateMode || !cardId || !record) return
    const dataOnly = toVCardData(record)
    const theme = dataOnly.theme
    if (
      theme.primaryColor === design.vcardPrimaryColor &&
      theme.accentColor === design.vcardAccentColor &&
      (theme.fontFamily ?? 'inter') === design.fontFamily
    ) {
      return
    }
    dispatch(
      replaceVCardData({
        id: cardId,
        data: {
          ...dataOnly,
          theme: {
            ...theme,
            primaryColor: design.vcardPrimaryColor,
            accentColor: design.vcardAccentColor,
            fontFamily: design.fontFamily,
          },
        },
      })
    )
  }, [isCreateMode, cardId, record, design.vcardPrimaryColor, design.vcardAccentColor, design.fontFamily, dispatch])

  const vCardData: VCardData = useMemo(() => {
    if (isCreateMode) return createDraft
    if (!record) return createDefaultVCardData()
    return toVCardData(record)
  }, [isCreateMode, createDraft, record])

  const updateData = useCallback(
    (path: string, value: unknown) => {
      if (path === 'theme.primaryColor' && typeof value === 'string') {
        dispatch(setVcardBranding({ primary: value }))
      }
      if (path === 'theme.accentColor' && typeof value === 'string') {
        dispatch(setVcardBranding({ accent: value }))
      }
      if (path === 'theme.fontFamily' && typeof value === 'string') {
        dispatch(setFontFamily(value))
      }

      if (isCreateMode) {
        setCreateDraft(
          (prev) => setByPath(prev as unknown as Record<string, unknown>, path, value) as unknown as VCardData
        )
        return
      }
      if (!cardId || !record) return
      const dataOnly = toVCardData(record)
      const next = setByPath(dataOnly as unknown as Record<string, unknown>, path, value) as unknown as VCardData
      dispatch(replaceVCardData({ id: cardId, data: next }))
    },
    [isCreateMode, cardId, dispatch, record]
  )

  const saveVCard = useCallback(async () => {
    if (isCreateMode) {
      const slug = createDraft.slug.trim()
      const name = createDraft.personal.fullName.trim()
      if (!name) {
        throw new Error('Please enter your name before creating the vCard.')
      }
      if (!slug) {
        throw new Error('Please set a public URL slug before creating the vCard.')
      }
      const id = newCardId()
      dispatch(
        addVCard({
          id,
          seed: {
            ...createDraft,
            slug,
          },
        })
      )
      router.push('/vcards')
      return
    }

    if (!cardId || !record) {
      throw new Error('No vCard selected')
    }
    dispatch(replaceVCardData({ id: cardId, data: toVCardData(record) }))
    alert('Profile saved locally. It will sync to the server when the API is connected.')
  }, [isCreateMode, createDraft, cardId, dispatch, record, router])

  const value = useMemo(
    () => ({
      cardId,
      isCreateMode,
      vCardData,
      updateData,
      saveVCard,
      loading: false,
    }),
    [cardId, isCreateMode, vCardData, updateData, saveVCard]
  )

  return <VCardContext.Provider value={value}>{children}</VCardContext.Provider>
}

export function useVCard() {
  const context = useContext(VCardContext)
  if (context === undefined) {
    throw new Error('useVCard must be used within a VCardProvider')
  }
  return context
}
