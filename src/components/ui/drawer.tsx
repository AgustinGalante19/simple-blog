import {
  ChevronDown,
  ChevronUp,
  LogOut,
  Menu,
  Plus,
  User,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Drawer } from 'vaul';
import { IUser } from '../../../nextauth';
import { Button } from './button';
import Link from 'next/link';

interface Props {
  status: 'authenticated' | 'unauthenticated';
  handleLogOut: () => void;
  user: IUser | undefined;
  MENU_ITEMS: { label: string; link: string; icon: React.JSX.Element }[];
}

export function MobileDrawer({
  status,
  handleLogOut,
  user,
  MENU_ITEMS,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer.Root
      direction='left'
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Drawer.Trigger
        asChild
        className='hidden max-sm:flex w-full text-primary bg-white sticky p-4'
      >
        <div className='space-x-2'>
          <button onClick={() => setIsOpen(true)}>
            <Menu />
          </button>
          <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center'>
            Simple Blog
          </h1>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className='fixed inset-0 bg-black/40' />
        <Drawer.Content className='bg-white flex flex-col rounded-t-[10px] h-full w-full mt-24 fixed bottom-0 right-0 p-4 z-50'>
          <div className='bg-white flex-1 relative h-full'>
            <div className='max-w-md mx-auto'>
              <Drawer.Title className='font-medium mb-4 text-primary flex justify-between'>
                <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center'>
                  Simple<span className='text-primary'>Blog</span>
                </h1>
                <button onClick={() => setIsOpen(false)}>
                  <X />
                </button>
              </Drawer.Title>
              <div className='flex flex-col'>{/* OPTIONS.... */}</div>
            </div>
            <ul className='space-y-3 flex flex-col text-black'>
              {MENU_ITEMS.map((item, i) => (
                <li key={i} className='flex'>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={item.link}
                    className={`py-2 w-full text-xl transition-colors flex items-center justify-start rounded-md font-semibold`}
                  >
                    {item.icon}
                    <span className='ml-2'>{item.label}</span>
                  </Link>
                </li>
              ))}
              {status === 'authenticated' && (
                <li>
                  <Link
                    onClick={() => setIsOpen(false)}
                    href={`/${user?.username}`}
                    className={`py-2 w-full text-xl transition-colors flex items-center justify-start rounded-md font-semibold`}
                  >
                    <User />
                    <span className='ml-2 flex flex-col'>
                      {user?.name}
                      <span className={`text-xs`}>@{user?.username} DD</span>
                    </span>
                  </Link>
                </li>
              )}
            </ul>
            {status === 'authenticated' ? (
              <div className='flex flex-col absolute w-full bottom-0 items-center justify-center gap-2'>
                <Button
                  className='rounded-full w-full'
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href='/post/create'>
                    <div className='flex items-center'>
                      <Plus size={18} className='ml-2' />
                      <span className='font-semibold'>Create Post</span>
                    </div>
                  </Link>
                </Button>
                <div className='w-full flex mt-2'>
                  <Button
                    className='mx-auto rounded-full w-full'
                    variant='destructive'
                    onClick={() => {
                      handleLogOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut />
                    <span className='ml-2'>LogOut</span>
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                className='w-full font-semibold rounded-full text-lg'
                asChild
              >
                <Link href='/auth/login'>Login</Link>
              </Button>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
