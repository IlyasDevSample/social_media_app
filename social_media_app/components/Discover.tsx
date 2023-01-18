import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { topics } from "../utils/constants";

const Discover = () => {
    const router = useRouter()
    const {topics: activeTopic} = router.query

    const activeTopicStyle = 'xl:border-2 hover:bg-primary xl:border-[#FE8088] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#FE8088]'
    const inactiveTopicStyle = 'text-gray-500 xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer'

    return (
        <div className='xl:border-b-2 xl:border-gray-200 pb-6 xl:mx-2'>
            <p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>
                Popular Topics
            </p>
            <div className='flex gap-3 flex-wrap justify-center xl:justify-start'>
                {topics.map((topic) => (
                    <Link href={`/?topics=${topic.name.toLowerCase()}`} key={topic.name}>
                        <div className={activeTopic == topic.name.toLowerCase() ? activeTopicStyle : inactiveTopicStyle}>
                            <span className='font-bold text-2xl xl:text-xl'>
                                {topic.icon}
                            </span>
                            <span className='font-medium text-sm hidden xl:block capitalize'>
                                {topic.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Discover