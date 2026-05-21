'use client'

import { LiveAgentPanelV1 } from '@/profile-app/components/live-agent/LiveAgentPanelV1'
import { LiveAgentPanelV2 } from '@/profile-app/components/live-agent/LiveAgentPanelV2'
import { useLiveAgent, type UseLiveAgentOptions } from '@/profile-app/components/live-agent/useLiveAgent'
import { DEFAULT_LIVE_AGENT_CARD, type LiveAgentCardData } from '@/profile-app/lib/liveAgentPrompt'

export type LiveAgentVariant = 'v1' | 'v2'

export type LiveAgentProps = UseLiveAgentOptions & {
  /** v1 = gold concierge UI; v2 = zinc link-in-bio UI */
  variant?: LiveAgentVariant
  /** Accent for v1 gold controls (from card theme). */
  accentColor?: string
}

export function LiveAgent({
  variant = 'v2',
  accentColor,
  cardData = DEFAULT_LIVE_AGENT_CARD,
  readyToConnect = false,
}: LiveAgentProps) {
  const controller = useLiveAgent({ cardData, readyToConnect })

  if (variant === 'v1') {
    return <LiveAgentPanelV1 {...controller} accentColor={accentColor} />
  }

  return <LiveAgentPanelV2 {...controller} />
}

export type { LiveAgentCardData }
