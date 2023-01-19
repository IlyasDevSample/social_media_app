import React from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { IPost } from '../utils/types'
import VideoCard from '@/components/VideoCard'
import NoResults from '@/components/NoResults'

interface IProps {
    posts: IPost[]
}

const Home = ({ posts }: IProps) => {
    // posts= []
    return (
        <div className='flex flex-col gap-10 videos h-full'>
            {posts.length ?

                posts.map((post: IPost) => (
                    <VideoCard key={post._id} post={post} />
                ))
                :
                <NoResults text='No posts yet be the first and post something now' />
            }
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await axios.get('http://localhost:3000/api/post')
    const data = await response.data

    return {
        props: {
            // props for your component
            posts: data
        }
    }
}