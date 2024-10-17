import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'preline'; // CSS framework (Tailwind based, details in tailwind.config.js
import { getCategoryIcon } from '../utils/getCategoryIcon';

export default function IndexPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorServices, setErrorServices] = useState(null);
  const [errorCategories, setErrorCategories] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchServices = async () => { 
      try {
        const response = await axios.get('http://localhost:4000/api/service/all');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setErrorServices('Error fetching services');
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/category/all');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setErrorCategories('Error fetching categories'); 
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Tagline */}
      <div className="text-center py-10">
      <h2 className="text-[#414141] text-6xl md:text-7xl font-serif font-semibold leading-tight tracking-tight">Love where you live</h2>

        <p className="text-[#6b6b6b] text-xl md:text-2xl mt-4"> Certified experts for home repairs & maintenance</p>
      </div>

   {/* Search Bar */}
<div className="relative w-full max-w-3xl mx-auto z-10 -mb-8">
  <form className="bg-white rounded-full shadow-lg p-4 flex items-center space-x-4">
    <button
      id="dropdown-button"
      data-dropdown-toggle="dropdown"
      className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-l-full hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
      type="button"
    >
      <span className="mr-2">Suburb or address</span>
      <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>
    <div className="relative flex-1">
      <input
        type="search"
        id="search-dropdown"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 border-gray-300 rounded-none border-l-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded-full"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        required
      />
    </div>
    <button
      type="submit"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-r-full px-6 py-2.5"
    >
      Search
    </button>
  </form>
</div>

{/* Preline Carousel */}
<div className="w-full bg-white rounded-xl shadow-md dark:bg-neutral-800 mt-6 overflow-hidden relative z-0">
  <div 
    data-hs-carousel='{
      "loadingClasses": "opacity-0",
      "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"
    }' 
    data-hs-carousel-options='{
      "interval": 5000, 
      "autoplay": true
    }'
    className="relative w-full"
  >
    <div className="hs-carousel relative overflow-hidden w-full h-screen max-h-[400px]">
      <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
        
        {/* First Slide */}
        <div className="hs-carousel-slide flex justify-center items-center w-full">
          <img 
            src="https://images.ctfassets.net/vwt5n1ljn95x/1yzzyx2EqAdFjES7LImaEa/cb848bba9d6af5474b1b7c3309539824/Homepage_Moving.png?w=1200&q=75&fm=webp" 
            alt="First slide image" 
            className="object-cover w-full h-auto" 
          />
        </div>
        
        {/* Second Slide */}
        <div className="hs-carousel-slide flex justify-center items-center w-full">
          <img 
            src="https://images.ctfassets.net/vwt5n1ljn95x/3jKP7rZEeOMh285VMG9zVJ/13156819447cd03822bf9fb32d213a16/Homepage_Cleaning.png?w=1200&q=75&fm=webp" 
            alt="Second slide image" 
            className="object-cover w-full h-auto" 
          />
        </div>
        
        {/* Third Slide */}
        <div className="hs-carousel-slide flex justify-center items-center w-full">
          <img 
            src="https://images.ctfassets.net/vwt5n1ljn95x/2nfa2ouVwN7lG7FREVwmB0/ae3f6acd5b31680e9d998a24c1da851e/HomeRepair_3_950x491.jpg?w=1200&q=75&fm=webp" 
            alt="Third slide image" 
            className="object-cover w-full h-auto" 
          />
        </div>
        
      </div>
    </div>

    {/* Carousel Controls */}
    <button 
      type="button" 
      className="hs-carousel-prev absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-s-lg"
    >
      <span className="text-2xl" aria-hidden="true">
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18L9 12l6-6"></path>
        </svg>
      </span>
      <span className="sr-only">Previous</span>
    </button>
    <button 
      type="button" 
      className="hs-carousel-next absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-e-lg"
    >
      <span className="text-2xl" aria-hidden="true">
        <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"></path>
        </svg>
      </span>
      <span className="sr-only">Next</span>
    </button>

    {/* Carousel Pagination */}
    <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2"></div>
  </div>
</div>


{/* Display Categories */}
<div className="mb-8 w-full max-w-screen-lg mx-auto">
  <h2 className="text-2xl font-bold mb-4 py-2 text-left">Categories</h2>
  {loadingCategories ? (
    <p className="text-center">Loading categories...</p>
  ) : errorCategories ? (
    <p className="text-red-500 text-center">{errorCategories}</p>
  ) : (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link 
          key={category._id} 
          to={`/category/${category._id}`} 
          className="relative group cursor-pointer overflow-hidden bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl text-center"
        >
          <div className="relative z-10 mx-auto w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center mb-4">
            {/* Dynamically render icon */}
            <div className="w-10 h-10 text-white">
              {getCategoryIcon(category.name)}
            </div>
          </div>
          <div className="text-gray-900 font-semibold">{category.name}</div>
          <p className="text-gray-600 text-sm">Find the right person for {category.name}.</p>
        </Link>
      ))}
    </div>
  )}
</div>


{/* Display Services */}
<div className="mb-8 w-full max-w-screen-lg mx-auto"> {/* Centered and narrower */}
  <h2 className="text-2xl font-bold mb-4 py-2 text-left">Services</h2>
  {loadingServices ? (
    <p className="text-center">Loading services...</p>
  ) : errorServices ? (
    <p className="text-red-500 text-center">{errorServices}</p>
  ) : (
    <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3"> {/* Reduced to 3 columns on large screens */}
      {services.map((service) => (
        <Link to={`/service/${service._id}`} key={service._id} className="group"> {/* Added className for hover effects */}
          <div className="bg-gray-500 mb-2 rounded-2xl flex overflow-hidden"> {/* Added overflow-hidden */}
            {service.photos?.[0] && (
              <img
                className="rounded-2xl object-cover aspect-square w-full group-hover:scale-105 transition-transform duration-200" // Improved image responsiveness and hover effect
                src={service.photos?.[0]}
                alt=""
              />
            )}
          </div>
          <h2 className="font-bold">{service.title}</h2>
          <h3 className="text-sm text-gray-500">{service.description}</h3>
          <div className="mt-1">
            <span className="font-bold">${service.price}</span>
          </div>
        </Link>
      ))}
    </div>
  )}
</div>

    </>
  );
}
