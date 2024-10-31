import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // 打印post body信息
  const body = await req.json()
  console.info(body)
  return NextResponse.json(
    {
      message: `来自服务端的GPT回复__${body.message}`,
    },
    { status: 200 }
  )
}
