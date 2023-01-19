import React, { useState, useEffect, useRef } from 'react'
import { IPost } from '@/utils/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'


interface IProps {
    post: IPost
}


const VideoCard: NextPage<IProps> = ({ post }) => {
    const [isHover, setIsHover] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handlePlay = () => {
        if (videoRef?.current?.paused) {
            videoRef.current.play()
            setIsPlaying(true)
        } else {
            videoRef?.current?.pause()
            setIsPlaying(false)
        }
    }

    const handleMute = () => {
        if (isMuted) {
            setIsMuted(false)
        } else {
            setIsMuted(true)
        }
    }

    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6 '>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>

                    <div className="md:w-16 md:h-16 w-10 h-10">
                        <Link href="/">
                            <Image
                                src={post.postedBy.imageURL}
                                width={62} height={62}
                                className='rounded-full'
                                alt='Profile photo'
                                layout='responsive'
                            />
                        </Link>
                    </div>

                    <div className='pt-2'>
                        <Link href="/">
                            <div className='flex items-center gap-2'>
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
            </div>
            <div className='lg:ml-20 flex gap-4 relative'>
                <div className="rounded-3xl">
                    <Link href='/'>
                        <video
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            src={post.video.asset.url}
                            loop
                            ref={videoRef}
                            muted={isMuted}
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200] rounded-2xl cursor-pointer bg-gray-100'>

                        </video>
                    </Link>
                    {isHover && (
                        <div 
                            onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)} 
                            className='animate-opacity absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'
                            >

                            {isPlaying ? (
                                <button onClick={handlePlay}>
                                    <BsFillPauseFill className='text-gray-900 text-2xl lg:text-4xl' />
                                </button>
                            ) :
                            (
                                <button onClick={handlePlay}>
                                    <BsFillPlayFill className='text-gray-900 text-2xl lg:text-4xl' />
                                </button>
                            )}
                            {isMuted ? (
                                <button onClick={handleMute} >
                                    <HiVolumeOff className='text-gray-900 text-2xl lg:text-4xl' />
                                </button>
                            ) :
                            (
                                <button onClick={handleMute}>
                                    <HiVolumeUp className='text-gray-900 text-2xl lg:text-4xl' />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard