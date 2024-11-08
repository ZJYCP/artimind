import prisma from '@/lib/prisma'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import SystemSetting from './system-setting'
import ApiSetting from './api-setting'

export default async function SettingsPage() {
  const tabsMeta = [
    {
      label: '系统设置',
      value: 'system',
      com: <SystemSetting />,
    },
    {
      label: '模型设置',
      value: 'model',
      com: <ApiSetting />,
    },
  ]
  return (
    <Tabs defaultValue={'system'}>
      <TabsList>
        {tabsMeta.map((tab) => {
          return (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          )
        })}
      </TabsList>
      {tabsMeta.map((tab) => {
        return (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.com}
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
