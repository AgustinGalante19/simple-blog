'use client';

import { useSession } from 'next-auth/react';

function Navigation() {
  const { status, data } = useSession();

  return (
    <div className='bg-white p-4 border-b border-gray-200'>
      <div className='container mx-auto bg-red-400 flex justify-between'>
        <div className='bg-blue-400'>some navigation links</div>
        {status === 'authenticated' ? (
          <>{data.user?.name}</>
        ) : (
          <div className='bg-yellow-400'>login or session buttons</div>
        )}
      </div>
    </div>
  );
}
export default Navigation;
