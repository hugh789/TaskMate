import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header /> {/* Make sure Header has full width */}
      <main className="flex flex-col items-center px-4 w-full mx-auto">
        {/* Add top padding for content */}
        <div className="w-full max-w-screen-xl mx-auto py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
