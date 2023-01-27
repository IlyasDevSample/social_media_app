import React, { useState, useEffect, useRef } from 'react'
import { IPost } from '@/utils/types'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import useWindowDimensions from '../hooks/useWindowDimensions';


interface IProps {
    post: IPost
    isMuted: boolean
    setIsMuted: (value: boolean) => void
}

const regexp = /#\S+/g;

const VideoCard: NextPage<IProps> = ({ post, isMuted, setIsMuted }) => {
    const [isHover, setIsHover] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)
    const { height, width } = useWindowDimensions();

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries
                if (entry.isIntersecting) {
                    videoRef?.current?.play()
                    setIsPlaying(true)
                } else {
                    videoRef?.current?.pause()
                    setIsPlaying(false)
                }
            },
            {
                threshold: 0.7,
                rootMargin: `0px 0px ${600 - height}px 0px`
            }
        )
        if (videoRef.current) {
            observer.observe(videoRef.current)
        }
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current)
            }
        }
    }, [videoRef, height])

    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div>
                <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded items-center md:items-start'>

                    <div className="md:w-16 md:h-16 w-14 h-14">
                        <Link href={`/profile/${post.postedBy._id}`}>
                            <Image
                                src={post.postedBy.imageURL}
                                width={64} height={64}
                                className='rounded-full border-2'
                                alt='Profile photo'
                                
                            />
                        </Link>
                    </div>

                    <div className='pt-2 flex-1'>
                        <Link href={`/profile/${post.postedBy._id}`}>
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
                        <p className='mt-1 mb-2 md:mb-0 text-sm text-gray-600 font-semibold flex flex-wrap'>
                            <span className='mr-2'>{post.caption.replace(regexp, '')}</span>
                            {post.caption.match(regexp)?.map((tag, i) => (
                                <Link href={`/tags/${tag.slice(1)}`} key={i} className='mr-2 font-bold cursor-pointer'>
                                    {tag}
                                </Link>
                            ))}
                        </p>
                    </div>
                </div>
            </div>

            <div className='lg:ml-12 flex gap-4 md:pl-16 lg:pl-10 justify-center md:justify-start overflow-x-hidden'>

                <div className="rounded-3xl">
                    <div className='relative'>
                        <Link href={`/detail/${post._id}`}>
                            <video
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                src={post.video.asset.url}
                                loop
                                ref={videoRef}
                                muted={isMuted}
                                className='lg:max-w-[600px] h-[400px] md:h-[460px] lg:h-[480px] w-[200] rounded-md cursor-pointer bg-gray-100 video'>

                            </video>
                        </Link>

                        {isHover && (
                            <div
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                                className='animate-opacity absolute bottom-4 left-1/2  cursor-pointer  -translate-x-1/2 flex gap-28 lg:gap-44 md:gap-36 items-center justify-center'
                            >

                                {isPlaying ? (
                                    <button onClick={handlePlay} className=' bg-gray-200 rounded-full p-1 opacity-75'>
                                        <BsFillPauseFill className='text-gray-700 text-2xl md:text-3xl opacity-95' />
                                    </button>
                                ) :
                                    (
                                        <button onClick={handlePlay} className='bg-gray-200 rounded-full p-1 opacity-75'>
                                            <BsFillPlayFill className='text-gray-700 text-2xl md:text-3xl opacity-95' />
                                        </button>
                                    )}
                                {isMuted ? (
                                    <button onClick={handleMute} className='bg-gray-200 rounded-full p-1 opacity-75'>
                                        <HiVolumeOff className='text-gray-700 text-2xl lg:text-3xl opacity-95' />
                                    </button>
                                ) :
                                    (
                                        <button onClick={handleMute} className='bg-gray-200 rounded-full p-1 opacity-75'>
                                            <HiVolumeUp className='text-gray-700 text-2xl lg:text-3xl opacity-95' />
                                        </button>
                                    )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard