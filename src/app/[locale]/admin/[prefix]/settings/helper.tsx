'use client'
import { ApiSettingDTO } from '@/dto/ApiSetting'
import { ColumnDef } from '@tanstack/react-table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

/**
 * API 配置表格列
 */
export type ApiSettingVO = ApiSettingDTO
export const ApiSettingTableColumns: ColumnDef<ApiSettingVO>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'key',
    header: 'Key',
  },
  {
    accessorKey: 'register',
    header: 'Register URL',
  },
  {
    id: 'action',
    cell: ({ row }) => {
      const data = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className={'cursor-pointer'}
              // onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              编辑
            </DropdownMenuItem>
            <DropdownMenuItem className={'cursor-pointer'}>
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
