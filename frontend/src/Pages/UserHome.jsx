import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import AuthenticationServices from "../Services/AuthenticationServices";
import SalonL from "../Assets/SalonL.jpg";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Typography from "@mui/material/Typography";

const UserHome = () => {
  const navigate = useNavigate();
  const [salonList, setSalonList] = useState([]);

  useEffect(() => {
    AuthenticationServices.GetAllSalons().then((res) => {
      if (res.data.code == "00") {
        setSalonList(res.data.content);
        console(res.data.content);
      }
    });
  }, []);

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
    <div className="bg-white">
      <Header />
      <div className="flex flex-col items-center justify-center h-full text-gray-800 bg-white">
        {/* <h1 className="text-4xl font-bold text-blue-600">Salon List in Here</h1> */}
        {salonList.map((salon) => (
          <div key={salon.salonID}>
            {/* Card */}
            <div className="">
              <div className="w-screen h-full m-2 shadow-xl md:m-4 md:w-full md:h-60 card lg:card-side bg-slate-200">
                <div className="flex items-start justify-start bg-blue-600 rounded-r-none rounded-2xl">
                  <figure>
                    <img
                      className="hidden pl-4 h-60 md:block"
                      alt=""
                      src={SalonL}
                    />
                  </figure>
                </div>
                <div className="pl-14 card-body w-96">
                  <h2 className="text-3xl font-bold text-blue-600 card-title">
                    {salon.name}
                  </h2>
                  <p className="text-2xl text-purple-600">{salon.type}</p>
                  <p className="text-sm">{salon.district}</p>
                  <p>{salon.contactNum}</p>
                  <div className="flex flex-col md:gap-20 md:flex-row">
                    <div className="flex items-center">
                      <StyledRating
                        name="customized-color"
                        defaultValue={2}
                        getLabelText={(value) =>
                          `${value} Heart${value !== 1 ? "s" : ""}`
                        }
                        precision={0.5}
                        icon={<FavoriteIcon fontSize="inherit" />}
                        emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                      />
                    </div>
                    <div className="justify-end card-actions">
                      <button className="px-8 bg-blue-600 border-none btn btn-primary hover:bg-blue-700">
                        View Salon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <h2>{salon.name}</h2>
            <p>{salon.district}</p> */}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default UserHome;
