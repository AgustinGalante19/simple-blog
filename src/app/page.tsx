"use client";

import Tag from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import {
  HomeOutlined,
  HomeFilled,
  BookOutlined,
  BookFilled,
  PlusOutlined,
  UserOutlined,
  LogoutOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";

interface PostWithUser extends Post {
  User: User;
}

export default function Home() {
  const pathname = usePathname();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const {
    data: postData,
    error,
    isLoading,
  } = useSWR<ApiResponse<PostWithUser>>("/api/post", fetcher);

  const { status, data } = useSession();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className='container flex mx-auto min-h-screen justify-center'>
      <aside className='max-sm:hidden flex flex-col py-16 mr-4  justify-between w-[200px]'>
        <ul className='space-y-3 flex flex-col'>
          <h1 className='text-2xl font-bold'>
            Simple<span className='text-primary'>Blog</span>
          </h1>
          <li>
            <Link
              href={"/"}
              className={`py-2 px-4  text-xl hover:bg-primary/20 transition-colors rounded-full flex items-center ${cn(
                pathname === "/" ? "font-extrabold" : "font-semibold"
              )}`}
            >
              {pathname === "/" ? <HomeFilled /> : <HomeOutlined />}
              <span className='ml-2'>Home</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className={`py-2 px-4  text-xl hover:bg-primary/20 transition-colors rounded-full  flex items-center ${cn(
                pathname === "/saved" ? "font-bold" : "font-semibold"
              )}`}
            >
              {pathname === "/saved" ? <BookFilled /> : <BookOutlined />}
              <span className='ml-2'>Saved Post</span>
            </Link>
          </li>
        </ul>
        {status === "authenticated" ? (
          <div className='flex flex-col items-center justify-center gap-2'>
            <Button className='rounded-full w-full' asChild>
              <Link href='/post/create'>
                <div className='flex items-center'>
                  <span className='font-semibold'>Create Post</span>
                  <PlusOutlined size={18} className='ml-2' />
                </div>
              </Link>
            </Button>
            <div className='max-sm:hidden w-full'>
              <DropdownMenu>
                <DropdownMenuTrigger className='p-2 rounded-full px-3 hover:border hover:border-white hover:bg-white border border-gray-400/30 transition-all w-full'>
                  <div className='flex items-center justify-between'>
                    <span>{data.user?.name}</span>
                    <MoreOutlined className='rotate-90' />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='cursor-pointer'>
                    <UserOutlined size={18} className='mr-2' />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='cursor-pointer'
                    onClick={() => signOut()}
                  >
                    <LogoutOutlined size={18} className='mr-2' />
                    LogOut
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ) : (
          <Button className='w-full font-semibold rounded-full text-lg' asChild>
            <Link href='/auth/login'>Login</Link>
          </Button>
        )}
      </aside>
      <section className='w-[700px] border-x border-gray-400/30 px-2 py-4 '>
        {postData?.data.map((post) => (
          <article
            className='p-4 my-3 border border-gray/30 rounded-md bg-white'
            key={post.id}
          >
            <div className='flex justify-between items-center py-1'>
              <span className='text-sm text-gray-500 font-semibold'>
                {post.User.name} {post.User.lastname}
              </span>
              <span className='text-gray-500 text-sm'>
                {new Date(post.createdAt).toDateString()}
              </span>
            </div>
            <Link
              href={`/post/${post.id}`}
              className='font-extrabold text-4xl hover:text-primary/90 transition-colors'
            >
              {post.title}
            </Link>

            <div className='flex justify-between mt-2'>
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((t) => (
                  <Tag label={t} key={t} />
                ))}
              </div>
              <div>
                <BookOutlined />
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
