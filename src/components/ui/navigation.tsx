"use client";

import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  PlusOutlined,
  LogoutOutlined,
  UserOutlined,
  DownOutlined,
  MoreOutlined,
  BookFilled,
  BookOutlined,
  HomeOutlined,
  HomeFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Navigation() {
  const { status, data } = useSession();

  const pathname = usePathname();

  return (
    <aside className='max-sm:hidden flex flex-col py-16 mr-4  justify-between w-[250px] px-4'>
      <ul className='space-y-3 flex flex-col'>
        <h1 className='text-2xl font-bold text-center'>
          Simple<span className='text-primary'>Blog</span>
        </h1>
        <li>
          <Link
            href={"/"}
            className={`py-2 px-4  text-xl hover:bg-primary/20 transition-colors rounded-full flex items-center justify-center ${cn(
              pathname === "/" ? "font-extrabold" : "font-bold"
            )}`}
          >
            {pathname === "/" ? <HomeFilled /> : <HomeOutlined />}
            <span className='ml-2'>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/"}
            className={`py-2 px-4  text-xl hover:bg-primary/20 transition-colors rounded-full  flex items-center justify-center ${cn(
              pathname === "/saved" ? "font-extrabold" : "font-bold"
            )}`}
          >
            {pathname === "/saved" ? <BookFilled /> : <BookOutlined />}
            <span className='ml-2'>Saved</span>
          </Link>
        </li>
      </ul>
      {status === "authenticated" ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Button className='rounded-full w-full' asChild>
            <Link href='/post/create'>
              <div className='flex items-center'>
                <span className='font-semibold'>Create Post</span>
                <PlusOutlined size={18} className='ml-2' />
              </div>
            </Link>
          </Button>
          <div className='max-sm:hidden w-full'>
            <DropdownMenu>
              <DropdownMenuTrigger className='p-2 rounded-full px-3 hover:border hover:border-white hover:bg-white border border-gray-400/30 transition-all w-full'>
                <div className='flex items-center justify-between'>
                  <span>{data.user?.name}</span>
                  <MoreOutlined className='rotate-90' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  <UserOutlined size={18} className='mr-2' />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => signOut()}
                >
                  <LogoutOutlined size={18} className='mr-2' />
                  LogOut
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <Button className='w-full font-semibold rounded-full text-lg' asChild>
          <Link href='/auth/login'>Login</Link>
        </Button>
      )}
    </aside>
  );
}
export default Navigation;
