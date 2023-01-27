import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { useRouter } from 'next/router'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

    // const [isSSR, setIsSSR] = useState(true)
    // useEffect(() => {
    //     setIsSSR(false)
    // }, [])

    // if (isSSR) {
    //     return null
    // }
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleStart = (url: string) => {
            setIsLoading(true)
        }
        const handleComplete = (url: string) => {
            setIsLoading(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router.events])
    

    if (isLoading) {
        return (
            <>
                <SessionProvider session={pageProps.session}>
                    <div className='overflow-hidden h-[100vh]'>
                        <Navbar />
                        <div className="flex gap-1 items-center justify-center min-h-screen p-5 bg-gray-100 min-w-screen">

                            <div className="flex animate-pulse">
                                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                            </div>
                            <div className="flex  animate-pulse">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            </div>
                            <div className="flex animate-pulse">
                                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                            </div>

                        </div>
                    </div>
                </SessionProvider>
            </>
        )
    }


    if (Component.getLayout) {
        return (
            <SessionProvider session={pageProps.session}>
                {Component.getLayout(<Component {...pageProps} />)}
            </SessionProvider>
        )
    }

    return (
        <SessionProvider session={pageProps.session}>
            <Head>
                <title>TIKI TAKA</title>
                <meta name="description" content="Tiki taka is a social media app, it's an amazing platform to share your thoughts and ideas with the world. It's a great place to share your thoughts and ideas with the world and to connect with people from all over the world." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="facebook, twitter, tikTok" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className='overflow-hidden h-[100vh]'>
                <Navbar />
                <div className='flex container mx-auto md:px-16 '>
                    <div className='h-[92vh] overflow-hidden scrollbar-overlay' >
                        <Sidebar />
                    </div>
                    <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1 md:pl-12'>
                        <Component {...pageProps} />
                    </div>
                </div>
            </div>
        </SessionProvider>
    )

}
