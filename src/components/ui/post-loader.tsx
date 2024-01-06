import { Skeleton } from "./skeleton";

const PostLoader = () => {
  return (
    <article className='p-4 my-3 border border-gray/30 rounded-md bg-white'>
      <div className='flex justify-between items-center py-1'>
        <span className='text-sm text-gray-500 font-semibold'>
          <Skeleton className='w-[100px] h-[18px] ' />
        </span>
        <span className='text-gray-500 text-sm'>
          <Skeleton className='w-[60px] h-[15px]' />
        </span>
      </div>
      <Skeleton className='w-[250px] h-[40px]' />

      <div className='flex justify-between mt-2'>
        <div className='flex flex-wrap gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton className='w-[90px] h-[30px] rounded-md' key={i} />
          ))}
        </div>
        <div className='flex items-end'>
          <Skeleton className='w-[30px] h-[30px]' />
        </div>
      </div>
    </article>
  );
};

export default PostLoader;
