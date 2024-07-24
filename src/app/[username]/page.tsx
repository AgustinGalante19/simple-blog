"use client"

import getUserPosts from "@/actions/getUserPosts"
import PostLoader from "@/components/ui/post-loader"
import { Post } from "@prisma/client"
import { getSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import { DefaultUser } from "next-auth"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import PostItem from "@/components/post-item"
import usePosts from "@/hooks/usePosts"
import PostWithUser from "@/types/PostWithUser"

interface IUser extends DefaultUser {
  id: string
  name?: string
  lastname?: string
  username?: string
}

function UserProfile() {
  const { username } = useParams()

  const [userData, setUserData] = useState<{
    user: IUser | undefined
    posts: PostWithUser[]
  }>({
    user: undefined,
    posts: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  const {
    mappedPosts,
    updatePostsList,
    changeLoadingStatus,
    isSavePostLoading,
  } = usePosts(userData.posts)

  useEffect(() => {
    const getUserData = async () => {
      const session = await getSession()
      setIsLoading(true)
      const posts = await getUserPosts(username as string)
      setUserData({
        user: session?.user as IUser,
        posts,
      })
      setIsLoading(false)
    }
    getUserData()
  }, [username])

  return (
    <div className='flex w-[700px] max-lg:w-full max-md:w-full justify-center max-sm:p-0 max-sm:m-0'>
      <div className='w-full px-2'>
        <div>
          {isLoading || !userData.user ? (
            <>
              <div className='flex flex-col mt-4 space-y-2'>
                <span>
                  <Skeleton className='h-7 bg-blue-100 w-36' />
                </span>
                <span className='text-gray-400 text-sm'>
                  <Skeleton className='h-5 bg-blue-100 w-24' />
                </span>
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <PostLoader key={i} />
              ))}
            </>
          ) : (
            <>
              <ScrollArea className='w-[700px] max-lg:w-full border-x max-sm:border-none border-gray-400/30 h-screen px-4 py-4'>
                <div className='flex flex-col space-y-2'>
                  <span className='font-extrabold  text-xl'>
                    {userData.user?.name + " " + userData.user?.lastname}
                  </span>
                  <span className='text-gray-400 text-sm'>@{username}</span>
                </div>
                {mappedPosts?.map((post) => (
                  <PostItem
                    changeLoadingStatus={changeLoadingStatus}
                    isSavePostLoading={isSavePostLoading}
                    post={post}
                    key={post.id}
                    updatePosts={updatePostsList}
                    posts={mappedPosts}
                  />
                ))}
              </ScrollArea>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
