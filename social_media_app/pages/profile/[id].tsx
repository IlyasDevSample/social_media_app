import { GetServerSideProps, NextPage } from 'next'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import axios from 'axios'
import VideoCard from '@/components/VideoCard'
import NoResults from '@/components/NoResults'
import { User, IPost } from '../../utils/types'

interface Props {
    user: User
    userPosts: IPost[]
    userLikedPosts: IPost[]
}

const Profile: NextPage<Props> = ({ user, userPosts, userLikedPosts }) => {
    const [isMuted, setIsMuted] = useState(true)
    const [showUploads, setShowUploads] = useState(true)
    const uploads = showUploads ? 'border-b-2' : 'text-gray-900'
    const liked = showUploads ? 'text-gray-900' : 'border-b-2'

    return (
        <div className='w-full'>
            <div className="flex gap-6 md:gap-5 bg-white w-full items-center ">
                <div className="w-16 h-16 md:w-28 md:h-28 ">
                    <Image
                        src={user.imageURL}
                        alt="Picture of the User"
                        width={112}
                        height={112}
                        className='rounded-full border-4 '
                    />
                </div>

                <div className='flex flex-col'>
                    <p className='font-semibold text-primary md:text-2xl tracking-wider lowercase'>
                        {user.userName.split('@')[0]}
                        <GoVerified className='inline text-blue-500 ml-1' />
                    </p>
                    <p className='text-gray-500 text-sm md:text-xl capitalize'>
                        {user.userName.split('@')[0]}
                    </p>
                </div>
            </div>

            <div className='flex gap-10 mb-10 mt-10 border-b border-gray-200 bg-white w-full'>
                <p className={`pb-2 text-xl font-semibold cursor-pointer mt-2 border-black ${uploads}`}
                    onClick={() => setShowUploads(true)}
                >
                    Uploads ({userPosts.length})
                </p>
                <p className={`pb-2 text-xl font-semibold cursor-pointer mt-2 border-black ${liked}`}
                    onClick={() => setShowUploads(false)}
                >
                    Liked ({userLikedPosts.length})
                </p>
            </div>

            <div>
                {showUploads ? (
                    userPosts.length > 0 ? (
                        userPosts.map((post) => (
                            <VideoCard key={post._id} post={post} isMuted={isMuted} setIsMuted={setIsMuted}/>
                        ))
                    ) : (
                        <NoResults text='No posts yet' type='video' />
                    )
                ) : (
                    userLikedPosts.length > 0 ? (
                        userLikedPosts.map((post) => (
                            <VideoCard key={post._id} post={post} isMuted={isMuted} setIsMuted={setIsMuted}/>
                        ))
                    ) : (
                        <NoResults text='0 Likes on the posts' type='comment' />
                    )
                )}
            </div>

        </div>
    )
}

export default Profile

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id
    let data = null
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${id}`)
        data = res.data
    } catch (err) {
        return {
            notFound: true
        }
    }



    return {
        props: {
            user: data.user,
            userPosts: data.userPosts,
            userLikedPosts: data.userLikedPosts
        }
    }
}