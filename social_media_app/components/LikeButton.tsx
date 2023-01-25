import React, { useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react'
import { like } from '../utils/types'

interface IProps {
    handleDislike: (like: boolean) => void
    handleLike: (like: boolean) => void
    likes: like[]
}


const LikeButton = ({ handleDislike, handleLike, likes }: IProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { data: session }: any = useSession()
    

    useEffect(() => {
        if (session) {
            const isLiked = likes?.find((like) => like._ref === session?.user?.id)
            setIsLiked(isLiked ? true : false)
        }
    }, [likes, session])
   

    return (
        <div className='flex justify-start'>
            <div className='flex flex-col justify-center items-center '>
                {isLiked ? (
                    <div 
                        className='bg-primary rounded-full p-2 md:p-4 text-[#FE8088] cursor-pointer'
                        onClick={() => {
                            setIsLiked(false)
                            handleDislike(false)
                        }}
                    >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                ) 
                : 
                (
                    <div 
                        className='bg-primary rounded-full p-2 md:p-4 text-gray-500 cursor-pointer'
                        onClick={() => {
                            setIsLiked(true)
                            handleLike(true)
                        }}
                    >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                )}
                <p className='font-semibold text-sm'>
                    {likes ? likes?.length : 0 } likes
                </p>
            </div>
        </div>
    )
}

export default LikeButton