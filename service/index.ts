import type { IOnCompleted, IOnData, IOnError, IOnFile, IOnMessageEnd, IOnMessageReplace, IOnNodeFinished, IOnNodeStarted, IOnThought, IOnWorkflowFinished, IOnWorkflowStarted } from './base'
import { get, post, ssePost, del, upload } from './base'
import type { FeedbackType } from '@/app/components/chat/type'

export const sendChatMessage = async (
  body: Record<string, any>,
  {
    onData,
    onCompleted,
    onThought,
    onFile,
    onError,
    getAbortController,
    onMessageEnd,
    onMessageReplace,
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
  }: {
    onData: IOnData
    onCompleted: IOnCompleted
    onFile: IOnFile
    onThought: IOnThought
    onMessageEnd: IOnMessageEnd
    onMessageReplace: IOnMessageReplace
    onError: IOnError
    getAbortController?: (abortController: AbortController) => void
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
  },
) => {
  return ssePost('chat-messages', {
    body: {
      ...body,
      response_mode: 'streaming',
    },
  }, { onData, onCompleted, onThought, onFile, onError, getAbortController, onMessageEnd, onMessageReplace, onNodeStarted, onWorkflowStarted, onWorkflowFinished, onNodeFinished })
}

export const fetchConversations = async (limit = 100, last_id = null) => {
  return get('conversations', { params: { limit, last_id } })
}

export const fetchChatList = async (conversationId: string, limit = 20, last_id = null) => {
  return get('messages', {
    params: { conversation_id: conversationId, limit, last_id }
  })
}

// init value. wait for server update
export const fetchAppParams = async () => {
  return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string; body: FeedbackType }) => {
  return post(url, { body })
}

export const generationConversationName = async (id: string) => {
  return post(`conversations/${id}/name`, { body: { auto_generate: true } })
}

export const uploadRemoteFileInfo = (url: string) => {
  return post('/file-upload/remote', { body: { url } })
}
// TODO mars
export const fetchSuggestedQuestions = async (messageId: string) => {
  return get(`/messages/${messageId}/suggested`)
}
export const stopChatMessageResponding = async (taskId: string) => {
  return post(`/chat-messages/${taskId}/stop`,)
}
export const renameConversation = async (conversationId: string, name: string) => {
  return post(`conversations/${conversationId}/name`, { body: { name } })
}
export const delConversation = async (id: string) => {
  return del(`conversations/${id}`)
}
export const fetchAppInfo = async () => { return get('info') }
export const fetchAppMeta = async () => { return get('meta') }

export const audioToText = (formData: any): Promise<{ text: string }> => {
  return upload({
    xhr: new XMLHttpRequest(),
    data: formData,
  }, '/audio-to-text')
}

export const pinConversation = async (conversationId: string) => {
  return get('messages1', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}
export const unpinConversation = async (conversationId: string) => {
  return get('messages3', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}
export const getUrl = async (conversationId: string) => {
  return get('messages5', { params: { conversation_id: conversationId, limit: 20, last_id: '' } })
}
