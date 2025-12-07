import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPostIds, getPostData } from '@/lib/posts'
import { getCategoryInfo, getAllCategories } from '@/lib/categories'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category,
  }))
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const categoryInfo = getCategoryInfo(params.category)
  
  if (!categoryInfo) {
    notFound()
  }

  // 해당 카테고리의 모든 포스트 가져오기
  const allPostIds = getAllPostIds()
  const categoryPosts = []
  
  for (const id of allPostIds) {
    try {
      const postData = await getPostData(id)
      if (postData.category === params.category) {
        categoryPosts.push(postData)
      }
    } catch (error) {
      // 파일이 없거나 읽을 수 없는 경우 건너뛰기
      console.warn(`Failed to load post ${id}:`, error)
      continue
    }
  }

  // 날짜순으로 정렬
  categoryPosts.sort((a, b) => {
    if (a.date < b.date) return 1
    if (a.date > b.date) return -1
    return 0
  })

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 뒤로가기 버튼 */}
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← 홈으로 돌아가기
      </Link>

      {/* 카테고리 헤더 */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
          {categoryInfo.image ? (
            <Image
              src={categoryInfo.image}
              alt={categoryInfo.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
              <span>이미지</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {categoryInfo.name}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
            {categoryInfo.subtitle}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            {categoryInfo.description}
          </p>
        </div>
      </div>

      {/* 포스트 목록 */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          전체 포스트 ({categoryPosts.length})
        </h2>
        
        {categoryPosts.length === 0 ? (
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              아직 작성된 포스트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
              >
                {post.image && (
                  <div className="relative w-full aspect-video">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <time className="text-gray-500 dark:text-gray-500 text-xs">
                    {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

