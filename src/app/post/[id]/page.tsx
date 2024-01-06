"use client";

import useCases, { PostIdResponse } from "@/api/useCases";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DOMPurify from "isomorphic-dompurify";

function Post() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<PostIdResponse | null>({
    id: "65980399a6d2356ba073f9a0",
    userId: "6596c8e8f66e6fc708b9e5c7",
    title: "Titulo texteditr",
    content:
      '<h2 class="text-xl font-bold" levels="2">asdas213</h2><p></p><p><strong>probando contenido</strong></p><p></p><p>testest</p>',
    tags: [],
    createdAt: new Date("2024-01-05T13:26:49.954Z"),
    User: {
      username: "agustingalante19",
      name: "Agustin",
      lastname: "Galante",
    },
  });

  /* useEffect(() => {
    if (typeof id === "string") {
      setIsLoading(true);
      useCases.posts
        .getOne(id)
        .then((response) => {
          console.log("Post data: ", response.data);
          setPost(response.data.data[0]);
        })
        .catch((err) => console.log("algo salio mal: ", err))
        .finally(() => setIsLoading(false));
    }
  }, []); */

  const sanitizedContent = DOMPurify.sanitize(
    post?.content ?? "<p>no content :(</p>",
    {
      USE_PROFILES: { html: true },
    }
  );

  if (isLoading) return <p>loading...</p>;
  return (
    post && (
      <article className='container mx-16 max-md:mx-0 max-md:w-full bg-white p-16'>
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
            __html: DOMPurify.sanitize(post.content),
          }}
        ></section>
      </article>
    )
  );
}

export default Post;
