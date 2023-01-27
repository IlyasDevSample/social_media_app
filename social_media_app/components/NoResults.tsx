import React from 'react'
import { NextPage } from 'next'
import { FaCommentSlash } from 'react-icons/fa'
import { AiFillVideoCamera } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { MdAccountCircle } from 'react-icons/md'

interface IProps {
    text: string
    type: 'comment' | 'video' | 'like' | 'account'
}

const NoResults: NextPage<IProps> = ({ text, type }) => {
    
    return (
        <div
            className='flex flex-col justify-center items-center h-full text-gray-500 font-semibold gap-2'
        >
            {type === 'comment' && (
                <FaCommentSlash className='text-5xl -mt-5' />
            )}
            {type === 'video' && (
                <AiFillVideoCamera className='text-5xl -mt-5' />
            )}
            {type === 'like' && (
                <BiLike className='text-5xl -mt-5' />
            )}
            {type === 'account' && (
                <MdAccountCircle className='text-5xl -mt-5' />
            )}
            <p
                className='text-lg'
            >{text}</p>
        </div>
    )
}

export default NoResults