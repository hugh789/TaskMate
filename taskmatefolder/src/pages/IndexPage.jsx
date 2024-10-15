import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import 'preline'; // Assuming this is a CSS framework or similar

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
      <div className="text-center py- bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-800">Book certified help. Love your home.</h1>
      </div>

      {/* Search Bar */}
      <div className="mt-8 py-5">
        <form className="max-w-lg mx-auto">
          <div className="flex">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <button
              id="dropdown-button"
              data-dropdown-toggle="dropdown"
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
              type="button"
            >
              All categories
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Mockups
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Templates
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Design
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Logos
                  </button>
                </li>
              </ul>
            </div>
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Preline Carousel */}
      <div className="w-full bg-white rounded-lg shadow-md dark:bg-neutral-800">
        <div data-hs-carousel='{
            "loadingClasses": "opacity-0",
            "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"
          }' 
          data-hs-carousel-options='{
            "interval": 5000, 
            "autoplay": true
          }'
          className="relative">
          
          <div className="hs-carousel relative overflow-hidden w-full min-h-64 rounded-lg">
            <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
              
              {/* First Slide */}
              <div className="hs-carousel-slide flex justify-center items-center">
                <img src="https://images.ctfassets.net/vwt5n1ljn95x/1yzzyx2EqAdFjES7LImaEa/cb848bba9d6af5474b1b7c3309539824/Homepage_Moving.png?w=1200&q=75&fm=webp" 
                     alt="First slide image" 
                     className="object-cover w-[950px] h-[491px] rounded-lg" />
              </div>
              
              {/* Second Slide */}
              <div className="hs-carousel-slide flex justify-center items-center">
                <img src="https://images.ctfassets.net/vwt5n1ljn95x/3jKP7rZEeOMh285VMG9zVJ/13156819447cd03822bf9fb32d213a16/Homepage_Cleaning.png?w=1200&q=75&fm=webp" 
                     alt="Second slide image" 
                     className="object-cover w-[950px] h-[491px] rounded-lg" />
              </div>
              
              {/* Third Slide */}
              <div className="hs-carousel-slide flex justify-center items-center">
                <img src="https://images.ctfassets.net/vwt5n1ljn95x/2nfa2ouVwN7lG7FREVwmB0/ae3f6acd5b31680e9d998a24c1da851e/HomeRepair_3_950x491.jpg?w=1200&q=75&fm=webp" 
                     alt="Third slide image" 
                     className="object-cover w-[950px] h-[491px] rounded-lg" />
              </div>
              
            </div>
          </div>

          {/* Carousel Controls */}
          <button type="button" className="hs-carousel-prev absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-s-lg">
            <span className="text-2xl" aria-hidden="true">
              <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18L9 12l6-6"></path>
              </svg>
            </span>
            <span className="sr-only">Previous</span>
          </button>
          <button type="button" className="hs-carousel-next absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-gray-800 hover:bg-gray-800/10 focus:outline-none rounded-e-lg">
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
      <div className="mb-8"> 
        <h2 className="text-2xl font-bold mb-4 py-2">Categories</h2> 
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : errorCategories ? (
          <p className="text-red-500">{errorCategories}</p> 
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> 
            {categories.map((category) => (
              <Link 
                key={category._id} 
                to={`/category/${category._id}`} 
                className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-600 transition-all duration-200 ease-in-out cursor-pointer" 
              >
                <p className="font-semibold">{category.name}</p> 
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Display Services */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 py16">Services</h2>
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3"> {/* Adjusted grid for responsiveness */}
          {loadingServices ? (
            <p>Loading services...</p>
          ) : errorServices ? (
            <p className="text-red-500">{errorServices}</p>
          ) : (
            services.map((service) => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
}
