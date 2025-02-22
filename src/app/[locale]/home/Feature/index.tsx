import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

const Feature = () => {
  const t = useTranslations('HomePage')

  const featureList = [
    {
      title: t('featureSection.features.advancedFilteringOptions'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
    {
      title: t('featureSection.features.multiLanguageSupport'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
    {
      title: t('featureSection.features.naturalLanguageProcessing'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
    {
      title: t('featureSection.features.realTimeResults'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
    {
      title: t('featureSection.features.semanticUnderstanding'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
    {
      title: t('featureSection.features.voiceSearchCapability'),
      description: t('featureSection.featureDescriptions'),
      icon: (
        <ArrowRight
          className="text-blue-500 mr-4 mt-1 flex-shrink-0"
          size={24}
        />
      ),
    },
  ]

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-blue-300">
        {t('featureSection.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureList.map((feature) => (
          <div
            key={feature.title}
            className={`p-6 rounded-lg flex items-start bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 border border-gray-200 dark:border-gray-700`}
          >
            {feature.icon}
            <div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-blue-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Feature
