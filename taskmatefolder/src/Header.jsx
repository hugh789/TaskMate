import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext.jsx";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <header className="w-full bg-white shadow-md px-6 py-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        
        {/* Left side: Logo and navigation links */}
        <div className="flex items-center gap-6">
          <Link to={'/'} className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 -rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
            <span className="font-bold text-xl">TaskMate</span>
          </Link>

          <nav className="flex items-center gap-4">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium">Find Service</Link>
            <Link to="/find-task" className="text-gray-700 hover:text-primary font-medium">Find Task</Link>
          </nav>
        </div>

        {/* Right side: Search and profile */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="flex items-center bg-primary text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          <Link to={user ? '/account' : '/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4">
            <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 relative top-1"
              >
                <path
                  fillRule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {!!user && (
              <span className="text-gray-700 font-medium">{user.name}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
