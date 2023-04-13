import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ListIcon from "@mui/icons-material/List";
import { blue, red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthenticationServices from "../Services/AuthenticationServices";
import TabPanel from "../Components/TabPanel";

const BookingPage = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const myPropValue = location.state?.myProp;
  const [salonDetials, setSalonDetails] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    async function fetchSalonDetails() {
      setLoading(true);
      try {
        const response = await AuthenticationServices.GetSalonDetails(
          myPropValue
        );
        if (response.data.code == "00") {
          setSalonDetails(response.data.content);
          // console.log(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    if (myPropValue) {
      fetchSalonDetails();
    }
  }, [myPropValue]);

  // Navigation
  const onNavigatePackages = () => {
    navigate("/BookingPage");
  };
  const onNavigatePhotos = () => {
    navigate("/Photos");
  };
  const onNavigateReviews = () => {
    navigate("/ReviewsC");
  };

  return (
    <div>
      <Header />
      <div className="h-full bg-white">
        <div className="flex flex-col py-4 bg-blue-800">
          <h1 className="flex items-center justify-center text-4xl font-bold text-white md:text-6xl">
            {salonDetials?.name}
          </h1>
          <div className="flex flex-col gap-2 pt-4 pl-8 text-sm text-white md:justify-between md:flex-row md:text-lg md:px-72">
            <h1 className="">{salonDetials?.email}</h1>
            <h1>{salonDetials?.district}</h1>
            <h1>{salonDetials?.contactNum}</h1>
            <h1>{salonDetials?.type}</h1>
          </div>
        </div>
        <div>
          <div className="relative flex flex-row items-center justify-center">
            <div className="">
              <TabPanel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
