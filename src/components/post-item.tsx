"use client"

import Link from "next/link"
import React from "react"
import Tag from "./ui/tag"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"
import { Bookmark, Check, Link as LinkIcon } from "lucide-react"
import { useToast } from "./ui/use-toast"
import MappedPosts from "@/types/MappedPosts"
import { useSession } from "next-auth/react"
import useCases from "@/api/useCases"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

function PostItem({
  post,
  updatePosts,
  posts,
  isSavePostLoading,
  changeLoadingStatus,
}: {
  post: MappedPosts
  updatePosts: (newPosts: MappedPosts[]) => void
  posts: MappedPosts[]
  isSavePostLoading: boolean
  changeLoadingStatus: (newState: boolean) => void
}) {
  const { toast } = useToast()

  const { data, status } = useSession()

  const pathname = usePathname()

  const handleSavePost = (post: MappedPosts) => {
    const userId = data?.user?.id
    if (userId && status === "authenticated") {
      if (post.isSaved === true) {
        changeLoadingStatus(true)
        useCases.posts
          .removeFromSaved(userId, post.id)
          .then(() => {
            toast({
              title: "👍 Success",
              description: "✅ Post unsaved successfully!",
            })
            let newPosts: MappedPosts[] = []
            if (pathname === "/") {
              newPosts = posts.map((p) => {
                if (p.id === post.id) {
                  return {
                    ...p,
                    isSaved: !p.isSaved,
                  }
                }
                return p
              })
            } else {
              newPosts = posts.filter((e) => e.id !== post.id)
            }
            updatePosts(newPosts)
          })
          .catch(() => {
            toast({
              title: "👎 Error",
              description: "❌ Connot unsave the post",
              variant: "destructive",
            })
          })
          .finally(() => changeLoadingStatus(false))
      } else {
        changeLoadingStatus(true)
        useCases.posts
          .savePost(userId, post.id)
          .then(() => {
            toast({
              title: "👍 Success",
              description: "✅ Post saved successfully!",
            })
            const newPosts = posts.map((p) => {
              if (p.id === post.id) {
                return {
                  ...p,
                  isSaved: !p.isSaved,
                }
              }
              return p
            })
            updatePosts(newPosts)
          })
          .catch(() => {
            toast({
              title: "👎 Error",
              description: "❌ Connot save the post",
              variant: "destructive",
            })
          })
          .finally(() => changeLoadingStatus(false))
      }
    }
  }

  return (
    <article
      className='p-4 max-sm:p-2 my-1 rounded border border-gray/30 bg-white'
      key={post.id}
    >
      <div className='flex justify-between items-center py-1'>
        <span className='text-sm text-gray-500 font-semibold'>
          {post.User.name} {post.User.lastname}
        </span>
        <span className='text-gray-500 text-sm max-sm:text-xs'>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <Link
        href={`/post/${post.id}`}
        className='font-extrabold text-4xl max-sm:text-2xl hover:text-primary/90 transition-colors'
      >
        {post.title}
      </Link>

      <div className='flex justify-between mt-2'>
        <div className='flex flex-wrap gap-2'>
          {post.tags.map((t) => (
            <Tag label={t} key={t} />
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={`${cn(
                    !isSavePostLoading && "hover:scale-125"
                  )} transition-transform`}
                  onClick={() => handleSavePost(post)}
                  disabled={isSavePostLoading}
                >
                  <Bookmark
                    fill={
                      post.isSaved && isSavePostLoading
                        ? "#747d8c"
                        : !post.isSaved
                        ? "#fff"
                        : "#000"
                    }
                    color={isSavePostLoading ? "#747d8c" : "#000"}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <span>{post.isSaved ? "Remove from saved" : "Save post"}</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className='hover:scale-125 transition-transform'
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.href}posts/${post.id}`
                    )
                    toast({
                      title: "👍 Copied!",
                      description:
                        "✅The post url was copied to your clipboard",
                    })
                    const link = document.getElementById(`link-${post.id}`)
                    const check = document.getElementById(`check-${post.id}`)
                    link?.classList.add("hidden")
                    check?.classList.remove("hidden")
                    check?.classList.add("block")
                    setTimeout(() => {
                      check?.classList.remove("block")
                      check?.classList.add("hidden")

                      link?.classList.toggle(
                        "block",
                        !check?.classList.contains("block")
                      )
                      link?.classList.toggle(
                        "hidden",
                        check?.classList.contains("block")
                      )
                    }, 2000)
                  }}
                >
                  <LinkIcon size={20} id={`link-${post.id}`} />
                  <Check className='hidden' id={`check-${post.id}`} size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy Link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </article>
  )
}

export default PostItem
