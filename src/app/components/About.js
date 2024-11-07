import Image from 'next/image';
import React from 'react';

const About = ({ courses }) => {
  
  // Loading state if courses data is not available yet
  if (!courses || courses.length === 0) {
    return <p className="text-black">Loading courses...</p>;
  }

  return (
    <div className="w-full min-[100vh]: p-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between bg-[#F8DB7A]">
        {/* Right Section - Image (Appears first on mobile) */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:order-1 order-2">
          <Image
            src="/hero.webp"   // Replace with your actual image path inside the public folder
            alt="About Us"
            width={500}         // Set the desired width
            height={300}        // Set the desired height
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Left Section - Text and Button */}
        <div className="w-full md:w-1/2 text-center md:text-left md:order-2 order-1">
          <h2 className="text-4xl font-bold text-black mb-4">About Us</h2>
          <p className="text-gray-700 text-lg mb-4">
            We are a creative web agency passionate about delivering high-quality web solutions. Our team is dedicated to providing the best user experiences through innovative designs and cutting-edge technology. Whether you need a website, mobile app, or branding, we are here to help you achieve your business goals.
          </p>
          <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* Displaying Courses Data */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Available Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mapping over courses array */}
          {courses.map((course) => (
            <div key={course.id} className="p-6 bg-white rounded-lg shadow-lg">
              <h4 className="text-xl font-semibold mb-2 text-black">{course.title}</h4>
              <p className="text-gray-600">{course.body}</p>
              <p className="text-gray-500 mt-2">Instructor: Bilal {course.userId}</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
