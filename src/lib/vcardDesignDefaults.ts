import type { DesignSettingsState, ProfileTemplateId } from '@/redux/features/designSettings/designSettings.slice'
import type { VCardAppearance, VCardData, VCardTheme } from '@/types/vcard'

export function appearanceFromDesignSettings(design: DesignSettingsState): VCardAppearance {
  return {
    profileTemplate: design.profileTemplate ?? 'v2',
    layoutStyle: design.layoutStyle || 'classic',
    buttonStyle: design.buttonStyle || 'solid',
    cornerStyle: design.cornerStyle || 'round',
  }
}

export function themeFromDesignSettings(design: DesignSettingsState): VCardTheme {
  return {
    primaryColor: design.vcardPrimaryColor,
    accentColor: design.vcardAccentColor,
    darkMode: true,
    fontFamily: design.fontFamily || 'inter',
  }
}

/** Snapshot account profile Template + Appearance for a new vCard draft. */
export function designSettingsToVCardDefaults(design: DesignSettingsState): Pick<VCardData, 'theme' | 'appearance'> {
  return {
    theme: themeFromDesignSettings(design),
    appearance: appearanceFromDesignSettings(design),
  }
}

export function resolveVCardAppearance(
  design: DesignSettingsState,
  cardAppearance?: Partial<VCardAppearance> | null
): VCardAppearance {
  const account = appearanceFromDesignSettings(design)
  if (!cardAppearance) return account
  return {
    profileTemplate: (cardAppearance.profileTemplate as ProfileTemplateId) ?? account.profileTemplate,
    layoutStyle: cardAppearance.layoutStyle ?? account.layoutStyle,
    buttonStyle: cardAppearance.buttonStyle ?? account.buttonStyle,
    cornerStyle: cardAppearance.cornerStyle ?? account.cornerStyle,
  }
}
