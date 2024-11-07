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
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/?id='+1, {
      //  cache:'no-store'
    });
    const courses = await res.json();
    console.log("Courses fetched with SSR:", courses);

    // ISR - Incremental Static Regeneration (for 60 seconds revalidation)
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    //   next: { revalidate: 60 }, // Revalidate every 60 seconds
    //   cache:'no-store'
    // });
    // const courses = await res.json();
    
    // SSG - Static Site Generation (no revalidation, fetches only at build time)
    // const res = await fetch('https://jsonplaceholder.typicode.com/posts/?id='+1, {
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


/*

Note:

Explanation:
SSG (Static Site Generation):
When revalidate: false is set, it means the page will be generated once at build time and will not regenerate on subsequent requests. This is typical of SSG.
This setup fetches the data at build time, and once it's generated, it remains static, i.e., it doesn't update or regenerate until the next deployment.
SSR (Server-Side Rendering):
SSR generates the page on every request, meaning the page is re-rendered on the server each time it is accessed.
SSR is achieved by using cache: 'no-store' or not specifying revalidate, and it's often combined with getServerSideProps (in the /pages directory). In the App Directory, SSR is achieved by simply calling an async function inside a page that fetches data during the request.
What happens when you use revalidate: false?
When you set revalidate: false, it tells Next.js not to regenerate the page after build time. The page is statically generated during the build, similar to SSG.

Key takeaway: revalidate: false is essentially telling Next.js to do nothing with the cache after the initial build, which mimics SSG behavior.



To summarize:
revalidate: false → SSG behavior (static generation at build time, no revalidation).
revalidate: 60 (or any other positive number) → ISR (Incremental Static Regeneration, where the page regenerates after a set interval).
No revalidate and cache: 'no-store' → SSR (Server-Side Rendering, where the page is generated on each request).

*/ 