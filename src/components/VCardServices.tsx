'use client'

import { ServicesEditorPanel } from '@/components/vcard/ServicesEditorPanel'
import { useVCard } from '@/lib/VCardContext'
import { getDisplaySettingsFromVCard, patchDisplayField } from '@/lib/vcardDisplaySettings'

const SERVICES_NAV_FIELD = 'Services'

export function TabServices() {
  const { vCardData, updateData } = useVCard()
  const display = getDisplaySettingsFromVCard(vCardData)
  const sectionVisible = display.fields[SERVICES_NAV_FIELD]?.visible !== false

  const toggleSectionVisibility = () => {
    updateData('displaySettings', patchDisplayField(display, SERVICES_NAV_FIELD, { visible: !sectionVisible }))
  }

  return (
    <div className="animate-in fade-in mx-auto flex h-full w-full max-w-7xl flex-col pb-12 duration-500">
      <ServicesEditorPanel
        services={vCardData.services}
        onServicesChange={(next) => updateData('services', next)}
        sectionVisible={sectionVisible}
        onToggleSectionVisibility={toggleSectionVisibility}
        accent="indigo"
      />
    </div>
  )
}
