import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useSession } from 'next-auth/react';


const Navbar = () => {
    const { data: session }= useSession()
    console.log(session)


    return (
        <div className="border-b-2 border-gray-200">
            <div className='w-full flex justify-between items-center  py-2 px-5'>
                <Link href='/'>
                    <div className='w-[100px] md:w-[130px]'>
                        <Image className='cursor-pointer' src="/images/brand-logo.png" alt="TIKI TAKA logo" width={300} height={70} />
                    </div>
                </Link>

                <div className="">
                    Search
                </div>

                <div>
                    User Profile
                </div>
            </div>
        </div>

    )
}

export default Navbar