'use client'

import { VBizProfileApp } from '@/profile-app/VBizProfileApp'
import { VBizProfileAppV1 } from '@/profile-app/VBizProfileAppV1'
import type { VBizProfileAppProps } from '@/profile-app/profilePublicProps'

/** Renders v1 or v2 profile shell from resolved design settings. */
export function ProfileApp(props: VBizProfileAppProps) {
  const template = props.design?.profileTemplate ?? 'v2'
  if (template === 'v1') {
    return <VBizProfileAppV1 {...props} />
  }
  return <VBizProfileApp {...props} />
}

export type { VBizProfileAppProps } from '@/profile-app/profilePublicProps'
