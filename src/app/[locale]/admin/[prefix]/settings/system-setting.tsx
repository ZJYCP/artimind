import prisma from '@/lib/prisma'
import SettingForm from '@/components/admin/setting/system-setting-form'

export default async function SystemSetting() {
  const systemSetting = await prisma.systemSetting.findFirst()

  return <SettingForm systemSetting={systemSetting}></SettingForm>
}
