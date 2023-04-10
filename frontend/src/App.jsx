import "./App.css";
import Nav from "./Components/Nav";
import Landingpage from "./Pages/Landingpage";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import SalonRegister from "./Pages/SalonRegister";
import ClientRegister from "./Pages/ClientRegister";
import RegisterModal from "./Components/RegisterModal";
import {
  BrowserRouter,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import SalonProfile from "./Pages/SalonProfile";
import UserHome from "./Pages/UserHome";
import Header from "./Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileS from "./Pages/ProfileS";
import ProfileC from "./Pages/ProfileC";
import Appoinment from "./Pages/Salon/Appoinment";
import Reviews from "./Pages/Salon/Reviews";
import Completed from "./Pages/Salon/Completed";
import Uploads from "./Pages/Salon/Uploads";
import WorkDays from "./Pages/Salon/WorkDays";
import WorkHours from "./Pages/Salon/WorkHours";
import BookingPage from "./Pages/BookingPage";
import Photos from "./Pages/Photos";
import ReviewsC from "./Pages/ReviewsC";

function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={1}
      />
      {/* Same as */}
      {/* <ToastContainer /> */}

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SalonRegister" element={<SalonRegister />} />
          <Route path="/ClientRegister" element={<ClientRegister />} />
          <Route path="/SalonProfile" element={<SalonProfile />} />
          <Route path="/UserHome" element={<UserHome />} />
          <Route path="/ProfileS" element={<ProfileS />} />
          <Route path="/ProfileC" element={<ProfileC />} />
          <Route path="/Appoinment" element={<Appoinment />} />
          <Route path="/Completed" element={<Completed />} />
          <Route path="/Reviews" element={<Reviews />} />
          <Route path="/Uploads" element={<Uploads />} />
          <Route path="/WorkDays" element={<WorkDays />} />
          <Route path="/WorkHours" element={<WorkHours />} />
          <Route path="/BookingPage" element={<BookingPage />} />
          <Route path="/Photos" element={<Photos />} />
          <Route path="/ReviewsC" element={<ReviewsC />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
