import React, { useState, useEffect} from 'react'
import { MdFavorite } from 'react-icons/md'
import { useSession } from 'next-auth/react'

interface IProps {
    handleDislike: (like: boolean) => void
    handleLike: (like: boolean) => void
}


const LikeButton = ({ handleDislike, handleLike }: IProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(false)
    const { data: session } = useSession()

    
   

    return (
        <div className='gap-6'>
            <div className='mt-4 flex flex-col justify-center items-start '>
                {isLiked ? (
                    <div 
                        className='bg-primary rounded-full p-2 md:p-4 text-[#FE8088] cursor-pointer'
                        onClick={() => handleDislike(false)}
                    >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                ) 
                : 
                (
                    <div 
                        className='bg-primary rounded-full p-2 md:p-4 text-gray-500 cursor-pointer'
                        onClick={() => handleLike(true)}
                    >
                        <MdFavorite className='text-lg md:text-2xl' />
                    </div>
                )}
                <p className='font-semibold text-sm ml-1'>
                    150 likes
                </p>
            </div>
        </div>
    )
}

export default LikeButton