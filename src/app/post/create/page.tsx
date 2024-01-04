"use client";

import useCases from "@/api/useCases";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tag from "@/components/ui/tag";
import { Textarea } from "@/components/ui/textarea";
import { TAGS } from "@/lib/TAGS";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface CustomElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  content: HTMLTextAreaElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

const findInTheList = (key: string, array: string[]) => {
  const result = array.find((e) => e === key);
  if (result !== undefined) return true;
  return false;
};

function CreatePost() {
  const [tags, setTags] = useState<string[]>([]);

  const session = useSession();

  const { push } = useRouter();

  const handleSubmit = (e: React.FormEvent<CustomForm>) => {
    e.preventDefault();
    const target = e.currentTarget.elements;

    const { title, content } = target;
    if (session.data) {
      useCases.posts
        .create(
          { title: title.value, content: content.value, tags },
          {
            fullName: session.data.user?.name,
            id: session.data.user?.id,
            username: session.data.user?.username,
          }
        )
        .then(() => {
          push("/");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  };

  return (
    <div className='container mx-auto max-w-4xl bg-white p-8 mt-4 rounded-sm'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-2xl font-semibold'>Create Post</h2>
        <div className='my-3 space-y-4'>
          <div>
            <Label htmlFor='title'>Title</Label>
            <Input id='title' placeholder='Lorem Ipsun' />
          </div>
          <div>
            <Label htmlFor='content'>Content</Label>
            <Textarea
              id='content'
              placeholder='Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt. '
            />
          </div>
        </div>
        <div className='my-2'>
          <span className='font-semibold text-sm'>Tags</span>
          <Select
            onValueChange={(value) => {
              setTags([...tags, value]);
            }}
          >
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select Tags' />
            </SelectTrigger>
            <SelectContent>
              {TAGS.map((t) => (
                <SelectItem
                  value={t.key}
                  key={t.key}
                  disabled={findInTheList(t.key, tags)}
                >
                  {t.displayTitle}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className='py-2 flex flex-wrap gap-2'>
            {tags.map((t) => (
              <Tag
                key={t}
                label={t}
                handleClickRemove={() =>
                  setTags((prevState) => {
                    return prevState.filter((e) => e !== t);
                  })
                }
                haveRemove
              />
            ))}
          </div>
        </div>
        <Button className='rounded-full px-8 font-semibold' type='submit'>
          Post
        </Button>
      </form>
    </div>
  );
}

export default CreatePost;
