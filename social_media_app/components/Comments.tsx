import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import { FiSend } from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import NoResults from './NoResults'
import { comment } from '../utils/types'
import { AiOutlineLoading } from 'react-icons/ai'

interface IProps {
    commentsList: comment[],
    setInputIsOnFocus: React.Dispatch<React.SetStateAction<boolean>>
    handleComment: (comment: string) => void
    isPosingComment: boolean
    setIsPosingComment: React.Dispatch<React.SetStateAction<boolean>>
}

const Comments = ({ commentsList, setInputIsOnFocus, handleComment, isPosingComment, setIsPosingComment }: IProps) => {
    const { data: session }: any = useSession()
    const [comment, setComment] = useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPosingComment(true)
        setComment('')

        if (comment.trim() !== '') {
            handleComment(comment.trim())
        } else {
            setIsPosingComment(false)
        }
    }

    return (
        <div className='relative mt-3 border-gray-200 px-1 bg-[#F8F8F8] border rounded-sm lg:pb-0 pb-[100px]'>
            <div className="overflow-scroll h-[300px] lg:h-[290px]">
                {commentsList?.length > 0 ? (
                    commentsList.map((comment: comment) => (
                        <div key={comment._id}>
                            {comment.commentText}
                        </div>
                    ))


                ) : (
                    <NoResults text='Be the first who Comments' type='comment' />
                )}
                {session && (
                    <div className="absolute bottom-0 left-0 right-0 pb-2 px-2 ">
                        <form onSubmit={handleSubmit} className='flex gap-2 justify-center items-center'>
                            <input type="text" placeholder='Add Comment ...'
                                className='bg-primary text-gray-700 px-6 py-4 text-base font-medium border rounded-md w-full outline-none focus:border-gray-400 transition-all'
                                onChange={(e) => { setComment(e.target.value) }}
                                value={comment}
                                onFocus={() => setInputIsOnFocus(true)}
                                onBlur={() => setInputIsOnFocus(false)}
                            />
                            {!isPosingComment ? (
                                <button type='submit' className=' text-gray-600 bg-gray-100 rounded-md p-4 hover:bg-gray-200 transition-all hover:text-[#FE8088]'>
                                    <FiSend className='text-2xl' />
                                </button>)
                                : (
                                    <button type='button' className=' text-gray-600 bg-gray-100 rounded-md p-4 hover:bg-gray-200 transition-all hover:text-[#FE8088]'>
                                        <AiOutlineLoading className='text-2xl animate-spin' />
                                    </button>
                                )}


                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comments