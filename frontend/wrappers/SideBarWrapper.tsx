'use client'

// import '@/app/dashboard/styles.css';

import * as AiIcons from 'react-icons/ai';
import * as FaIcons from 'react-icons/fa';

import { useState } from 'react';

import { SideBar } from '../components/sideBar';
import Link from 'next/link';
import { IconContext } from 'react-icons/lib';

export default function SideBarWrapper() {

  const [sidebar, setsidebar] = useState(false);
  const showSideBar = () => setsidebar(!sidebar);

  return (
    <div className="bg-theme flex justify-start items-center h-20">
        <div className='flex items-center spcae-x-3' >
            <Link href="#" className="ml-7 mr-2 text-black text-2xl">
                <FaIcons.FaBars onClick={showSideBar} />
            </Link>
        </div>
        <nav className={sidebar ? "bg-theme w-64 h-screen fixed top-0 left-0 transform transition-transform duration-300 translate-x-0 text-black" : "bg-gray-300 w-64 h-screen fixed top-0 left-0 -translate-x-full transition-transform duration-800 flex justify-center text-white"}>
            <ul className="w-full" onClick={showSideBar}>
                <li className="w-screen h-20 flex items-center">
                    <Link href='#' className="ml-8 text-black text-2xl">
                        <AiIcons.AiOutlineClose />
                    </Link>
                </li>
                {SideBar.map((item, index) => {
                    return (
                        <li key={index} className="text-black px-7 py-2 list-none h-16 no-underline text-sm w-5/6 h-full flex items-center px-4 rounded-md hover:underline">
                            <Link href={item.path} className="flex items-center space-x-2">
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    </div>
  )
}