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
  Plus,
  LogOut,
  User,
  MoreHorizontal,
  Bookmark,
  Home,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function Navigation() {
  const { status, data } = useSession();

  const pathname = usePathname();

  return (
    <aside className='flex flex-col py-16 px-2 justify-between'>
      <ul className='space-y-3 flex flex-col'>
        <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-md:hidden'>
          Simple<span className='text-primary'>Blog</span>
        </h1>
        <h1 className='text-2xl font-bold text-center flex flex-wrap justify-center items-center max-sm:block md:hidden'>
          S<span className='text-primary'>B</span>
        </h1>
        <li>
          <Link
            href={"/"}
            className={`py-2 px-4 max-sm:px-0  text-xl hover:bg-primary/20 transition-colors rounded-full flex items-center justify-center ${cn(
              pathname === "/" ? "font-extrabold" : "font-bold"
            )}`}
          >
            {pathname === "/" ? <Home fill='#000' /> : <Home />}
            <span className='ml-2 max-sm:hidden'>Home</span>
          </Link>
        </li>
        <li>
          <Link
            href={"/"}
            className={`py-2 px-4  text-xl hover:bg-primary/20 transition-colors rounded-full  flex items-center justify-center ${cn(
              pathname === "/saved" ? "font-extrabold" : "font-bold"
            )}`}
          >
            {pathname === "/saved" ? <Bookmark fill='#000' /> : <Bookmark />}
            <span className='ml-2 max-sm:hidden'>Saved</span>
          </Link>
        </li>
      </ul>
      {status === "authenticated" ? (
        <div className='flex flex-col items-center justify-center gap-2'>
          <Button className='rounded-full w-full' asChild>
            <Link href='/post/create'>
              <div className='flex items-center max-sm:items-normal'>
                <span className='font-semibold max-sm:hidden'>Create Post</span>
                <Plus size={18} className='ml-2 max-sm:m-0' />
              </div>
            </Link>
          </Button>
          <div className='w-full'>
            <DropdownMenu>
              <DropdownMenuTrigger className='py-2 rounded-full px-3 max-sm:px-0 hover:border hover:border-white hover:bg-white border border-gray-400/30 transition-all w-full'>
                <div className='flex items-center justify-between max-sm:justify-center max-sm:block'>
                  <span className='max-sm:hidden'>{data.user?.name}</span>
                  <MoreHorizontal className='rotate-90' />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  <User size={18} className='mr-2 max-sm:mr-0' />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => signOut()}
                >
                  <LogOut size={18} className='mr-2 max-sm:mr-0' />
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
