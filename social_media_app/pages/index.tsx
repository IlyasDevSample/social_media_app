import React from 'react'
import axios from 'axios'
import { GetServerSideProps } from 'next'

const Home = () => {

    return (
        <div>
            <h1>ll</h1>
        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const response = await axios.get('http://localhost:3000/api/post')

    return {
        props: {
            // props for your component
            
        }
    }
}