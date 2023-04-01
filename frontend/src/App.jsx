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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
