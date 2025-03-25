export const correctModelProvider = (provider: string) => {
  if (!provider)
    return ''

  if (provider.includes('/'))
    return provider

  if (['google'].includes(provider))
    return 'langgenius/gemini/google'

  return `langgenius/${provider}/${provider}`
}

export const correctToolProvider = (provider: string, toolInCollectionList?: boolean) => {
  if (!provider)
    return ''

  if (toolInCollectionList)
    return provider

  if (provider.includes('/'))
    return provider

  if (['stepfun', 'jina', 'siliconflow', 'gitee_ai'].includes(provider))
    return `langgenius/${provider}_tool/${provider}`

  return `langgenius/${provider}/${provider}`
}

export const canFindTool = (providerId: string, oldToolId?: string) => {
  return providerId === oldToolId
    || providerId === `langgenius/${oldToolId}/${oldToolId}`
    || providerId === `langgenius/${oldToolId}_tool/${oldToolId}`
}
