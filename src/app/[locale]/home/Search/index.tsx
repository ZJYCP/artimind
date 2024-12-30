'use client'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { useState } from 'react'
import { Search as SearchVO } from '@/lib/bizTypes'
import { useSession } from 'next-auth/react'
import { useSignInModal } from '@/hooks/useSignInModal'
import { useSearchStore } from '@/store/SearchStore'

const SearchCom = () => {
  const t = useTranslations('HomePage')
  const [question, setQuestion] = useState('')
  const router = useRouter()
  const { data: session } = useSession()
  const signInModal = useSignInModal()
  const addSearch = useSearchStore((state) => state.addSearch)

  const handleSubmit = async () => {
    const userId = session?.user?.id
    if (!userId) {
      signInModal.onOpen()
      return
    }
    const questionId = crypto.randomUUID()
    const newSearch = new SearchVO(questionId, question, userId)
    addSearch(newSearch)
    // 跳转并携带id参数
    router.push({
      pathname: `/search/${questionId}`,
    })
  }

  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6 text-blue-300">{t('title')}</h1>
      <p className="text-xl mb-8 text-blue-200">{t('subTitle')}</p>
      <form className="max-w-2xl mx-auto relative" action={handleSubmit}>
        <input
          type="text"
          value={question}
          onInput={(e) => setQuestion(e.currentTarget.value)}
          placeholder={t('searchPlaceholder')}
          className={`w-full py-4 px-6 rounded-full text-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
          type={'submit'}
        >
          <Search size={24} />
        </button>
      </form>
    </section>
  )
}

export default SearchCom
