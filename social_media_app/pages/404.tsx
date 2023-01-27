import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

const NotFound: NextPage = () => {
    return (
        <div>
            <h1
                className='text-4xl font-bold text-center mt-20 text-gray-500' >
                404 - The page cannot be found :(
            </h1>

            <p className='text-center text-gray-500 mt-5' >
            
                Sorry, there is nothing here.
            </p>

            <p className='text-center text-gray-500 mt-5'>
                <Link
                    href='/'
                    className='text-red-500 hover:underline
                    cursor-pointer transition duration-200 ease-in-out '
                >
                    Go back home
                </Link>
            </p>


        </div>
    )
}

export default NotFound