"use client";

import useCases, { PostIdResponse } from "@/api/useCases";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import PostDeailtsLoader from "@/components/ui/post-detail-loader";

function Post() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<PostIdResponse | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      setIsLoading(true);
      useCases.posts
        .getOne(id)
        .then((response) => {
          const postResponse = response.data.data[0];
          setPost({
            ...postResponse,
            createdAt: new Date(postResponse.createdAt),
          });
        })
        .catch((err) => console.log("algo salio mal: ", err))
        .finally(() => setIsLoading(false));
    }
  }, []);

  const sanitizedContent = DOMPurify.sanitize(
    post?.content ?? "<p>no content :(</p>",
    {
      USE_PROFILES: { html: true },
    }
  );

  return !isLoading && post ? (
    <article className='max-md:mx-0 max-md:w-full w-[700px] bg-white p-16'>
      <div className='max-w-3xl mx-auto'>
        {post.headerImage && post.headerImage !== "" && (
          <div className='relative'>
            <Image
              src={post.headerImage}
              alt='header image'
              className='object-cover w-[720px] h-[250px] mx-auto'
              height={250}
              width={720}
            />
          </div>
        )}
        <div className='py-2 flex items-center justify-between mb-4'>
          <div>
            <span className='font-bold text-lg'>
              {post.User.name} {post.User.lastname}
            </span>
            <span className='block text-sm text-gray-400'>
              @{post.User.username}
            </span>
          </div>
          <div className='text-xs text-gray-400'>
            <span>{post.createdAt.toDateString()}</span>
          </div>
        </div>
        <section
          dangerouslySetInnerHTML={{
            __html: sanitizedContent,
          }}
        />
      </div>
    </article>
  ) : (
    <PostDeailtsLoader />
  );
}

export default Post;
