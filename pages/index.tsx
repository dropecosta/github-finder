import React from 'react';
import { NextPageContext } from 'next';
import { getSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';



export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Home = () => {

  return (
    <>
      Home
      <button className='w-full h-10 bg-white' onClick={() => signOut()}></button>
    </>
  )
}

export default Home;