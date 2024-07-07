"use client"

import { signOut, useSession } from "next-auth/react"
import { Plus, LogOut, Bookmark, Home, User } from "lucide-react"
import Link from "next/link"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import React from "react"
import { Skeleton } from "./skeleton"

function Navigation() {
  const { status, data } = useSession()

  const pathname = usePathname()

  const MENU_ITEMS = [
    {
      label: "Home",
      link: "/",
      icon: <Home />,
    },
    {
      label: "Saved Posts",
      link: "/saved/" + data?.user?.id,
      icon: <Bookmark />,
    },
  ]

  if (pathname.includes("/auth")) return null

  if (status === "loading")
    return (
      <aside className='h-screen flex flex-col py-16 px-2 justify-between'>
        <ul className='space-y-3 flex flex-col'>
          <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-md:hidden mb-4'>
            Simple<span className='text-primary'>Blog</span>
          </h1>
          <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-sm:block mb-4 md:hidden'>
            S<span className='text-primary'>B</span>
          </h1>
          {Array.from({ length: 3 }).map((_, i) => (
            <li key={i} className='flex'>
              <Link
                href='#'
                className={`py-2 px-4 max-sm:px-0 w-full text-xl hover:bg-primary/20 transition-colors flex items-center justify-start max-sm:justify-center rounded-md "font-bold"
              )}`}
              >
                <Skeleton className='h-10 w-40 bg-white' />
              </Link>
            </li>
          ))}
        </ul>
        <div className='flex flex-col items-center justify-center gap-2'>
          <Skeleton className='w-40 h-10 rounded-full bg-white' />
          <Skeleton className='w-40 h-10 rounded-full bg-white' />
        </div>
      </aside>
    )
  return (
    <aside className='h-screen flex flex-col py-16 px-2 justify-between'>
      <ul className='space-y-3 flex flex-col'>
        <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-md:hidden mb-4'>
          Simple<span className='text-primary'>Blog</span>
        </h1>
        <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-sm:block mb-4 md:hidden'>
          S<span className='text-primary'>B</span>
        </h1>
        {MENU_ITEMS.map((item, i) => (
          <li key={i} className='flex'>
            <Link
              href={item.link}
              className={`py-2 px-4 max-sm:px-0 w-full text-xl hover:bg-primary/20 transition-colors flex items-center justify-start max-sm:justify-center rounded-md ${cn(
                pathname === item.link
                  ? "font-extrabold bg-primary hover:bg-primary/60  text-white"
                  : "font-bold"
              )}`}
            >
              {item.icon}
              <span className='ml-2 max-sm:hidden'>{item.label}</span>
            </Link>
          </li>
        ))}
        {status === "authenticated" && (
          <li>
            <Link
              href={`/profile/${data.user?.username}`}
              className={`py-2 px-4 max-sm:px-0 w-full text-xl hover:bg-primary/20 transition-colors flex items-center justify-start max-sm:justify-center rounded-md ${cn(
                pathname.startsWith("/profile")
                  ? "font-extrabold bg-primary hover:bg-primary/60 text-white"
                  : "font-bold"
              )}`}
            >
              <User />
              <span className='ml-2 max-sm:hidden flex flex-col'>
                {data?.user?.name}
                <span
                  className={`text-xs ${cn(
                    pathname.startsWith("/profile")
                      ? "text-white"
                      : "text-gray-500"
                  )}`}
                >
                  @{data?.user?.username}
                </span>
              </span>
            </Link>
          </li>
        )}
      </ul>
      {status === "authenticated" ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Button className='rounded-full w-full' asChild>
            <Link href='/post/create'>
              <div className='flex items-center max-sm:items-normal'>
                <span className='font-semibold max-sm:hidden'>Create Post</span>
                <Plus size={18} className='ml-2 max-sm:m-0' />
              </div>
            </Link>
          </Button>
          <div className='w-full flex mt-2'>
            <Button
              className='mx-auto rounded-full w-full'
              variant='destructive'
              onClick={() => signOut()}
            >
              <LogOut />
              <span className='ml-2 max-sm:hidden'>LogOut</span>
            </Button>
          </div>
        </div>
      ) : (
        <Button className='w-full font-semibold rounded-full text-lg' asChild>
          <Link href='/auth/login'>Login</Link>
        </Button>
      )}
    </aside>
  )
}
export default Navigation
