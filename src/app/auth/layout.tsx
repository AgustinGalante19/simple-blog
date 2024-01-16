"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function AuthLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const { push } = useRouter()

  useEffect(() => {
    if (status === "authenticated") return push("/")
  }, [status, push])

  return (
    <div className='relative w-full'>
      <header className='top-0 w-full flex p-4'>
        <Link href='/'>
          <h2 className='text-center text-3xl font-extrabold'>
            Simple <span className='text-primary'>Blog</span>
          </h2>
          <span className='w-full h-1 bg-primary flex rounded-full' />
        </Link>
      </header>
      {children}
    </div>
  )
}
export default AuthLayout
