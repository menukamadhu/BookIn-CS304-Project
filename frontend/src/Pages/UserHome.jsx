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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const UserHome = () => {
  const navigate = useNavigate();
  const [salonList, setSalonList] = useState([]);

  useEffect(() => {
    AuthenticationServices.GetAllSalons().then((res) => {
      if (res.data.code == "00") {
        setSalonList(res.data.content);
      }
      console.log("aaa salon list", salonList);
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

  // console("aaa salon list", salonList);

  return (
    <div className="bg-white">
      <Header />
      <div className="grid items-center justify-center grid-cols-1 text-gray-800 bg-white md:px-52 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {salonList?.map((salon) => (
          <div key={salon.salonID}>
            <div className="flex p-4 duration-300 md:hover:scale-110">
              <Card sx={{ maxWidth: 280 }}>
                <div>
                  <img src={SalonL} alt="" />
                </div>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {salon.name}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    {salon.type}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    {salon.district}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {salon.contactNum}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {salon.email}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Link to="/BookingPage" state: { message: "Hello" }>
                    <Button size="small">View</Button>
                  </Link> */}
                  <Link to="/BookingPage" state={{ myProp: salon.salonID }}>
                    <Button size="small">View</Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default UserHome;
