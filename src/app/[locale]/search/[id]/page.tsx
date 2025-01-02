import MainSearch from '@/app/[locale]/search/[id]/MainSearch'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Search } from '@/lib/bizTypes'
import AskPanel from '@/app/[locale]/search/[id]/askPanel'

interface SearchPageProps {
  params: {
    id: string
  }
}

async function SearchPage(props: SearchPageProps) {
  const session = await auth()
  const { id } = props.params
  // 从数据库找到该条搜索纪录
  const res = await prisma.search.findUnique({
    where: {
      id: id,
    },
  })
  return (
    <section className="flex-1 overflow-y-auto px-16 pb-[160px]">
      <MainSearch
        searchId={id}
        user={session.user}
        initSearchInfo={res as unknown as Search}
      ></MainSearch>
      <AskPanel searchId={id}></AskPanel>
    </section>
  )
}

export default SearchPage
