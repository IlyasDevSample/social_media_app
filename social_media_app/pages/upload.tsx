import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import { NextPageWithLayout } from './_app'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { getSession, useSession } from 'next-auth/react'
import { client as sanityClient } from '../utils/sanityClient'
import { SanityAssetDocument } from '@sanity/client'

const Upload: NextPageWithLayout = () => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [videoFile, setVideoFile] = useState<SanityAssetDocument>()
    const [wrongFileType, setWrongFileType] = useState(false)

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
                console.log(data)
                setVideoFile(data)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
            })
            
        }else {
            setIsLoading(false)
            setWrongFileType(true)
        }
    }


    return (
        <div className='flex w-full h-full'>
            <div className="bg-white rounded-lg">
                <div>
                    <div>
                        <p className='text-2xl font-bold'>Upload Video</p>
                        <p className='text-sm text-gray-400 mt-1'>Post a video to your account</p>
                    </div>
                    <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100 transition-all'>
                        {isLoading ? (
                            <p>
                                Uploading video...
                            </p>
                        )
                            :
                            (
                                <div>
                                    {videoFile ? (
                                        <div className='flex flex-col items-center'>
                                            <video src={videoFile.url} loop controls className='rounded-xl h-[450px] mt-16 bg-black'></video>
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
            <Navbar />
            {page}
        </>
    )
}

export default Upload

export const getServerSideProps = async (context: any) => {
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