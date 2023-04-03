import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import AuthenticationServices from "../Services/AuthenticationServices";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import ProfilePic from "../Assets/Profile.png";
import WcIcon from "@mui/icons-material/Wc";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import { blue } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import UploadProfilePic from "../Components/UploadProfilePic";
import Footer from "../Components/Footer";

const ProfileS = () => {
  const [user, SetUser] = useState();
  const [salonId, setSalonId] = useState("");
  const [salonDetials, setSalonDetails] = useState(null);
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
    async function fetchSalonDetails() {
      setLoading(true);
      try {
        const response = await AuthenticationServices.GetSalonDetails(salonId);
        if (response.data.code == "00") {
          setSalonDetails(response.data.content);
          console.log(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    if (salonId) {
      fetchSalonDetails();
    }
  }, [salonId]);

  //  Edit Profile
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Upload Prfile Pic
  const [openUp, setOpenUp] = React.useState(false);

  const handleClickOpenUp = () => {
    setOpenUp(true);
  };

  const handleCloseUp = () => {
    setOpenUp(false);
  };

  return (
    <div>
      <Header />
      <div className="bg-white md:pt-10">
        <h1 className="flex items-center justify-center text-5xl font-bold text-blue-600 md:text-6xl">
          My Account
        </h1>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : salonDetials ? (
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col">
                <div className="relative flex items-center justify-center">
                  <img src={ProfilePic} alt="" className="w-1/2" />
                </div>
                <div className="flex items-center justify-center">
                  <h1 className="text-4xl font-bold text-gray-800 md:text-7xl">
                    {salonDetials.name}
                  </h1>
                </div>
              </div>
              <div className="flex flex-col w-full pt-10 md:pr-24">
                <div className="items-start justify-start p-4 md:py-10 md:pr-40">
                  <ul className="w-full p-10 text-black bg-white shadow-md md:py-10 md:p-0 md:px-40 rounded-box">
                    <li className="py-3">
                      <div className="flex flex-row gap-8">
                        <Avatar sx={{ bgcolor: blue[600] }}>
                          <CallIcon />
                        </Avatar>
                        <li>
                          <a className="text-xl text-gray-700 md:text-2xl">
                            {salonDetials.contactNum}
                          </a>
                        </li>
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex flex-row gap-8">
                        <Avatar sx={{ bgcolor: blue[600] }}>
                          <WcIcon />
                        </Avatar>
                        <li>
                          <a className="text-xl text-gray-700 md:text-2xl">
                            {salonDetials.type}
                          </a>
                        </li>
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex flex-row gap-8">
                        <Avatar sx={{ bgcolor: blue[600] }}>
                          <EmailIcon />
                        </Avatar>
                        <li>
                          <a className="text-xl text-gray-700 md:text-2xl">
                            {salonDetials.email}
                          </a>
                        </li>
                      </div>
                    </li>
                    <li className="py-3">
                      <div className="flex flex-row gap-8">
                        <Avatar sx={{ bgcolor: blue[600] }}>
                          <PlaceIcon />
                        </Avatar>
                        <li>
                          <a className="text-xl text-gray-700 md:text-2xl">
                            {salonDetials.district}
                          </a>
                        </li>
                      </div>
                    </li>
                  </ul>
                </div>
                {/* Dialog */}
                <div className="flex flex-col items-center justify-center gap-4 p-10 md:justify-between md:flex-row md:pt-14">
                  <button
                    onClick={handleClickOpen}
                    className="px-20 bg-blue-600 md:ml-20 btn btn-accent hover:bg-blue-700"
                    type="submit">
                    Edit Profile
                  </button>
                  <button
                    className="px-16 bg-red-600 md:mr-56 btn btn-accent hover:bg-red-700"
                    type="submit">
                    Delete Account
                  </button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title">
                    <DialogTitle id="responsive-dialog-title">
                      {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Let Google help apps determine location. This means
                        sending anonymous location data to Google, even when no
                        apps are running.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Disagree
                      </Button>
                      <Button onClick={handleClose} autoFocus>
                        Agree
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            </div>
          ) : (
            <p>No salon details found.</p>
          )}
        </div>
      </div>
      <UploadProfilePic onClose={handleCloseUp} openUp={openUp} />
      <Footer />
    </div>
  );
};

export default ProfileS;
