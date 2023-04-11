import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import AuthenticationServices from "../Services/AuthenticationServices";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const Packages = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState();
  const [salonId, setSalonId] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("loggedUser");
    const parseData = JSON.parse(dataFromLocalStorage);
    const userIdFromData = parseData?.userId;
    setSalonId(userIdFromData);
    console.log(salonId);
  }, []);

  useEffect(() => {
    async function fetchPackages() {
      const res = await AuthenticationServices.GetPackagesBySalon(salonId);
      if (res.data.status == 1) {
        console.log("Hello");
        setPackageDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (salonId) {
      fetchPackages();
    }
  }, [salonId]);

  // Rating
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center h-full text-gray-800 bg-white">
        <h1 className="text-4xl font-bold text-blue-600">
          Package List in Here
        </h1>
        {packageDetails.map((packages) => (
          <div key={packages.packageId}>
            <h1>{packages.packageName}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
