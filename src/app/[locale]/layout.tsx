import Header from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Inter } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.scss'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import SignInPanel from '@/components/layout/SignInPanel'
import { SessionProvider } from 'next-auth/react'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Artimind',
  description:
    'Artimind - The AI-powered tool for generating and analyzing content',
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }
  const messages = await getMessages()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'h-screen flex flex-col')}>
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <SessionProvider>
              <Header></Header>
              {children}
              <SignInPanel></SignInPanel>
            </SessionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
