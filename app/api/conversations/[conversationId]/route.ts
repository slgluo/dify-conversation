import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo } from '@/app/api/utils/common'

export async function DELETE(request: NextRequest, { params }: {
  params: { conversationId: string }
}) {
  const { conversationId } = await params
  const { user } = await getInfo(request)

  const { data } = await client.deleteConversation(conversationId, user)
  return NextResponse.json(data)
}