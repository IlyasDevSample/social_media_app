import React, { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { GoogleLoginButton } from "react-social-login-buttons";
import { signIn, useSession } from 'next-auth/react'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import { FcGoogle } from 'react-icons/fc'

const Sidebar: NextPage = () => {
    const { data: session } = useSession()
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start rounded-xl xl:rounded cursor-pointer font-semibold text-[#FE8088]'


    return (
        <div>

            <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r border-gray-100 xl:border-0 p-3'>
                <div className="xl:border-b border-gray-200 xl:pb-4 xl:mx-2">
                    <Link href='/'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block font-semibold'>
                                For You
                            </span>
                        </div>
                    </Link>
                </div>
                {!session && (
                    <div>
                        <div className='px-2 py-4 hidden xl:block'>
                            <p className='text-gray-400'>Log in to follow creators, like videos, and view comments.</p>
                            <div className='pr-4 mt-4'>
                                <GoogleLoginButton onClick={() => signIn("google")} style={{ margin: 0 }} text='Log in with Google' />
                            </div>
                        </div>
                        <div className='xl:hidden flex items-center justify-center'>
                            <button
                                onClick={() => signIn("google")}
                                className='bg-white text-white font-semibold rounded-xl hover:bg-primary transition-all h-[50px] w-[50px]'
                            >
                                <div className='flex items-center justify-center h-full w-full'>
                                    <FcGoogle className='text-2xl' />
                                </div>
                            </button>
                        </div>
                    </div>
                )}
                <Discover />
                <SuggestedAccounts />
                <Footer />
            </div>

        </div>
    )
}

export default Sidebar

