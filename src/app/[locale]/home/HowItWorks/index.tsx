const HowItWorks = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-blue-300">
        How It Works
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
        {['Enter Your Query', 'AI Processes', 'Get Results'].map(
          (step, index) => (
            <div key={step} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mb-4 bg-blue-500 text-white dark:bg-blue-600">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-blue-300">
                {step}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Our advanced AI analyzes and delivers precise results.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export default HowItWorks
