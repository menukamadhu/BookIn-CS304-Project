import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoggedUserNav from "./LoggedUserNav";
import Nav from "./Nav";

const Header = () => {
  // check user is logged
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    let logged = localStorage.getItem("loggedUser");
    if (logged) {
      const user1 = JSON.parse(logged);
      setUser(user1);
    }
  }, [localStorage.getItem("loggedUser")]);
  return <div>{user ? <LoggedUserNav setUser={setUser} /> : <Nav />}</div>;
};

export default Header;
