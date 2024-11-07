'use client'
import React, { useEffect, useState } from 'react';

const Services = () => {
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch data for services (or courses)
    const fetchData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts');
      const data = await res.json();
      setCourses(data); // Set the fetched data to the state
      setLoading(false); // Update loading state
    };

    fetchData(); // Call the fetch function on component mount
  }, []); // Empty dependency array to run only once when the component mounts

  if (loading) {
    return <div>Loading...</div>; // Show loading text until data is fetched
  }

  return (
    <div className="w-full bg-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-black mb-8">Our Services</h2>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses && courses.map((course, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="mb-4 text-4xl text-orange-600">
                {/* Icon (replace with your own icon or dynamic icon if needed) */}
                <i className="fas fa-cogs"></i>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black">{course.title}</h3>
              <p className="text-gray-700">{course.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
