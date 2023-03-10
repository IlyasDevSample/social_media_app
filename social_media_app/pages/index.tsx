import React, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { IPost } from '../utils/types'
import VideoCard from '@/components/VideoCard'
import NoResults from '@/components/NoResults'
import { NextPage } from 'next'
import { getSession } from 'next-auth/react'

interface IProps {
    posts: IPost[]
}

const Home: NextPage<IProps> = ({ posts }) => {
    const [isMuted, setIsMuted] = useState(true)

    return (
        <div className='flex flex-col gap-10 videos h-full'>
            {posts.length ?

                posts.map((post: IPost) => (
                    <VideoCard key={post._id} post={post}  isMuted={isMuted} setIsMuted={setIsMuted}/>
                ))
                :
                <NoResults text='No posts yet be the first and post something now' type='video' />
            }
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query: { topics } } = context
    const session = await getSession(context)

    if (topics) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover`,{
            params: {
                topics
            }
            
        })
        const data = await response.data

        return {
            props: {
                // props for your component
                posts: data,
                session
            }
        }
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`)
    const data = await response.data

    return {
        props: {
            // props for your component
            posts: data,
            session
        }
    }
}
