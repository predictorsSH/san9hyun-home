import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
            Data Is Apple
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              홈
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              소개
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

