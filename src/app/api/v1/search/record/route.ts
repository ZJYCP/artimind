import { type NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import logger from '@/lib/logger'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const id = searchParams.get('id')
  const res = await prisma.searchRecord.findUnique({
    where: {
      searchId: id,
    },
  })
  res.messages = res.messages ? JSON.parse(res.messages) : null
  return NextResponse.json(res)
}

export async function PUT(req: NextRequest) {}
