```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This will contain your Tailwind CSS imports
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/index.css
/*
@tailwind base;
@tailwind components;
@tailwind utilities;
*/
/*
  Note: For a real project, you would typically set up Tailwind CSS
  by running `npx tailwindcss init -p` and then adding the above
  three lines to your `src/index.css` file, and configuring `tailwind.config.js`
  to scan your React components for Tailwind classes.
  For this standalone output, assume Tailwind is correctly configured and
  its utility classes are available for use in the components below.
*/


// src/App.js
import React, { useState, useEffect } from 'react';
import CourseList from './components/CourseList';

function App() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/courses'); // Backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourses(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100">
        <p className="text-xl text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-extrabold tracking-tight">
            EduLearn Platform
          </h1>
          <nav>
            <ul className="flex space-x-6 text-lg">
              <li><a href="#" className="hover:text-blue-200 transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-blue-200 transition duration-300">Courses</a></li>
              <li><a href="#" className="hover:text-blue-200 transition duration-300">About</a></li>
              <li><a href="#" className="hover:text-blue-200 transition duration-300">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-8 py-12">
        <h2 className="text-5xl font-bold text-gray-800 mb-12 text-center">Our Popular Courses</h2>
        {courses.length > 0 ? (
          <CourseList courses={courses} />
        ) : (
          <p className="text-center text-gray-600 text-xl">No courses available at the moment.</p>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} EduLearn Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;


// src/components/CourseList.js
import React from 'react';
import CourseCard from './CourseCard';

const CourseList = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;


// src/components/CourseCard.js
import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
        <p className="text-gray-600 text-base mb-4 line-clamp-3">{course.description}</p>
        <div className="flex items-center text-gray-700 text-sm mb-5">
          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
          <span className="font-medium">Instructor: {course.instructor}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
```