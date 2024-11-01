import { createOpenAI, OpenAIProviderSettings } from '@ai-sdk/openai'
import prisma from '@/lib/prisma'
import { ApiSettingDTO } from '@/dto/ApiSetting'

declare global {
  var apiSetting: ApiSettingDTO[] | undefined
}
export async function fetchApiSetting() {
  if (!global.apiSetting) {
    global.apiSetting = await prisma.apiSetting.findMany()
  }
  return global.apiSetting
}

export async function createLanguageModel(params: OpenAIProviderSettings) {
  const settings = await fetchApiSetting()
  if (!settings || settings.length === 0) {
    throw new Error('API settings are not available.')
  }
  return createOpenAI({
    ...params,
    apiKey: settings[0].key,
    baseURL: `${settings[0].register}/v1`,
  })
}

export async function getOpenAI() {
  const openai = await createLanguageModel({})
  return openai
}