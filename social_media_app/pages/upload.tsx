import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { NextPageWithLayout } from './_app'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import { client as sanityClient } from '../utils/sanityClient'
import { SanityAssetDocument } from '@sanity/client'
import { GetServerSideProps } from 'next'
import { topics } from '../utils/constants'

const Upload: NextPageWithLayout = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [videoFile, setVideoFile] = useState<SanityAssetDocument>()
    const [wrongFileType, setWrongFileType] = useState(false)
    const [caption, setCaption] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(topics[0].name)
    const [savingPost, setSavingPost] = useState(false)

    const uploadVideo = async (e: any) => {
        setIsLoading(true)
        setWrongFileType(false)
        const selectedFile = e.target.files[0]
        const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']

        if (selectedFile && fileTypes.includes(selectedFile.type)) {
            sanityClient.assets.upload('file', selectedFile, {
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data) => {
                setVideoFile(data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
            })

        } else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }

    const handlePost = async () => {
        if (!videoFile || !caption || !selectedCategory) return

        setSavingPost(true)

        const post = {
            caption,
            category: selectedCategory,
            videoId: videoFile._id
        }

        const res = await axios.post('/api/post', post)
        setSavingPost(false)
        console.log(res)
        if (res.status === 201) {
            router.push('/')
        } else {
            console.log(res)
        }
    }


    return (
        <div className='min-h-[100vh] bg-[#f8f8f8] flex justify-center items-center'>
            <div className="bg-white lg:rounded-lg h-fit w-full lg:w-[1000px] flex justify-center px-14 py-8 flex-wrap md:flex-nowrap">
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-sm text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-1 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition-all'>
                        {isLoading ? (
                            <p className='text-red-400 text-sm font-medium'>
                                Uploading video...
                            </p>
                        ) : (
                            <div>
                                {videoFile ? (
                                    <div className='flex flex-col items-center justify-center'>
                                        <video src={videoFile.url} loop controls className='rounded-xl bg-black w-full'></video>
                                    </div>

                                ) : (
                                    <label className='cursor-pointer'>
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <div className='flex flex-col items-center justify-center'>
                                                <p className='font-bold text-xl'>
                                                    <FaCloudUploadAlt className='text-6xl text-gray-400' />
                                                </p>
                                                <p className='text-gray-400 text-sm mt-2'>Upload Video</p>
                                                <p className='text-gray-400 text-xs mt-2'>
                                                    MP4 or WebM, Ogg.
                                                </p>
                                                <p className='text-gray-400 text-xs mt-2'>
                                                    720p or higher.<br />
                                                    Up to 10 minutes.<br />
                                                    Max 2GB. <br />
                                                </p>
                                                <p className='bg-[#FE8088] text-center rounded mt-10 text-white text-sm font-medium p-2 w-52 outline-none' >
                                                    Select File
                                                </p>
                                            </div>
                                            <input type="file" onChange={uploadVideo} name="upload-video" className='w-0 h-0' />
                                        </div>
                                    </label>
                                )}
                            </div>
                        )}
                        {wrongFileType &&
                            <p className='text-red-400 text-sm font-medium mt-2 text-center'>
                                Wrong file type. Please upload a video file (mp4 or webm or ogg).
                            </p>}
                    </div>
                </div>
                <div className='flex flex-col justify-center gap-3 pb-10 w-full px-5 lg:px-16'>
                    <div>
                        <label className='text-md font-medium'>Caption:</label>
                        <input
                            type="text"
                            className='mt-2 w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-red-300'
                            value={caption}
                            onChange={(e) => (
                                setCaption(e.target.value)
                            )}
                        />
                    </div>
                    <div>
                        <label className='text-md font-medium'>Choose a Category:</label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => (
                                setSelectedCategory(e.target.value)
                            )}
                            className='capitalize mt-2 w-full border border-gray-300 rounded px-4 py-2 outline-none focus:border-red-300'
                        >
                            {topics.map((topic, i) => (
                                <option key={i} value={topic.name}>{topic.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex gap-5 mt-2">
                        <button 
                            onClick={() => router.push('/')}
                            className='transition-colors bg-white hover:bg-gray-100 text-center rounded text-gray-500 hover:text-gray-400 text-sm font-medium p-2 w-full outline-none border-2'>
                            Discard
                        </button>
                        <button
                            onClick={handlePost}
                            className='flex items-center justify-center gap-4 transition-colors bg-[#FE8088] hover:bg-red-400 text-center rounded text-white text-sm font-medium p-2 w-full outline-none'>
                            Post {savingPost && <FaSpinner className='animate-spin' />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Upload.getLayout = (page: ReactElement) => {
    return (
        <>
            <Head>
                <title>Upload</title>
            </Head>
            <div className='overflow-hidden h-[100vh]'>
                <Navbar />
                {page}

            </div>
        </>
    )
}

export default Upload

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            session
        }
    }
}