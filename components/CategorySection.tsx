import Link from 'next/link'
import Image from 'next/image'
import { PostData } from '@/lib/posts'
import { getCategoryInfo } from '@/lib/categories'
import PostSlider from './PostSlider'

interface CategorySectionProps {
  category: string
  posts: PostData[]
  isLast?: boolean
}

export default function CategorySection({ category, posts, isLast = false }: CategorySectionProps) {
  const categoryInfo = getCategoryInfo(category)
  
  if (!categoryInfo) return null

  return (
    <section className="relative mb-12 pb-12">
      {/* 콘텐츠 영역 */}
      <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
        {/* 왼쪽: 카테고리 정보 영역 (1/4) */}
        <div className="md:w-1/4 flex-shrink-0 md:pr-8 flex items-stretch relative">
          {/* 카테고리 설명과 게시글 사이 구분선 */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[1px] bg-gray-300 dark:bg-gray-700"></div>
          <Link 
            href={`/categories/${category}`}
            className="w-full rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col cursor-pointer h-full"
          >
            {/* 위쪽: 이미지 영역 */}
            <div className="relative w-full h-48 flex-shrink-0">
              {categoryInfo.image ? (
                <Image
                  src={categoryInfo.image}
                  alt={categoryInfo.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-pink-900/20"></div>
              )}
            </div>
            
            {/* 아래쪽: 설명 영역 */}
            <div className="p-4 bg-white dark:bg-gray-800 flex flex-col flex-1">
              <div className="flex flex-col items-center md:items-start w-full">
                {/* 카테고리 이름 */}
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1.5 text-center md:text-left">
                  {categoryInfo.name}
                </h2>
                
                {/* 부제목 */}
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-1 h-1 bg-blue-400 rounded-full shadow-sm"></div>
                  <p className="text-xs text-gray-600 dark:text-gray-300 text-center md:text-left font-medium">
                    {categoryInfo.subtitle}
                  </p>
                </div>
                
                {/* 설명 */}
                <p className="text-xs text-gray-600 dark:text-gray-300 text-center md:text-left leading-relaxed line-clamp-2">
                  {categoryInfo.description}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* 오른쪽: 포스트 슬라이더 영역 (3/4) */}
        <div className="md:w-3/4 flex-1 md:pl-8 flex items-stretch">
          <div className="w-full h-full">
            <PostSlider posts={posts} categoryId={category} />
          </div>
        </div>
      </div>
      
      {/* 카테고리 구분선 - 섹션 사이 중앙에 위치 (마지막 섹션 제외) */}
      {!isLast && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-300 dark:bg-gray-700"></div>
      )}
    </section>
  )
}

