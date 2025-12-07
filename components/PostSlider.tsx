'use client'

import { useRef, useState, useEffect } from 'react'
import { PostData } from '@/lib/posts'
import PostCard from './PostCard'

interface PostSliderProps {
  posts: PostData[]
  categoryId: string
}

export default function PostSlider({ posts, categoryId }: PostSliderProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const { scrollLeft, scrollWidth, clientWidth } = container
      
      // 스크롤 가능 여부 체크 (약간의 여유를 둠)
      const canScroll = scrollWidth > clientWidth
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(canScroll && scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    // DOM이 완전히 렌더링된 후 버튼 상태 업데이트 (여러 번 체크)
    const timers: NodeJS.Timeout[] = []
    
    const checkMultipleTimes = () => {
      updateScrollButtons()
      timers.push(setTimeout(() => updateScrollButtons(), 100))
      timers.push(setTimeout(() => updateScrollButtons(), 300))
      timers.push(setTimeout(() => updateScrollButtons(), 500))
    }
    
    checkMultipleTimes()
    
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', updateScrollButtons)
      window.addEventListener('resize', updateScrollButtons)
      
      // ResizeObserver로 컨테이너 크기 변경 감지
      const resizeObserver = new ResizeObserver(() => {
        updateScrollButtons()
      })
      resizeObserver.observe(container)
      
      return () => {
        timers.forEach(timer => clearTimeout(timer))
        container.removeEventListener('scroll', updateScrollButtons)
        window.removeEventListener('resize', updateScrollButtons)
        resizeObserver.disconnect()
      }
    }
    
    return () => {
      timers.forEach(timer => clearTimeout(timer))
    }
  }, [posts])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    
    const container = scrollContainerRef.current
    const cards = Array.from(container.querySelectorAll('.post-card')) as HTMLElement[]
    if (cards.length === 0) return

    const currentScroll = container.scrollLeft
    
    // 현재 보이는 첫 번째 카드 찾기
    let currentIndex = 0
    let minDistance = Infinity
    
    for (let i = 0; i < cards.length; i++) {
      const cardOffsetLeft = cards[i].offsetLeft
      const distance = Math.abs(cardOffsetLeft - currentScroll)
      if (distance < minDistance) {
        minDistance = distance
        currentIndex = i
      }
    }
    
    // 한 카드씩 이동
    let targetIndex: number
    if (direction === 'left') {
      targetIndex = Math.max(0, currentIndex - 1)
    } else {
      targetIndex = Math.min(cards.length - 1, currentIndex + 1)
    }

    // 타겟 카드의 정확한 위치로 스크롤
    const targetCard = cards[targetIndex]
    const targetScroll = targetCard.offsetLeft

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    })
    
    // 스크롤 완료 후 버튼 상태 업데이트
    setTimeout(() => {
      updateScrollButtons()
    }, 400)
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        포스트가 없습니다.
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {/* 왼쪽 스크롤 버튼 */}
      <button
        onClick={() => scroll('left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-2.5 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 -translate-x-2 ${
          canScrollLeft 
            ? 'hover:shadow-xl hover:scale-110 cursor-pointer opacity-100' 
            : 'opacity-30 cursor-not-allowed'
        }`}
        aria-label="이전 포스트"
      >
        <svg
          className="w-4 h-4 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* 스크롤 가능한 컨테이너 */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scroll-smooth"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="post-card flex-shrink-0 w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <PostCard post={post} isLarge={false} />
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽 스크롤 버튼 */}
      <button
        onClick={() => scroll('right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full p-2.5 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 translate-x-2 ${
          canScrollRight 
            ? 'hover:shadow-xl hover:scale-110 cursor-pointer opacity-100' 
            : 'opacity-30 cursor-not-allowed'
        }`}
        aria-label="다음 포스트"
      >
        <svg
          className="w-4 h-4 text-gray-700 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  )
}

