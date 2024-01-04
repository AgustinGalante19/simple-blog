"use client";

import Tag from "@/components/ui/tag";
import { cn } from "@/lib/utils";
import { Post, User } from "@prisma/client";
import {
  HomeOutlined,
  HomeFilled,
  BookOutlined,
  BookFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSWR from "swr";

interface PostWithUser extends Post {
  User: User;
}

export default function Home() {
  const pathname = usePathname();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR<ApiResponse<PostWithUser>>(
    "/api/post",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className='container lg:grid lg:grid-cols-4 mx-auto mt-2 min-h-[800px] '>
      <aside className='col-span-1 max-sm:hidden flex p-4 mr-4 rounded-lg'>
        <ul className='space-y-3'>
          <li>
            <Link
              href={"/"}
              className={`py-2 px-4 flex gap-1 items-center text-xl hover:bg-gray-400/20 transition-colors rounded-full ${cn(
                pathname === "/" ? "font-extrabold" : "font-semibold"
              )}`}
            >
              {pathname === "/" ? <HomeOutlined /> : <HomeFilled />}
              <span className="ml-2">Home</span>
            </Link>
          </li>
          <li>
            <Link
              href={"/"}
              className={`py-2 px-4 flex gap-1 items-center text-xl hover:bg-gray-400/20 transition-colors rounded-full ${cn(
                pathname === "/saved" ? "font-bold" : "font-semibold"
              )}`}
            >
              {pathname === "/saved" ? <BookFilled /> : <BookOutlined />}
              <span className="ml-2">Saved Post</span>
            </Link>
          </li>
        </ul>
      </aside>
      <div className='col-span-2'>
        {data?.data.map((post) => (
          <article className='p-4 my-3 bg-white rounded-md' key={post.id}>
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
      </div>
    </div>
  );
}
