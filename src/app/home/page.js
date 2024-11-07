// 'use client'  // Indicate that this is a client component

import React, { Suspense } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Footer from '../components/Footer';

const page = async () => {
  // Conditional logging to check where the code is running (client or server)
  if (typeof window === "undefined") {
    console.log("This is running on the server.");
  } else {
    console.log("This is running on the client.");
  }

  // SSR - Server Side Rendering
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const courses = await res.json();
    console.log("Courses fetched with SSR:", courses);

    // ISR - Incremental Static Regeneration (for 60 seconds revalidation)
    // const res = await fetch('http://localhost:5000/getcourses', {
    //   next: { revalidate: 60 }, // Revalidate every 60 seconds
    // });
    // const courses = await res.json();
    
    // SSG - Static Site Generation (no revalidation, fetches only at build time)
    // const res = await fetch('http://localhost:5000/getcourses', {
    //   next: { revalidate: false },  // Don't revalidate on this page
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
    );

  } catch (error) {
    console.error("Error fetching courses:", error);
    return (
      <div>
        <h1>Error loading courses</h1>
      </div>
    );
  }
};

export default page;
