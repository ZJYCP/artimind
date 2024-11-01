import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const res = await prisma.searchRecord.findUnique({
    where: {
      searchId: id,
    },
  })
  res.messages = JSON.parse(res.messages)
  return NextResponse.json(res)
}
