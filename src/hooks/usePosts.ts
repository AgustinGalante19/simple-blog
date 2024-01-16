import useCases from "@/api/useCases"
import MappedPosts from "@/types/MappedPosts"
import PostWithUser from "@/types/PostWithUser"
import { useEffect, useState } from "react"
import useSWR from "swr"

export default function usePosts() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const {
    data: postData,
    error,
    isLoading,
  } = useSWR<ApiResponse<PostWithUser>>("/api/post", fetcher)

  const [mappedPosts, setMappedPosts] = useState<MappedPosts[] | undefined>([])

  const updatePostsList = (newPosts: MappedPosts[]) => setMappedPosts(newPosts)

  const [isSavePostLoading, setIsSavePostLoading] = useState(false)

  const changeLoadingStatus = (newState: boolean) =>
    setIsSavePostLoading(newState)

  useEffect(() => {
    const checkSaved = async () => {
      const savedPosts = await useCases.posts.saved()
      const result = postData?.data.map((post) => {
        const isSaved = savedPosts.data.data.find((p) => p.postId === post.id)
        return {
          ...post,
          isSaved: Boolean(isSaved),
        }
      })
      console.log(result)
      setMappedPosts(result)
    }
    checkSaved()
  }, [postData])

  return {
    mappedPosts,
    isLoading,
    error,
    updatePostsList,
    changeLoadingStatus,
    isSavePostLoading,
  }
}
