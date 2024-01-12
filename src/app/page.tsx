"use client"

import Tag from "@/components/ui/tag"
import { Post, User } from "@prisma/client"
import Link from "next/link"
import useSWR from "swr"
import { AlertCircle, Bookmark, Link as LinkIcon, Check } from "lucide-react"
import PostLoader from "@/components/ui/post-loader"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/components/ui/use-toast"

interface PostWithUser extends Post {
  User: User
}

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const {
    data: postData,
    error,
    isLoading,
  } = useSWR<ApiResponse<PostWithUser>>("/api/post", fetcher)

  const { toast } = useToast()
  return (
    <div className='flex max-md:w-full justify-center max-sm:p-0 max-sm:m-0'>
      <ScrollArea className='w-[700px] max-lg:w-full border-x border-gray-400/30 h-screen px-4 py-4'>
        <section>
          {isLoading && !postData ? (
            Array.from({ length: 3 }).map((_, i) => <PostLoader key={i} />)
          ) : postData ? (
            <div>
              {postData.data.map((post) => (
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
                            <button className='hover:scale-125 transition-transform'>
                              <Bookmark />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Save Post</p>
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
                                const link = document.getElementById(
                                  `link-${post.id}`
                                )
                                const check = document.getElementById(
                                  `check-${post.id}`
                                )
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
                              <Check
                                className='hidden'
                                id={`check-${post.id}`}
                                size={20}
                              />
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
