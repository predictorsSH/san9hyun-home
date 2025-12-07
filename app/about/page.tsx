export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        소개
      </h1>
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300">
          안녕하세요! 이 블로그의 주인입니다.
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          여기에 자신에 대한 소개를 작성해보세요.
        </p>
      </div>
    </div>
  )
}

