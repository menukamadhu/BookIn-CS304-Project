import React from "react";
import { Link } from "react-router-dom";
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

const Photos = () => {
  // Tabs
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2196f3",
      },
    },
  });

  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Header />
      <div className="bg-white hfull md:h-screen">
        <div className="flex flex-col py-4 bg-blue-800">
          <h1 className="flex items-center justify-center text-4xl font-bold text-white md:text-6xl">
            Salon Name
          </h1>
          <div className="flex flex-col gap-2 pt-4 pl-8 text-sm text-white md:justify-between md:flex-row md:text-lg md:px-72">
            <h1 className="">emailaddress@gmail.com</h1>
            <h1>District</h1>
            <h1>Mobile Number</h1>
            <h1>Type</h1>
          </div>
        </div>
        <div>
          <div className="relative flex flex-row items-center justify-center">
            <div className="">
              <Tabs>
                <Link to="/BookingPage">
                  <Tab
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                    value="one"
                    label="Packages"
                  />
                </Link>
                <Link to="/Photos">
                  <Tab
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                    value="two"
                    label="Photos"
                  />
                </Link>
                <Link to="/ReviewsC">
                  <Tab
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="primary tabs example"
                    value="three"
                    label="Reviews"
                  />
                </Link>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Photos;
