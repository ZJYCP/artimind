import { ApiSettingVO, ApiSettingTableColumns } from './helper'
import { DataTable } from '@/components/ui/data-table'
import prisma from '@/lib/prisma'

async function getData(): Promise<ApiSettingVO[]> {
  return prisma.apiSetting.findMany()
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={ApiSettingTableColumns} data={data} />
    </div>
  )
}
