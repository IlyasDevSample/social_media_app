import React, { useState, useEffect, useRef, use, useCallback } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { NextPageWithLayout } from '../_app'
import Head from 'next/head'
import Navbar from '@/components/Navbar'
import { IPost } from '../../utils/types'
import { useSession, signIn } from 'next-auth/react'
import LikeButton from '@/components/LikeButton'

interface Props {
    postData: IPost
}

const regexp = /#\S+/g;

const DetailId: NextPageWithLayout<Props> = ({ postData }) => {
    const [post, setPost] = useState<IPost>(postData)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [isMuted, setIsMuted] = useState<boolean>(false)
    const router = useRouter()
    const { data: session } = useSession()


    const onVideoClick = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
                setIsPlaying(false)
            } else {
                videoRef.current.play()
                setIsPlaying(true)
            }
        }
    }, [isPlaying])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                onVideoClick()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onVideoClick])

    return (
        <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap '>
            <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center'>
                <div className='absolute top-6 left-2 lg:left-6 flex gap-6 z-50 '>
                    <p onClick={() => router.back()}>
                        <MdOutlineCancel className='text-white text-2xl lg:text-3xl cursor-pointer' />
                    </p>
                </div>
                <div className="relative ">
                    <div className="lg:h-[100vh] h-[60vh]">
                        <video
                            ref={videoRef}
                            loop
                            className='object-cover w-full h-full cursor-pointer'
                            src={post.video.asset.url}
                            autoPlay
                            muted={isMuted}
                            onClick={onVideoClick}
                        />
                    </div>
                    <div className='absolute left-1/2 top-1/2 translate-x-[-40%] -translate-y-1/2'>
                        {!isPlaying && (
                            <button onClick={onVideoClick}>
                                <BsFillPlayFill className='text-white text-4xl lg:text-6xl cursor-pointer transform hover:scale-110 transition duration-300 ease-in-out animate-opacity' />

                            </button>)}
                    </div>
                </div>
                <div className='absolute bottom-6 right-2 lg:right-6 flex gap-6 z-50'>
                    {isMuted ? (
                        <p>
                            <HiVolumeOff
                                className='text-white text-2xl lg:text-3xl cursor-pointer'
                                onClick={() => setIsMuted((prev) => !prev)}
                            />
                        </p>
                    ) : (
                        <p>
                            <HiVolumeUp

                                className='text-white text-2xl lg:text-3xl cursor-pointer'
                                onClick={() => setIsMuted((prev) => !prev)}

                            />
                        </p>
                    )}
                </div>
            </div>
            <div className='relative w-[1000px] md:w-[900px] lg:w-[500px]'>
                <div className='lg:mt-20 mt-10'>
                    <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                        <div className="md:w-16 md:h-16 w-16 h-16 ml-4">
                            <Link href="/profile">
                                <Image
                                    src={post.postedBy.imageURL}
                                    width={64} height={64}
                                    className='rounded-full'
                                    alt='Profile photo'
                                    layout='responsive'
                                />
                            </Link>
                        </div>

                        <div className='pt-2'>
                            <Link href="/profile">
                                <div className='flex flex-col items-start gap-2'>
                                    <p className='flex gap-2 items-center md:text-sm font-bold text-primary'>
                                        {post.postedBy.userName.split('@')[0]}
                                        <GoVerified className='text-blue-400 text-sm' />
                                    </p>
                                    <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                                        {post.postedBy.userName.split('@')[0]}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='px-8'>
                        <p className='text-sm text-gray-600 font-semibold flex flex-wrap'>
                            <span className='mr-2'>{post.caption.replace(regexp, '')}</span>
                            {post.caption.match(regexp)?.map((tag, i) => (
                                <Link href={`/tags/${tag.slice(1)}`} key={i} className='mr-2 font-bold cursor-pointer'>
                                    {tag}
                                </Link>
                            ))}


                        </p>
                        <div className='mt-10 px-10'>
                            {!session ? (
                                <div className='flex justify-center items-center'>
                                    <p className='text-sm text-gray-500 font-semibold'>
                                        <span className='mr-2'>To like or comment, </span>
                                        <button onClick={()=> signIn('google')} className='text-primary font-bold'>
                                            Log in
                                        </button>
                                    </p>
                                </div>)
                                : (
                                    <LikeButton />
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

DetailId.getLayout = (page) => {
    return (
        <>
            <Head>
                <title>Details</title>
            </Head>

            {page}
        </>
    )
}

export default DetailId

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    const data = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`)

    if (!data.data) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            postData: data.data
        }
    }
}