import { getByRole } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../Assets/Logo.png";
import AuthenticationServices from "../Services/AuthenticationServices";
import { Avatar } from "@mui/material";
import { blue } from "@mui/material/colors";

function LoggedUserNav({ setUser }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("loggedUser");
    setUser();
    navigate("/");
  };
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("loggedUser");
    const parseData = JSON.parse(dataFromLocalStorage);
    const roleFromData = parseData?.role;
    const emailFromData = parseData?.email;
    setRole(roleFromData);
    setEmail(emailFromData);
  }, []);
  const onNavigate = () => {
    if (role == "Salon") {
      navigate("/ProfileS");
    } else if (role == "Admin") {
      navigate("/Admin");
    } else {
      navigate("/ProfileC");
    }
  };

  const onNavigateDash = () => {
    if (role == "Salon") {
      navigate("/SalonProfile");
    } else if (role == "Admin") {
      navigate("/Admin");
    } else {
      navigate("/MyBookings");
    }
  };

  const onLink = () => {
    if (role == "Salon") {
      navigate("/SalonProfile");
    } else if (role == "Admin") {
      navigate("/Admin");
    } else {
      navigate("/UserHome");
    }
  };
  return (
    <div
      className={`md:w-100% bg-slate-100 w-screen ${
        isSticky ? "fixed top-0 left-0 z-50" : ""
      }`}>
      <div className="items-center justify-between py-2 md:flex md:px-72 px-7">
        <div className="flex items-center justify-center cursor-pointer">
          <span className="">
            <a onClick={onLink}>
              <img className="h-24" src={Logo} alt="" />
            </a>
          </span>
        </div>
        <div className="flex flex-row items-center justify-center gap-8 p-4">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border-2 border-gray-300 rounded-3xl input input-bordered "
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div>
                <Avatar
                  sx={{ bgcolor: blue[600] }}
                  alt={email}
                  src="/static/images/avatar/1.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 text-gray-800 bg-white shadow menu menu-compact dropdown-content rounded-box w-52">
              <li>
                <a onClick={onNavigateDash}>User Dashboard</a>
              </li>
              <li>
                <a className="justify-between" onClick={onNavigate}>
                  My account
                  {/* <span className="badge">New</span> */}
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedUserNav;
