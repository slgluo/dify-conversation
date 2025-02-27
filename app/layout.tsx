
import type { Viewport } from 'next'
import { getLocaleOnServer } from '@/i18n/server'
import { ToastProvider } from '@/app/components/base/toast'
import type { Metadata } from 'next'

import './styles/globals.css'
import './styles/markdown.scss'

export const metadata: Metadata = {
  title: 'Dify',
  icons: 'data:,'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
}

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()

  return (
    <html lang={locale ?? 'en'} className="h-full" data-theme="light">
      <head>
        <meta name="theme-color" content="#FFFFFF" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className="h-full select-auto color-scheme">
        <div className="min-w-[300px] h-full pb-[env(safe-area-inset-bottom)]">
          <ToastProvider>{children}</ToastProvider>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
