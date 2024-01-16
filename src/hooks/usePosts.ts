import useCases from "@/api/useCases"
import MappedPosts from "@/types/MappedPosts"
import PostWithUser from "@/types/PostWithUser"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function usePosts(posts: PostWithUser[]) {
  const { data } = useSession()

  const [mappedPosts, setMappedPosts] = useState<MappedPosts[] | undefined>([])

  const updatePostsList = (newPosts: MappedPosts[]) => setMappedPosts(newPosts)

  const [isSavePostLoading, setIsSavePostLoading] = useState(false)

  const changeLoadingStatus = (newState: boolean) =>
    setIsSavePostLoading(newState)

  useEffect(() => {
    const checkSaved = async () => {
      if (data && data.user && data.user.id) {
        const savedPosts = await useCases.posts.saved(data.user.id)
        const result = posts.map((post) => {
          const isSaved = savedPosts.data.data.find((p) => p.postId === post.id)
          return {
            ...post,
            isSaved: Boolean(isSaved),
          }
        })
        setMappedPosts(result)
      }
    }
    checkSaved()
  }, [data, posts])

  return {
    mappedPosts,
    updatePostsList,
    changeLoadingStatus,
    isSavePostLoading,
  }
}
