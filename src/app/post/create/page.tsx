"use client";

import useCases from "@/api/useCases";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Tag from "@/components/ui/tag";
import TextEditor from "@/components/ui/text-editor";
import { Textarea } from "@/components/ui/textarea";
import { TAGS } from "@/lib/TAGS";
import newPostSchema from "@/lib/validations/newPostSchema";
import { LoadingOutlined } from "@ant-design/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const findInTheList = (key: string, array: string[]) => {
  const result = array.find((e) => e === key);
  if (result !== undefined) return true;
  return false;
};

function CreatePost() {
  const [tags, setTags] = useState<string[]>([]);
  const [isWorking, setIsWorking] = useState(false);
  const session = useSession();

  const { push } = useRouter();

  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  });

  const handleSubmitNewPost = (values: z.infer<typeof newPostSchema>) => {
    setIsWorking(true);
    if (session.data) {
      useCases.posts
        .create(
          { title: values.title, content: values.content, tags },
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
        })
        .finally(() => setIsWorking(false));
    }
  };

  return (
    <div className='flex flex-col pt-16 items-center w-full min-h-screen border-l border-gray-400/30'>
      <div className='min-w-[800px] bg-white p-8 mt-4 rounded-sm'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitNewPost)}>
            <h2 className='text-2xl font-bold text-primary'>Create Post</h2>
            <div className='my-3 space-y-2'>
              <div>
                <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Lorem Ipsun'
                          className='w-64'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name='content'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <TextEditor
                          description={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='my-2'>
              <span className='font-semibold text-sm'>Tags (optional)</span>
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
            <Button
              disabled={isWorking}
              className='rounded-full px-8 font-semibold flex items-center justify-center gap-2'
              type='submit'
            >
              <span>Post</span>
              {isWorking && <LoadingOutlined />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default CreatePost;
