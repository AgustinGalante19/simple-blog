import useCases from "@/api/useCases"
import usePosts from "./usePosts"
import { useEffect, useState } from "react"
import PostWithUser from "@/types/PostWithUser"

function useSavedPosts(userId: string) {
  const [isLoading, setIsLoading] = useState(false)

  const [posts, setPosts] = useState<PostWithUser[]>([])
  useEffect(() => {
    const getInitialPosts = () => {
      setIsLoading(true)
      useCases.posts
        .saved(userId)
        .then((response) => {
          const mappedArray = response.data.data.map((e) => ({
            ...e.post,
            User: {
              ...e.user,
            },
          }))
          setPosts(mappedArray)
        })
        .finally(() => setIsLoading(false))
    }
    getInitialPosts()
  }, [userId])
  const {
    changeLoadingStatus,
    isSavePostLoading,
    updatePostsList,
    mappedPosts,
  } = usePosts(posts)

  return {
    isLoading,
    changeLoadingStatus,
    isSavePostLoading,
    updatePostsList,
    mappedPosts,
  }
}

export default useSavedPosts
