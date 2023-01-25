import React from 'react'
import { NextPage } from 'next'
import { FaCommentSlash } from 'react-icons/fa'
import { BsFillCameraVideoOffFill } from 'react-icons/bs'

interface IProps {
    text: string
    type: 'comment' | 'video'
}

const NoResults: NextPage<IProps> = ({ text, type }) => {
    
    return (
        <div
            className='flex flex-col justify-center items-center h-full text-gray-500 font-semibold'
        >
            {type === 'comment' ? (
                <FaCommentSlash className='text-5xl -mt-5' />
            ) : (
                <BsFillCameraVideoOffFill className='text-5xl -mt-5' />
            )}
            {text}
        </div>
    )
}

export default NoResults