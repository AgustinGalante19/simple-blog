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
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const {
    data: postData,
    error,
    isLoading,
  } = useSWR<ApiResponse<PostWithUser>>("/api/post", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className='container mx-auto'>
      <section className='w-[700px] border-x border-gray-400/30 min-h-screen px-2 py-4 '>
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
