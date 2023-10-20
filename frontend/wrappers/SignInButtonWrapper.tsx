'use client'

import { SignInIcon } from '../icons';
import { signIn } from "next-auth/react";

export default function SignInButtonWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <button 
    onClick={() => signIn()}
    className="flex items-center bg-white text-gray-800 border rounded p-2 shadow-md cursor-pointer font-dmserif transition-all duration-300 hover:shadow-lg active:scale-95">
      <SignInIcon className='mr-1'/>
      {children}
    </button>
  )
}
