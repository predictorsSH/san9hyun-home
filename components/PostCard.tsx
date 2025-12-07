import Link from 'next/link'
import Image from 'next/image'
import { PostData } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface PostCardProps {
  post: PostData
  isLarge?: boolean
}

export default function PostCard({ post, isLarge = false }: PostCardProps) {
  if (isLarge) {
    return (
      <Link
        href={`/posts/${post.id}`}
        className="block group relative h-full rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      >
        {post.image ? (
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            {/* 상단 액센트 라인 */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </div>
        ) : (
          <div className="w-full aspect-video bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
            <span className="text-gray-400 dark:text-gray-500">이미지 없음</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-6">
          <div className="relative">
            <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors duration-300">
              {post.title}
            </h3>
            {post.excerpt && (
              <p className="text-gray-200 text-sm mb-2 line-clamp-2">
                {post.excerpt}
              </p>
            )}
            <time className="text-gray-300 text-xs flex items-center gap-2">
              <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
              {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
            </time>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={`/posts/${post.id}`}
      className="block group h-full bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 relative flex flex-col"
    >
      {/* 상단 액센트 라인 */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      
      {post.image ? (
        <div className="relative w-full aspect-[5/3] overflow-hidden flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* 호버 시 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent group-hover:from-black/20 transition-all duration-300" />
        </div>
      ) : (
        <div className="w-full aspect-[5/3] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center relative flex-shrink-0">
          <span className="text-gray-400 dark:text-gray-500 text-sm">이미지 없음</span>
        </div>
      )}
      <div className="p-4 relative flex flex-col flex-1">
        {/* 배경 그라데이션 효과 (호버 시) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-purple-50/0 dark:from-blue-900/0 dark:to-purple-900/0 group-hover:from-blue-50/30 group-hover:to-purple-50/30 dark:group-hover:from-blue-900/20 dark:group-hover:to-purple-900/20 transition-all duration-300 rounded-b-xl" />
        
        <div className="relative z-10 flex flex-col flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 min-h-[3rem]">
            {post.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed min-h-[2.25rem] flex-1">
            {post.excerpt || '\u00A0'}
          </p>
          <time className="text-gray-500 dark:text-gray-500 text-xs flex items-center gap-2 mt-auto">
            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full group-hover:bg-blue-500 transition-colors"></span>
            {format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })}
          </time>
        </div>
      </div>
    </Link>
  )
}

