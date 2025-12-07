import { getPostsByCategory } from '@/lib/posts'
import { getAllCategories } from '@/lib/categories'
import CategorySection from '@/components/CategorySection'

const CATEGORIES = getAllCategories()

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          안녕하세요! 👋
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          제 블로그에 오신 것을 환영합니다.
        </p>
      </div>

      <div>
        {(() => {
          // 포스트가 있는 카테고리만 필터링
          const validCategories = CATEGORIES.filter(cat => getPostsByCategory(cat).length > 0)
          
          return validCategories.map((category, index) => {
            const posts = getPostsByCategory(category)
            const isLast = index === validCategories.length - 1
            
            return (
              <CategorySection 
                key={category} 
                category={category} 
                posts={posts} 
                isLast={isLast}
              />
            )
          })
        })()}
      </div>

      {CATEGORIES.every((category) => getPostsByCategory(category).length === 0) && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            아직 작성된 포스트가 없습니다.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            posts 디렉토리에 마크다운 파일을 추가해보세요!
          </p>
        </div>
      )}
    </div>
  )
}

