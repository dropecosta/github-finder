import React, {useState} from 'react';
import Link from 'next/link';
import { SignOutParams, SignOutResponse, signOut } from 'next-auth/react';


interface NavbarProps {
  user: any;
  signOut: <R extends boolean = true>(
    options?: SignOutParams<R> | undefined
  ) => Promise<R extends true ? undefined : SignOutResponse>;
}

const Navbar: React.FC<NavbarProps> = ({ user, signOut }) => {

  const [technology, setTechnology] = useState('');
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/github?technology=${encodeURIComponent(technology)}`);
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error occurred while fetching data:', error);
    }
  };

  return (
    <nav className="bg-zinc-900">
    <div>
      <div className="relative flex h-16 items-center justify-between">
        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex flex-shrink-0 items-center">
          <img src="/images/logo.svg" className="h-4 lg:h-7 ml-5 mt-5" alt="Logo" />
          </div>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 mr-5 mt-10">
          <div className="relative ml-3">
            <Link href='/#' className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-5 text-sm font-medium">{user?.email}</Link>
            <a onClick={() => signOut()} className="text-white hover:bg-gray-700 hover:text-white rounded-md px-3 py-5 text-sm font-medium cursor-pointer">Logout</a>
          </div>
        </div>
      </div>
    </div>5
  </nav>
  )
}

export default Navbar
