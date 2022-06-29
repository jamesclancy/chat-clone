import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
   <>
   <div className='xl:flex xl:flex-row'>
   <div className='xl:w-48 flex'>
    Left Bar
   </div>
   <div className='flex flex-grow'>
    Main Content
   </div>
   <div className='xl:w-48 '>
    Right Bar
   </div>
   </div>
   </>
  )
}

export default Home
