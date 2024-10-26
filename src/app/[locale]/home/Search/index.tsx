'use client'
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from '../../../../i18n/routing'

const SearchCom = () => {
  const t = useTranslations('HomePage')
  const router = useRouter()

  return (
    <section className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6 text-blue-300">{t('title')}</h1>
      <p className="text-xl mb-8 text-blue-200">{t('subTitle')}</p>
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          className={`w-full py-4 px-6 rounded-full text-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          className="absolute right-2 top-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300"
          onClick={() => {
            router.push('/search')
          }}
        >
          <Search size={24} />
        </button>
      </div>
    </section>
  )
}

export default SearchCom
