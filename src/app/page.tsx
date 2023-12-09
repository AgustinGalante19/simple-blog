'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Home() {
  const session = useSession();

  return (
    <div className='container mx-auto'>
      <h2 className='text-2xl font-bold'>Posts</h2>
      <Link href='/auth/login'>Login</Link>
      <button onClick={() => console.log(session)}>see session</button>
    </div>
  );
}
