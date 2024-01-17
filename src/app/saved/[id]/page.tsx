"use client"

import PostItem from "@/components/post-item"
import PostLoader from "@/components/ui/post-loader"
import { ScrollArea } from "@/components/ui/scroll-area"
import useSavedPosts from "@/hooks/useSavedPosts"
import { useParams } from "next/navigation"

function SavedPosts() {
  const { id } = useParams()

  const {
    isLoading,
    changeLoadingStatus,
    isSavePostLoading,
    mappedPosts,
    updatePostsList,
  } = useSavedPosts(id as string)
  return (
    <main className='flex max-md:w-full justify-center max-sm:p-0 max-sm:m-0'>
      <ScrollArea className='w-[700px] max-lg:w-full border-x border-gray-400/30 h-screen px-4 py-4'>
        <div className='bg-gray-100 flex w-[680px] fixed py-2'>
          <h2 className='text-2xl font-extrabold'>
            Saved <span className='text-primary'>Posts</span>
          </h2>
        </div>
        <section>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <PostLoader key={i} />)
            : mappedPosts && (
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
              )}
        </section>
      </ScrollArea>
    </main>
  )
}

export default SavedPosts
