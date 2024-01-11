"use client"

import useCases, { PostIdResponse } from "@/api/useCases"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import DOMPurify from "isomorphic-dompurify"
import Image from "next/image"
import PostDeailtsLoader from "@/components/ui/post-detail-loader"
import { AxiosError } from "axios"

function Post() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [post, setPost] = useState<PostIdResponse | null>(null)
  const [error, setError] = useState<{
    isFailed: boolean
    message: string | undefined
  }>({
    isFailed: false,
    message: "",
  })

  useEffect(() => {
    if (typeof id === "string") {
      setIsLoading(true)
      useCases.posts
        .getOne(id)
        .then((response) => {
          const postResponse = response.data.data[0]
          setPost({
            ...postResponse,
            createdAt: new Date(postResponse.createdAt),
          })
        })
        .catch((err: AxiosError<ApiResponse<string>>) => {
          console.log(err)
          setError({
            isFailed: true,
            message: err.response?.data.error[0],
          })
        })
        .finally(() => setIsLoading(false))
    }
  }, [])

  const sanitizedContent = DOMPurify.sanitize(
    post?.content ?? "<p>no content :(</p>",
    {
      USE_PROFILES: { html: true },
    }
  )

  if (error.isFailed) {
    return (
      <div className='max-md:mx-0 max-md:w-full w-[700px] flex flex-col min-h-screen bg-white'>
        <div className='p-6 ronded-md mt-8'>
          <span className='text-3xl font-bold  flex justify-center text-gray-400'>
            {error.message}
          </span>
        </div>
      </div>
    )
  }

  return isLoading ? (
    <PostDeailtsLoader />
  ) : !isLoading && !post ? (
    <p>not found</p>
  ) : (
    post && (
      <article className='max-md:mx-0 max-md:w-full w-[700px] bg-white p-16'>
        <div className='max-w-3xl mx-auto'>
          {post.headerImage && post.headerImage !== "" && (
            <div className='relative'>
              <Image
                src={post.headerImage}
                alt='header image'
                className='object-cover w-[720px] h-[250px] mx-auto'
                height={250}
                width={720}
              />
            </div>
          )}
          <div className='py-2 flex items-center justify-between mb-4'>
            <div>
              <span className='font-bold text-lg'>
                {post.User.name} {post.User.lastname}
              </span>
              <span className='block text-sm text-gray-400'>
                @{post.User.username}
              </span>
            </div>
            <div className='text-xs text-gray-400'>
              <span>{post.createdAt.toDateString()}</span>
            </div>
          </div>
          <section
            dangerouslySetInnerHTML={{
              __html: sanitizedContent,
            }}
          />
        </div>
      </article>
    )
  )
}

export default Post
