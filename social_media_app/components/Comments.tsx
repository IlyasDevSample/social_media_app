import React, { useState, useEffect, useCallback } from 'react'
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
    const [showComments, setShowComments] = useState(false)

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

    const handleCommentHashTag = useCallback((text: string) => {
        const words = text.split(' ')
        const newWords = words.map(word => {
            if (word.startsWith('#')) {
                return (
                    <Link href={`/tags/${word.slice(1)}`} key={word}>
                        <span className='text-[#FE8088] font-semibold hover:underline'>
                            {word + ' '}
                        </span>
                    </Link>
                )
            } else {
                return word + ' '
            }
        })

        return newWords

    }, [])

    useEffect(() => {
        setShowComments(true)
    }, [])

    
    return (
        <div className={`relative mt-3 border-gray-200 px-1 bg-[#F8F8F8] border rounded-sm ${session && 'pb-[50px]'}`}>
            <div className="overflow-scroll h-[300px] lg:h-[290px]">
                {commentsList?.length > 0 ? (
                    commentsList.map((comment: comment) => (
                        <div key={comment._id} className='p-2 items-center'>
                            <Link href={`/profile/${comment.postedBy._id}`}>
                                <div className='flex items-center gap-3 hover:bg-primary transition-all p-2 cursor-pointer font-semibold rounded' >
                                    <div className="w-12 h-12">
                                        <Image
                                            src={comment.postedBy.imageURL}
                                            alt="Picture of the User"
                                            width={64}
                                            height={64}
                                            className='rounded-full '
                                        />
                                    </div>

                                    <div className='flex flex-col flex-1'>
                                        <p className='font-semibold text-primary text-sm lowercase flex items-center'>
                                            {comment.postedBy.userName.split('@')[0]}
                                            <GoVerified className='inline text-blue-500 ml-1' />
                                        </p>
                                        <p className='text-gray-700 text-sm '>
                                            {showComments && handleCommentHashTag(comment.commentText)}
                                        </p>
                                    </div>

                                </div>
                            </Link>
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