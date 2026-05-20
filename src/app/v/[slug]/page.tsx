import VCardPublicProfilePreview from '@/views/VCardPublicProfilePreview'

export default async function PublicVCardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <VCardPublicProfilePreview slug={slug} />
}
