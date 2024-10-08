import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import ProfilePage from "./pages/ProfilePage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import AddServicePage from "./pages/AddServicePage.jsx"; 
import RequestService from './pages/RequestService.jsx';
import MyTasksPage from "./pages/MyTasksPage.jsx";
import FindTask from "./pages/FindTask.jsx";
import Reviews from "./pages/Reviews.jsx";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/new" element={<AddServicePage />} />
          <Route path="/account/tasks" element={<MyTasksPage />} />
          <Route path="/request-service" element={<RequestService />} />
          <Route path="/find-task" element={<FindTask />} />
          <Route path="/review" element={<Reviews />} /> {/* Add the new route */}
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
