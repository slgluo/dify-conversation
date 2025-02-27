import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const { user } = getInfo(request)
    formData.append('user', user)
    const { data } = await client.aduioToText(formData)
    return NextResponse.json(data)
  }
  catch (e: any) {
    return NextResponse.json(e.message)
  }
}
