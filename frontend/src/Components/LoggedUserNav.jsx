import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../Assets/Logo.png";
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

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // perform other actions
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`w-full bg-slate-100 ${
        isSticky ? "fixed top-0 left-0 z-50" : ""
      }`}>
      <div className="items-center justify-between py-2 md:flex md:px-72 px-7">
        <div className="cursor-pointer">
          <span className="">
            <Link to="/">
              <a>
                <img className="h-24" src={Logo} alt="" />
              </a>
            </Link>
          </span>
        </div>
        <div className="flex flex-row gap-8">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border-2 border-gray-300 rounded-none input input-bordered"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 bg-white shadow menu menu-compact dropdown-content rounded-box w-52">
              <li>
                <a className="justify-between}" onClick={handleClick}>
                  Edit Profile
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
