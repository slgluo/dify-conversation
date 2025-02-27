import { type NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { client, getInfo, setSession } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  const { sessionId, user } = getInfo(request)
  try {
    const { data } = await client.getInfo(user)
    // 接口未返回 建议从配置文件或者环境变量获取
    data.app_id = 'app_id'
    data.site = {
      "title": "应用名称",
      "chat_color_theme": null,
      "chat_color_theme_inverted": false,
      "icon_type": "image",
      "icon": "48159ee8",
      "icon_background": "#E4FBCC",
      "icon_url": "/files/aaa.png",
      "description": "-marsTest",
      "copyright": null,
      "privacy_policy": null,
      "custom_disclaimer": "",
      "default_language": "zh-Hans",
      "prompt_public": false,
      "show_workflow_steps": true,
      "use_icon_as_answer_icon": false
    }
    return NextResponse.json(data as object, {
      headers: setSession(sessionId),
    })
  }
  catch (error) {
    return NextResponse.json([])
  }
}
