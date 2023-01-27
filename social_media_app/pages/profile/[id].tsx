import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
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

const Profile: NextPage<Props> = ({user, userPosts, userLikedPosts}) => {

    
    return (
        <div>
            Profile page with id of :
            
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