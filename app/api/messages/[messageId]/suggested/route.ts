import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function GET(request: NextRequest, params: { messageId: string }) {
  const { messageId } = await params
  const { user } = getInfo(request)
  const { data }: any = await client.getSuggested(messageId, user,)
  return NextResponse.json(data)
}
