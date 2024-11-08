'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SystemSetting } from '@/dto/SystemSetting'

interface SettingFormProps {
  systemSetting: SystemSetting
}

const formSchema = z.object({
  adminPrefix: z.string().min(2, {
    message: '长度至少为2',
  }),
})

export default function SettingForm(props: SettingFormProps) {
  const { systemSetting } = props
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...systemSetting,
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.info(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name={'adminPrefix'}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admin Path</FormLabel>
              <FormControl>
                <Input {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <Button type={'submit'}>Submit</Button>
      </form>
    </Form>
  )
}
