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
} from "@ant-design/icons";
import Link from "next/link";
import { Button } from "./button";

function Navigation() {
  const { status, data } = useSession();

  return (
    <div className='bg-white p-4 border-b border-gray-200'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='lg:block max-sm:hidden'>
          <ul>
            <li className='hover:text-primary transition-colors'>
              <Link href={"/"}>Home</Link>
            </li>
          </ul>
        </div>
        {status === "authenticated" ? (
          <>
            <div className='max-sm:block'></div>
            <div className='max-sm:hidden'>
              <Button className='rounded-full mr-2' asChild>
                <Link href='/post/create'>
                  <div className='flex items-center'>
                    <span>Create Post</span>
                    <PlusOutlined size={18} className='ml-2' />
                  </div>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger className='p-2 rounded-full px-3 hover:border hover:border-primary border border-white transition-all'>
                  <span className='flex items-center gap-4'>
                    {data.user?.name} <DownOutlined size={16} />
                  </span>
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
          </>
        ) : (
          <div className='bg-yellow-400'>login or session buttons</div>
        )}
      </div>
    </div>
  );
}
export default Navigation;
