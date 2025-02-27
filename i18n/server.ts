import 'server-only'

import { cookies, headers } from 'next/headers'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import type { Locale } from '.'
import { i18n } from '.'

export const getLocaleOnServer = async (): Promise<Locale> => {
  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales

  // Get cookies asynchronously
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')
  let languages = localeCookie?.value ? [localeCookie.value] : []

  if (languages.length === 0) {
    // Get headers asynchronously
    const headerList = await headers()
    const negotiatorHeaders: Record<string, string> = {}

    // Convert headers to plain object
    headerList.forEach((value, key) => {
      negotiatorHeaders[key] = value
    })

    // Get languages from negotiator
    const negotiator = new Negotiator({ headers: negotiatorHeaders })
    languages = negotiator.languages()
  }

  // Match the best locale
  return match(languages, locales, i18n.defaultLocale) as Locale
}