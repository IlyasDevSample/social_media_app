import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { useSession, signIn, signOut } from 'next-auth/react';


const Navbar = () => {
    const { data: session }: any = useSession();
    const [search, setSearch] = React.useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (search.trim() !== '') {
            router.push(`/search/${search}`);
        }
    }

    return (
        <div className="border-b border-gray-200">
            <div className='w-full flex justify-between items-center py-2 px-5 container mx-auto'>
                <Link href='/'>
                    <div className='w-[100px] md:w-[130px]'>
                        <Image className='cursor-pointer' src="/images/brand-logo.png" alt="TIKI TAKA logo" width={300} height={70} />
                    </div>
                </Link>

                <div className="relative hidden md:block">
                    <form
                        className="absolute md:static top-10 -left-20 bg-white"
                        onSubmit={handleSearch}
                    >
                        <input
                            className="bg-primary p-3 md:text-base font-medium border border-gray-100 focus:outline-none text-gray-900 focus:border-gray-400 w-[300px] md:w-[350px] rounded-full md:top-0"
                            type="text"
                            placeholder="Search for videos and accounts"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button type='submit' className="absolute bg-primary md:right-5 right-6 top-[50%] -translate-y-[44%] border-l border-gray-300 pl-4 text-2xl text-gray-500">
                            <BiSearch className='text-2xl'/>
                        </button>
                    </form>
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

                            <Link href={`/profile/${session.user.id}`} className='flex items-center justify-center'>
                                <button>
                                    <Image className='rounded-full cursor-pointer border border-[#FE8088]' src={session?.user?.image as string} alt="profile picture" width={40} height={40} />
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