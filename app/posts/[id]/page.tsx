import { getAllPostIds, getPostData } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function generateStaticParams() {
  const postIds = getAllPostIds()
  return postIds.map((id) => ({
    id,
  }))
}

export default async function Post({ params }: { params: { id: string } }) {
  let postData
  try {
    postData = await getPostData(params.id)
  } catch (error) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-8"
      >
        ← 목록으로 돌아가기
      </Link>
      
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {postData.title}
        </h1>
        <time className="text-gray-500 dark:text-gray-500">
          {format(new Date(postData.date), 'yyyy년 M월 d일', { locale: ko })}
        </time>
      </header>

      <div
        className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:text-gray-900 dark:prose-headings:text-gray-100
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
          prose-code:text-gray-900 dark:prose-code:text-gray-100
          prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
      />
    </article>
  )
}

