import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import axios from 'axios';
import FormData from 'form-data'
import { client, getInfo } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  try {
    const { user } = getInfo(request)
    const { url } = await request.json()
    const filename = url.split('/').pop() || '';
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    if (response.status !== 200) {
      return NextResponse.json({ error: 'Failed to fetch the file' });
    }
    const buffer = Buffer.from(response.data);
    const formData = new FormData() as any;
    formData.append('file', buffer, { filename });
    formData.append('user', user)
    const { data } = await client.fileUpload(formData)
    // 返回缺少 url 字段
    return NextResponse.json(data)
  }
  catch (e: any) {
    return NextResponse.json(e.message)
  }
}
