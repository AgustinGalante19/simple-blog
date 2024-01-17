"use client"

import useCases from "@/api/useCases"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Tag from "@/components/ui/tag"
import TextEditor from "@/components/ui/text-editor"
import { TAGS } from "@/lib/TAGS"
import newPostSchema from "@/lib/validations/newPostSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Upload } from "lucide-react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const findInTheList = (key: string, array: string[]) => {
  const result = array.find((e) => e === key)
  if (result !== undefined) return true
  return false
}

function CreatePost() {
  const [tags, setTags] = useState<string[]>([])
  const [isWorking, setIsWorking] = useState(false)
  const session = useSession()

  const [file, setFile] = useState<File>()
  const [image, setImage] = useState("/img-placeholder.png")

  const { push } = useRouter()

  const form = useForm<z.infer<typeof newPostSchema>>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      content: "",
      title: "",
    },
  })
  const [comboValue, setComboValue] = useState<string | undefined>()

  const handleSubmitNewPost = async (values: z.infer<typeof newPostSchema>) => {
    setIsWorking(true)
    if (session.data) {
      let headerImageUrl = ""
      if (file) {
        try {
          const formData = new FormData()
          formData.append("file", file)
          const uploadImage = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/post/create/image`,
            {
              method: "POST",
              body: formData,
            }
          )
          const response = await uploadImage.json()
          headerImageUrl = response.data[0]
        } catch (err) {
          console.log("error al subir imagen", err)
          headerImageUrl = ""
        }
      }

      useCases.posts
        .create(
          {
            title: values.title,
            content: values.content,
            tags,
            headerImage: headerImageUrl,
          },
          {
            fullName: session.data.user?.name,
            id: session.data.user?.id,
            username: session.data.user?.username,
          }
        )
        .then(() => {
          push("/")
        })
        .catch((e) => {
          console.log(e.message)
        })
        .finally(() => setIsWorking(false))
    }
  }

  return (
    <div className='flex flex-col pt-16 max-sm:pt-0 items-center border-l border-gray-400/30 w-[700px] min-h-screen bg-white'>
      <div className='max-lg:w-full max-sm:h-full p-8 rounded-sm flex flex-col max-sm:justify-center'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitNewPost)}>
            <h2 className='text-2xl font-bold  text-primary'>Create Post</h2>
            <div className='my-3 space-y-2'>
              <span className='text-sm font-medium'>
                Header image (optional){" "}
                <span className='text-gray-500'>(recommended 720x250)</span>
              </span>
              <input
                id='fileInput'
                type='file'
                className='hidden'
                accept='image/png, image/jpeg, image/webp, image/jpg'
                onChange={async (e) => {
                  if (e.target.files) {
                    const currentFile = e.target.files[0]
                    setFile(currentFile)
                    const bytes = await currentFile?.arrayBuffer()
                    const splittedName = currentFile.name.split(".")
                    const extension = splittedName.at(splittedName.length - 1)
                    const buffer = Buffer.from(bytes).toString("base64")
                    const uri = `data:image/${extension};base64,${buffer}`
                    setImage(uri)
                  }
                }}
              />
              <div className='relative h-[250px] w-full'>
                <button
                  className='px-3 py-1 opacity-0 hover:opacity-100 transition-all font-bold text-black text-lg  absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] items-center justify-center gap-2 w-full bg-gray-300/50 flex h-[250px]'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("fileInput")?.click()
                  }}
                >
                  Upload Image
                  <Upload className='inline-block' size={20} />
                </button>
                <Image
                  width={700}
                  height={250}
                  className='object-cover w-[700px] h-[250px]'
                  alt='placeholder image'
                  src={image}
                />
              </div>
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
                value={comboValue}
                onValueChange={(value) => {
                  setTags([...tags, value])
                  setComboValue("")
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
                        return prevState.filter((e) => e !== t)
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
              {isWorking && <Loader2 className='animate-spin' />}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreatePost
