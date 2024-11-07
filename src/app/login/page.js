'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
const page = () => {
  const router = useRouter();
  const [email,setEmail]= useState('');
  const [password,setPassword] = useState('');

  const formSubmit = async(e) => {
    e.preventDefault();

    if(!email || !password){
      alert('All fields are required');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/login',{
        method:'POST',

        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({email,password})
      });
      
      if(response.ok){
        const data = await response.json();
        console.log('login success', data.token);
        localStorage.setItem('token',data.token);
        router.push('/home')
      }else{
        const errorData = await response.json();
        console.log('error while login', errorData.message);
      }

    } catch (error) {
      console.log('Error while login ', error); 
    }
    



  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white space-y-6 shadow-lg rounded-lg'>
        <h2 className='text-1xl font-semibold text-gray-500'>Login Page Freezer</h2>
      <form className='space-y-4 text-black' onSubmit={formSubmit}>
        <div>
          <label className='block text-gray-500 mb-2'>Email:</label>
          <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email' className='border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-200'/>
        </div>
        <div>
          <label className='block text-gray-500 mb-2'>Password:</label>
          <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' className='border w-full p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-200'/>
        </div>
        <button className='p-2 text-white rounded w-[20%] bg-orange-800'>Login</button>
      </form>
      </div>
    </div>
  )
}

export default page
