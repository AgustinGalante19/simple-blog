"use client"

import { AlertCircle } from "lucide-react"
import PostLoader from "@/components/ui/post-loader"
import { ScrollArea } from "@/components/ui/scroll-area"
import PostItem from "@/components/post-item"
import usePosts from "@/hooks/usePosts"

export default function Home() {
  const {
    mappedPosts,
    error,
    isLoading,
    updatePostsList,
    changeLoadingStatus,
    isSavePostLoading,
  } = usePosts()

  return (
    <div className='flex max-md:w-full justify-center max-sm:p-0 max-sm:m-0'>
      <ScrollArea className='w-[700px] max-lg:w-full border-x border-gray-400/30 h-screen px-4 py-4'>
        <section>
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <PostLoader key={i} />)
          ) : mappedPosts ? (
            <div>
              {mappedPosts.map((post) => (
                <PostItem
                  post={post}
                  key={post.id}
                  updatePosts={updatePostsList}
                  posts={mappedPosts}
                  changeLoadingStatus={changeLoadingStatus}
                  isSavePostLoading={isSavePostLoading}
                />
              ))}
            </div>
          ) : (
            error && (
              <div className='flex justify-center bg-red-50 rounded-md mt-32 p-4'>
                <h3 className='text-lg font-semibold text-red-500 flex items-center gap-2'>
                  <AlertCircle />
                  Something went wrong, try later
                </h3>
              </div>
            )
          )}
        </section>
      </ScrollArea>
    </div>
  )
}
