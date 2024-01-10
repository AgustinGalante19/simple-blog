import { Skeleton } from "./skeleton"

const PostDeailtsLoader = () => {
  return (
    <article className='w-[700px] max-md:mx-0 max-md:w-full bg-white p-16'>
      <div className='mx-auto'>
        <Skeleton className='h-[250px] mx-auto' />
        <div className='py-2 flex items-center justify-between mb-4'>
          <div>
            <Skeleton className='h-10 w-48' />
            <Skeleton className='h-4 w-32 mt-2' />
          </div>
          <div className='text-xs text-gray-400'>
            <Skeleton className='h-[20px] w-28' />
          </div>
        </div>
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
        <Skeleton className='w-full my-2 h-5' />
      </div>
    </article>
  )
}

export default PostDeailtsLoader
