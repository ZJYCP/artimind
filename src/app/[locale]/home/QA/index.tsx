'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const QACom = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const toggleQuestion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const questionsAndAnswers = [
    {
      question: 'How does AI improve search results?',
      answer:
        'AI improves search results by analyzing user intent, understanding context, and ranking results based on relevance. It also uses machine learning to continuously refine and personalize results.',
    },
    {
      question: 'Is my search data private and secure?',
      answer:
        'Yes, we prioritize your privacy and security. Your search data is encrypted and handled according to strict privacy policies to ensure it remains confidential.',
    },
    {
      question: 'Can I use this for business purposes?',
      answer:
        'Absolutely! Our AI search platform is designed to support business needs, including customer service, data analysis, and decision-making enhancements.',
    },
  ]

  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto p-8 rounded-lg bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-blue-300">
          Frequently Asked Questions
        </h2>
        {questionsAndAnswers.map(({ question, answer }, index) => (
          <div key={index} className="mb-4">
            <button
              className="flex justify-between items-center w-full text-left p-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300"
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                {question}
              </span>
              {expandedIndex === index ? (
                <ChevronUp
                  size={24}
                  className="text-gray-500 dark:text-gray-400"
                />
              ) : (
                <ChevronDown
                  size={24}
                  className="text-gray-500 dark:text-gray-400"
                />
              )}
            </button>
            {expandedIndex === index && (
              <div className="mt-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
                {answer}
              </div>
            )}
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
