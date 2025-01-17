'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react'; 
import CheckBox  from '@/components/CheckBox';

export default function Home({ children }) {

  const [isSubtask3Allowed, setIsSubtask3Allowed] = useState(false);
  const subtask3Caption = `Show protected information if ${' '}`;
  const router = useRouter();
  const pathName = usePathname();

  const criterianHandle = (e) => {
    setIsSubtask3Allowed(e.target.value % 2 === 1);
  };
  
  useEffect(() => {
    if (!isSubtask3Allowed && pathName === '/subtask3') {
      router.push('/');
    }
  },[isSubtask3Allowed, router, pathName]);

  return (
    <>
      <h1 className="mb-4">React Practical</h1>
      <h2 className="mb-3">The topic {`'Routes'`}</h2>
      {isSubtask3Allowed ? (
        <Link href="/subtask3" className="text-blue-500 underline">
          {subtask3Caption}
        </Link>
        ) : (
        <span className="text-blue-500 underline">
          {subtask3Caption}
        </span>
        )
      }
      <input type="number" className="border w-20" onChange={criterianHandle} /> is odd
      <CheckBox />
      {children}
    </>
  );
}
