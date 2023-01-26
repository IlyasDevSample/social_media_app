import React, { useEffect } from 'react'
import { useUserStore } from '../store/userStore'
import { User } from '../utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { GoVerified } from 'react-icons/go';

const SuggestedAccounts = () => {
    const { users, fetchAllUsers } = useUserStore()
    const { data: session }: any = useSession()


    useEffect(() => {
        fetchAllUsers(session?.user.id)
    }, [fetchAllUsers, session?.user.id])



    return (
        <div className='hidden xl:block mx-2 lg:border-b border-gray-200 pb-4'>
            <p className='text-gray-500 font-semibold m-3 mt-4'>
                Suggested Accounts
            </p>
            <div>
                {[...users].reverse().slice(0, 5).map((user: User) => (
                    <Link href={`/profile/${user._id}`} key={user._id}>
                        <div className='flex items-center gap-3 hover:bg-primary transition-all p-2 cursor-pointer font-semibold rounded' >
                            <div className="w-8 h-8 ">
                                <Image
                                    src={user.imageURL}
                                    alt="Picture of the User"
                                    width={40}
                                    height={40}
                                    className='rounded-full'
                                />
                            </div>

                            <div  className='flex flex-col'>
                                <p className='font-semibold text-primary text-sm lowercase'>
                                    {user.userName.split('@')[0]}
                                    <GoVerified className='inline text-blue-500 ml-1' />
                                </p>
                                <p className='text-gray-500 text-sm capitalize'>
                                    {user.userName.split('@')[0]}
                                </p>
                            </div>

                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}

export default SuggestedAccounts