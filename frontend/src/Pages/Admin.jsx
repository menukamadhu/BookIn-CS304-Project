import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import AdminTabPanel from "../Components/AdminTabPanel";

const Admin = () => {
  return (
    <div className="w-screen bg-white">
      <Header />
      <div>
        <h1 className="flex items-center justify-center pb-4 text-5xl font-bold text-blue-600 md:text-6xl">
          Admin Dashboard
        </h1>
        <div className="md:px-72">
          <AdminTabPanel />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
