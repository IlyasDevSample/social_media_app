import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {

    const [isSSR, setIsSSR] = useState(true)

    useEffect(() => {
        setIsSSR(false)
    }, [])

    if (isSSR) {
        return null
    }

    return (
        <>
            <Head>
                <title>Social | Home</title>
                <meta name="description" content="social media it's an amazing platform to share your thoughts and ideas with the world. It's a great place to share your thoughts and ideas with the world and to connect with people from all over the world." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="facebook, twitter, tikTok" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar />
            <div className='flex gap-6 md:gap-20'>
                <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
                    <Sidebar />
                </div>
                <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
                    <Component {...pageProps} />
                </div>
            </div>

        </>
    )

}
