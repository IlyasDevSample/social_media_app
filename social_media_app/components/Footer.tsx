import React from 'react'
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const List = ({ items, mt }: { items: string[], mt: boolean }) => {
    console.log(mt)
    return (
        <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
            {items.map((item, i) => (
                <p key={i} className='text-gray-400 text-sm hover:underline cursor-pointer'>{item}</p>
            ))}
        </div>
    )
}

const Footer = () => {
    return (
        <div className='mt-6 mx-2 hidden xl:block'>
            <List items={footerList1} mt={false} />
            <List items={footerList2} mt/>
            <List items={footerList3} mt/>
            <p className='text-gray-400 text-xs mt-5'>© 2023 Tiki Taka</p>
        </div>
    )
}

export default Footer