/**
 * Gemini Live runs in the browser; the key must be available as NEXT_PUBLIC_*.
 * next.config maps GEMINI_API_KEY → NEXT_PUBLIC_GEMINI_API_KEY for local .env convenience.
 */
export function getGeminiApiKey(): string | undefined {
  const key = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || process.env.GEMINI_API_KEY?.trim()
  return key || undefined
}

export function isGeminiConfigured(): boolean {
  return Boolean(getGeminiApiKey())
}
