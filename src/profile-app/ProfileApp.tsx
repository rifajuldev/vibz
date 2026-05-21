'use client'

import { ProfileDisplayProvider } from '@/profile-app/lib/profileDisplayContext'
import type { VBizProfileAppProps } from '@/profile-app/profilePublicProps'
import { VBizProfileApp } from '@/profile-app/VBizProfileApp'
import { VBizProfileAppV1 } from '@/profile-app/VBizProfileAppV1'

/** Renders v1 or v2 profile shell from resolved design settings. */
export function ProfileApp(props: VBizProfileAppProps) {
  const template = props.design?.profileTemplate ?? 'v2'
  const shell = template === 'v1' ? <VBizProfileAppV1 {...props} /> : <VBizProfileApp {...props} />

  return (
    <ProfileDisplayProvider
      personal={props.personal}
      displaySettings={props.displaySettings}
      social={props.social}
      extraFields={props.extraFields}
      education={props.education}
      experience={props.experience}
      services={props.services}
      generalPosts={props.generalPosts}
      design={props.design ?? null}
    >
      {shell}
    </ProfileDisplayProvider>
  )
}

export type { VBizProfileAppProps } from '@/profile-app/profilePublicProps'
