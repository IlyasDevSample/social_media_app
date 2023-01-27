import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'
import { IPost, User } from '@/utils/types'
import VideoCard from '@/components/VideoCard'
import { useState } from 'react'
import NoResults from '@/components/NoResults'
import { useRouter } from 'next/router'
import { useUserStore } from '@/store/userStore'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
    posts: IPost[]
}

const Search: NextPage<Props> = ({ posts }) => {
    const router = useRouter()
    const [isMuted, setIsMuted] = useState(true)
    const [showAccounts, setShowAccounts] = useState(true)
    const { users } = useUserStore()
    const filteredUsers: User[] = users.filter((user) => user.userName.toLowerCase().includes((router.query.search as any).toLowerCase() as string))

    const accounts = showAccounts ? 'border-b-2' : 'text-gray-900'
    const SearchPosts = showAccounts ? 'text-gray-900' : 'border-b-2'


    return (
        <div>
            <div className='flex gap-10 mb-10 border-b border-gray-200 bg-white w-full'>
                <p className={`pb-2 text-xl font-semibold cursor-pointer mt-2 border-black ${accounts}`}
                    onClick={() => setShowAccounts(true)}
                >
                    Posts ({posts.length})
                </p>
                <p className={`pb-2 text-xl font-semibold cursor-pointer mt-2 border-black ${SearchPosts}`}
                    onClick={() => setShowAccounts(false)}
                >
                    Accounts ({filteredUsers.length})
                </p>
            </div>

            <div>
                {showAccounts ? (
                    posts?.length > 0 ? (
                        posts.map((post) => (
                            <VideoCard key={post._id} post={post} isMuted={isMuted} setIsMuted={setIsMuted} />
                        ))
                    ) : (
                        <div
                            className='flex justify-center items-center h-96'
                        >
                            <NoResults text={`No Posts result was found for "${router.query.search}" `} type='video' />
                        </div>
                    )
                ) : (

                    filteredUsers?.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div key={user._id} >
                                <Link href={'/profile/'+ user._id} className='flex items-center gap-4 p-2 border-b border-gray-200'>
                                    <Image
                                        src={user.imageURL}
                                        width={50}
                                        height={50}
                                        className='rounded-full
                                        object-cover cursor-pointer border-2 border-gray-200 hover:border-red-200'
                                        alt='profile picture'
                                    />
                                    <p className='text-lg font-semibold'>{user.userName.split('@')[0]}</p>
                                </Link>
                            </div>
                        ))
                    ) : (

                        <div className='flex justify-center items-center h-96'>
                            <NoResults text={`No Account result was found for "${router.query.search}" `} type='account' />
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export default Search

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { search } = context.query;
    let data = null;
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${search}`)
        data = res.data
    }
    catch (err: any) {
        console.log(err)
        if (err.response.status === 404) {
            return {
                notFound: true
            }
        }
        if (err.response.status === 500) {
            return {
                redirect: {
                    destination: '/500',
                    permanent: false
                }
            }
        }

    }

    return {
        props: {
            posts: data
        }
    }
} 