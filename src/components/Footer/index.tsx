const FooterCom = () => {
  return (
    <footer className="mt-16 py-8 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-blue-300">
              AI Search
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering your search with artificial intelligence.
            </p>
          </div>
          {['Product', 'Company', 'Resources', 'Legal'].map((category) => (
            <div key={category} className="w-full md:w-1/6 mb-8 md:mb-0">
              <h4 className="font-semibold mb-4 text-gray-800 dark:text-gray-300">
                {category}
              </h4>
              <ul className="space-y-2">
                {['Link 1', 'Link 2', 'Link 3'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 AI Search. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterCom
