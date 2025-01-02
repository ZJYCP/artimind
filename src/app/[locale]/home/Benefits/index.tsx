import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FC, PropsWithChildren } from 'react'

interface ComProps {}
const Benefits: FC<PropsWithChildren<ComProps>> = (props) => {
  const t = useTranslations('HomePage')

  const benefitsMap = [
    {
      title: t('benefitsTitle_1'),
      description: t('benefitsDesc_1'),
      icon: <Check className="text-green-400 mb-4" size={32} />,
    },
    {
      title: t('benefitsTitle_2'),
      description: t('benefitsDesc_2'),
      icon: <Check className="text-green-400 mb-4" size={32} />,
    },
    {
      title: t('benefitsTitle_3'),
      description: t('benefitsDesc_3'),
      icon: <Check className="text-green-400 mb-4" size={32} />,
    },
  ]
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-blue-300">
        {t('benefitsTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefitsMap.map((benefit) => (
          <div
            key={benefit.title}
            className={`p-6 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:transform hover:scale-105 transition duration-300`}
          >
            {benefit.icon}
            <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-blue-300">
              {benefit.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Benefits
