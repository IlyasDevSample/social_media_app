import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useSession, signIn, signOut } from 'next-auth/react';


const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="border-b-2 border-gray-200">
            <div className='w-full flex justify-between items-center py-2 px-5 container mx-auto'>
                <Link href='/'>
                    <div className='w-[100px] md:w-[130px]'>
                        <Image className='cursor-pointer' src="/images/brand-logo.png" alt="TIKI TAKA logo" width={300} height={70} />
                    </div>
                </Link>

                <div className="">
                    Search
                </div>

                <div>
                    {session &&
                        <div className='flex gap-4 md:gap-10 items-center justify-center'>
                            <Link href='/upload'>
                                <button className='border-2 px-2 md:px-4 py-2 text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 rounded-md'>
                                    <IoMdAdd className='text-2xl' />
                                    <span className='hidden md:block'>Upload</span>
                                </button>
                            </Link>

                            <Link href='/profile' className='flex items-center justify-center'>
                                <button>
                                    <Image className='rounded-full cursor-pointer' src={session?.user?.image as string} alt="profile picture" width={40} height={40} />
                                </button>
                            </Link>

                            <button onClick={() => signOut()} className='transition hover:bg-primary bg-slate-50 p-2 rounded-md' >
                                <AiOutlineLogout className='text-2xl' color='red' fontSize={21}/>
                            </button>
                        </div> 
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar