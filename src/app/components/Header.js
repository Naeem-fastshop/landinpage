'use client'
import Link from 'next/link'
import React, { useState } from 'react'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='w-full bg-white p-4 md:h-[60px] text-black shadow-lg'>
        <div className='container mx-auto flex justify-between'>
        <div>
            <h2 className='text-2xl'>Freezer <span className='text-orange-600'>App</span></h2>
        </div>
        <nav className='hidden md:block'>
            <ul className='flex gap-8'>
                <li className='hover:text-orange-800'><Link href={'/'}>Home</Link></li>
                <li><Link href={'/about'}>About</Link></li>
                <li><Link href={'/contact'}>Contact</Link></li>
                <li className='bg-black text-white rounded-[20px] hover:bg-orange-800 px-4 py-2 mt-[-5px]'><Link href={'/contact'}>Sign In</Link></li>
            </ul>
        </nav>
        <div className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
            <button className='text-black text-2xl'>{isOpen ? 'X' : '☰'}</button>
        </div>
        </div>

        {/* Mobile Nav with Animation */}
        <div className={`md:hidden ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'} transition-all duration-300 ease-in-out`}>
            {isOpen && (
                <nav>
                    <ul className='flex flex-col gap-8 p-4 bg-white'>
                        <li className='hover:text-orange-800'><Link href={'/'}>Home</Link></li>
                        <li><Link href={'/about'}>About</Link></li>
                        <li><Link href={'/contact'}>Contact</Link></li>
                        
                        
                    </ul>
                </nav>
            )}
        </div>
    </header>
  )
}

export default Header
