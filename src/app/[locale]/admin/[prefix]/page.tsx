import { redirect } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'

interface AdminPageProps {
  params: {
    prefix: string
  }
}

export default async function AdminPage({ params }: AdminPageProps) {
  const prefix = params.prefix
  const systemSetting = await prisma.systemSetting.findFirst()

  if (prefix === systemSetting.adminPrefix) {
    redirect({
      href: `/admin/${prefix}/dashboard`,
      locale: 'en',
    })
  } else {
    notFound()
  }
}
