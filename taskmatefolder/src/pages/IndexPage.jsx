import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorServices, setErrorServices] = useState(null);
  const [errorCategories, setErrorCategories] =useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch services
  useEffect(() => {
    axios.get('http://localhost:4000/api/service/all')
      .then(response => {
        setServices(response.data);
        setLoadingServices(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setErrorServices('Error fetching services');
        setLoadingServices(false);
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    axios.get('http://localhost:4000/api/category/all')
      .then(response => {
        setCategories(response.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setErrorCategories('Error fetching categories');
        setLoadingCategories(false);
      });
  }, []);

  return (
    <>
      {/* Hero Image */}
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mt-8">
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
                placeholder="Search Mockups, Logos, Design Templates..."
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

        {/* Display Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          {loadingCategories ? (
            <p>Loading categories...</p>
          ) : errorCategories ? (
            <p className="text-red-500">{errorCategories}</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category._id}
                    to={`/category/${category._id}`}  // Make the category clickable
                    className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-center hover:bg-blue-600 transition-all duration-200 ease-in-out cursor-pointer"
                  >
                    <p className="font-semibold">{category.name}</p>
                  </Link>
                ))
              ) : (
                <p>No categories available at the moment.</p>
              )}
            </div>
          )}
        </div>

        {/* Display Services */}
        <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {loadingServices ? (
            <p>Loading services...</p>
          ) : errorServices ? (
            <p className="text-red-500">{errorServices}</p>
          ) : services.length > 0 ? (
            services.map((service) => (
              <Link to={`/service/${service._id}`} key={service._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {service.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
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
          ) : (
            <p>No services available at the moment.</p>
          )}
        </div>
      </div>
    </>
  );
}
