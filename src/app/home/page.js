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




==============
Why not React Query
So, in short: If you're fine with the default behavior of Next.js for SSR/SSG/ISR and don’t need advanced features like client-side caching, refetching, or offline handling, you don’t need React Query. However, if you do need those features, React Query is an excellent choice to improve your data-fetching workflow.

Yes, exactly! React Query is primarily designed for **client-side data fetching** and **caching**, offering several powerful features that go beyond what Next.js provides out of the box for SSR, SSG, and ISR. Here’s how React Query handles things that Next.js does not focus on directly:

### 1. **Client-Side Caching**
   React Query automatically caches the data you fetch on the client side. This means if you fetch the same data multiple times (even across different pages or components), React Query will store the data in memory and serve it from the cache, **preventing redundant API calls**. This is a huge performance boost, especially for data that doesn’t change often.

   - **Example**: If you navigate between pages and both pages require the same data (e.g., a list of posts), React Query will only fetch the data the first time it’s needed, and after that, it will retrieve it from the cache instead of hitting the API again.

### 2. **Background Refetching**
   React Query supports **background refetching**. Even if you’ve already fetched the data once, React Query can refetch it in the background while still using the cached version to display to the user. This ensures that the data on the UI stays **up-to-date** with the server, without needing to manually trigger a refetch.

   - **Example**: If you’re viewing a list of items and the server updates the data, React Query can automatically fetch the latest data in the background and update the UI with the new data without the user needing to refresh the page.

### 3. **Automatic and Manual Refetching**
   React Query allows you to set up automatic refetching at certain intervals or trigger manual refetching through UI interactions or other events. This gives you full control over how and when your data should be refetched.

   - **Example**: You can set a data refetch to happen every 30 seconds to make sure your app displays the most recent data, or you can manually trigger a refetch when the user clicks a "Refresh" button.

### 4. **Offline Handling**
   React Query provides built-in **offline support**, meaning it can continue to work even when the user loses network connectivity. It stores data in an **offline cache** and will automatically synchronize the data with the server once the user is back online.

   - **Example**: If a user adds a new item to a list while offline, React Query will store that change locally and automatically send it to the server as soon as the device is back online.

### 5. **Optimistic Updates**
   React Query can handle **optimistic updates**, which means you can immediately update the UI while an action is in progress, even before the server confirms the change. This can make the app feel more responsive.

   - **Example**: When submitting a form or creating a new item, React Query allows you to immediately update the UI as if the API call succeeded, then correct it if the API call fails later.

### 6. **Polling**
   React Query supports **polling**, where you can automatically refetch data at regular intervals (e.g., every few seconds or minutes), making it ideal for real-time applications.

   - **Example**: You can set up polling for a chat app to update the message list every 10 seconds or for a stock price tracking app to get the latest price every minute.

### 7. **Pagination & Infinite Queries**
   React Query provides tools for managing **pagination** and **infinite scrolling**, making it easy to fetch and cache paginated or infinite data efficiently.

   - **Example**: For a list of items that’s too long to load all at once, React Query supports fetching the next page of data as the user scrolls down, while caching the previous pages for quicker access.

---

### Next.js vs React Query for Caching

- **Next.js**: It focuses on server-side data fetching and static generation, providing caching mechanisms at the **server** or **build time** (for SSG or ISR). However, it does not manage client-side cache after the initial page load. So, if a user navigates to the same page again, Next.js won't automatically fetch the data unless it’s re-rendered or refreshed.

- **React Query**: On the other hand, is more **client-side** focused. It provides caching, automatic refetching, offline support, and other features directly in the browser, enabling your app to be more dynamic, responsive, and resilient to network issues.

### Conclusion

In short, **React Query** is mainly a **client-side caching** and **data management** library that provides a lot of functionality for optimizing the user experience with data fetching. It works **well alongside Next.js** to handle scenarios that Next.js itself doesn’t focus on, such as caching, background updates, and offline support.

If you just need **SSR**, **SSG**, or **ISR** for data fetching with **static content** or server-rendered pages, Next.js will suffice. But if you need **advanced client-side features** like caching, offline support, or refetching, React Query is a great addition to your Next.js application.


*/ 