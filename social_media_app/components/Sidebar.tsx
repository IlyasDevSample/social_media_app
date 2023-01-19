import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { GoogleLoginButton } from "react-social-login-buttons";
import { signIn, signOut, useSession } from 'next-auth/react'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

const Sidebar: NextPage = () => {
    const { data: session, status } = useSession()
    const [showSidebar, setShowSidebar] = useState(true)
    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start rounded-xl xl:rounded cursor-pointer font-semibold text-[#FE8088]'
    const userProfile = false

    return (
        <div>
            <div className='block xl:hidden m-2 ml-4 mt-3 text-xl'
                onClick={() => setShowSidebar((prev) => !prev)}
            >
                {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
            </div>
            {showSidebar && (
                <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
                    <div className="xl:border-b-2 border-gray-200 xl:pb-4 xl:mx-2">
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
                    {!userProfile && (
                        <div className='px-2 py-4 hidden xl:block'>
                            <p className='text-gray-400'>Log in to follow creators, like videos, and view comments.</p>
                            <div className='pr-4 mt-4'>
                                <GoogleLoginButton onClick={() => signIn("google")} style={{margin: 0}} />
                            </div>
                        </div>
                    )}
                    <Discover />
                    <SuggestedAccounts />
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Sidebar