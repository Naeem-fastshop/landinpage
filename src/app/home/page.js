// 'use client'    if use then it will still fetch but will be in client side normally , agr ssr b use kro tu
import React, { Suspense } from 'react';import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Footer from '../components/Footer'

const page = async() => {
  // if (typeof window === "undefined") {
  //   console.log("This is running on the server.");
  // } else {
  //   console.log("This is running on the client.");
  // }
  
  // SSR
  const res = await fetch('http://localhost:5000/getcourses');
  const responseText = await res.text();
  
  if (res.ok && responseText.trim().startsWith('{')) { // Basic check for JSON
    const data = JSON.parse(responseText);
    console.log(data);
  } else {
    console.log('Invalid JSON or empty response');
  }
  

  // ISR
  // const res = await fetch('http://localhost:5000/getcourses', {
  //   next: { revalidate: 60 },  // Revalidate every 60 seconds
  // });
  // const courses = await res.json();



  // SSG
  //  const res = await fetch('http://localhost:5000/getcourses', {
  //   next: { revalidate: false },  
  // });
  // const courses = await res.json();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Hero />
        <About courses={courses} />
        <Services />
        <Footer />
      </div>
    </Suspense>
  )
}

export default page
