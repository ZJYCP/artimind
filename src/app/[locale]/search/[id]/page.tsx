import MainSearch from '@/app/[locale]/search/[id]/MainSearch'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { Search } from '@/lib/bizTypes'

interface SearchPageProps {
  params: {
    id: string
  }
}

async function SearchPage(props: SearchPageProps) {
  const session = await auth()
  const { id } = props.params
  const res = await prisma.search.findUnique({
    where: {
      id: id,
    },
  })
  return (
    <MainSearch
      searchId={id}
      user={session.user}
      initSearchInfo={res as unknown as Search}
    ></MainSearch>
  )
}

export default SearchPage
