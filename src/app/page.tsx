"use client";

import Tag from "@/components/ui/tag";
import { Post, User } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

interface PostWithUser extends Post {
  User: User;
}

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR<ApiResponse<PostWithUser>>(
    "/api/post",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // render data
  return (
    <div className='container grid grid-cols-4 mx-auto'>
      <aside className='col-span-1'>whatever</aside>
      <div className='col-span-2'>
        <h2 className='text-2xl font-bold'>Posts</h2>
        {data?.data.map((post) => (
          <article className='p-4 my-3 bg-white rounded-md' key={post.id}>
            <span className="text-sm text-gray-500 font-semibold">
              {post.User.name} {post.User.lastname}
            </span>
            <h2 className='font-extrabold text-4xl'>{post.title}</h2>

            <div className='flex gap-2 mt-2'>
              {post.tags.map((t) => (
                <Tag label={t} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
