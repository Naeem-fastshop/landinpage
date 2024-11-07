'use client'
import Image from 'next/image'
import React from 'react'
import Button from './Button'
const Hero = () => {
  return (
    <div className='w-full md:h-[calc(80vh-60px)] bg-white p-4 flex'>
      <div className='container mx-auto md:flex justify-between items-center text-black'>
        <div className='md:w-[50%]'>
          <div className='bg-red'>
            <p className='text-5xl font-semibold'>Unleash Your Online Potencial with Our Creative Web Agency</p>
            <p>This  is some thing about web We recommend starting a new Next.js app using create-next-app, which sets up everything automatically for you. To create a project, run.</p>
            <Button label="Read More"/>
          </div>
        </div>
        <div className='md:w-[50%] flex md:justify-end sm:mt-8'>
          <Image src={'/hero.webp'} alt='Hero Image' width={500} height={300} className='rounded-lg'/>
        </div>
      </div>
    </div>
  )
}

export default Hero
