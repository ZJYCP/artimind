import { ChevronDown } from 'lucide-react'

const QACom = () => {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto p-8 rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-blue-300">
          Frequently Asked Questions
        </h2>
        {[
          'How does AI improve search results?',
          'Is my search data private and secure?',
          'Can I use this for business purposes?',
        ].map((question) => (
          <div key={question} className="mb-4">
            <button className="flex justify-between items-center w-full text-left p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300">
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {question}
              </span>
              <ChevronDown
                size={24}
                className="text-gray-500 dark:text-gray-400"
              />
            </button>
          </div>
        ))}
        <div className="text-center mt-8">
          <button className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-500 transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

export default QACom
