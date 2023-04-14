import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationServices from "../../Services/AuthenticationServices";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ListIcon from "@mui/icons-material/List";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { blue, red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const Appoinment = () => {
  const navigate = useNavigate();
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

  // Responsive
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(open);
  }, [open]);

  // Navigation
  const onNavigateProfile = () => {
    navigate("/SalonProfile");
  };
  const onNavigateUploads = () => {
    navigate("/Uploads");
  };
  const onNavigateAppoinment = () => {
    navigate("/Appoinment");
  };
  const onNavigateCompleted = () => {
    navigate("/Completed");
  };
  const onNavigateReviews = () => {
    navigate("/Reviews");
  };
  const onNavigateWorkH = () => {
    navigate("/WorkHours");
  };
  const onNavigateWorkD = () => {
    navigate("/WorkDays");
  };

  // get all bookings
  const [bookingDetails, setBookingDetails] = useState("");
  useEffect(() => {
    async function fetchBookings() {
      const res = await AuthenticationServices.GetBookingBySalonId(salonId);
      if (res.data.status == 1) {
        console.log("Hello");
        setBookingDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (salonId) {
      fetchBookings();
    }
  }, [salonId]);
  console.log("aaaaaaaa booking", bookingDetails);

  // View Client
  const [openV, setOpenV] = useState(false);
  const [viewId, setViewId] = useState(0);

  const handleClickOpenV = (id) => {
    setOpenV(true);
    setViewId(id);
  };

  const handleCloseV = () => {
    setOpenV(false);
  };
  console.log("aaaaaaaa viewId", viewId);

  // view client
  const [clientDetails, setclientDetails] = useState(null);

  useEffect(() => {
    async function fetchclientDetails() {
      setLoading(true);
      try {
        const response = await AuthenticationServices.GetClientDetails(viewId);
        if (response.data.code == "00") {
          setclientDetails(response.data.content);
          console.log("aaaaaaa client", response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    if (viewId) {
      fetchclientDetails();
    }
  }, [viewId]);

  // delete Booking
  const [openD, setOpenD] = useState(false);
  const [bookingId, setBookingId] = useState(0);

  const handleClickOpenD = (id) => {
    setOpenD(true);
    setBookingId(id);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  console.log("aaaaaaaa viewId", bookingId);

  const HandleDeleteBooking = async () => {
    try {
      const response = await AuthenticationServices.DeleteBooking(bookingId);
      if (response.data.code == "00") {
        toast.success("Appoinment has been canceled Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        toast.error("An Error Occurred While cancelling appoinment");
        setOpenD(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While cancelling appoinment");
      setOpenD(false);
    }
  };

  return (
    <div className="bg-white">
      <Header />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : salonDetials ? (
          <div className="h-screen">
            <div className="flex flex-col items-center justify-center gap-4 pb-4 md:flex-row">
              <h1 className="text-5xl font-bold text-blue-500 md:text-6xl">
                Hello
              </h1>
              <h1 className="text-5xl font-bold text-blue-700 md:text-6xl">
                {salonDetials.name}
              </h1>
            </div>
            {/* Tabs */}
            <div className="relative flex flex-row items-center justify-center">
              <div className="absolute cursor-pointer md:hidden left-5">
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
                <div className="drawer-content">
                  {/* <!-- Page content here --> */}
                  <label htmlFor="my-drawer" className="">
                    <ListIcon style={{ fontSize: "2rem" }} />
                  </label>
                </div>
                <div className="absolute rounded-lg left-2 drawer-side top-14">
                  <label htmlFor="my-drawer" className="drawer-overlay"></label>
                  <ul className="p-2 text-gray-800 rounded-md w-60 bg-slate-100">
                    {/* <!-- Sidebar content here --> */}
                    <li>
                      <Link to="/SalonProfile">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="one" label="Packages" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Uploads">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="two" label="Uploads" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Appoinment">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="three" label="Appoinment" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Completed">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="four" label="Completed" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/Reviews">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="five" label="Reviews" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/WorkHours">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="six" label="Work Hours" />
                        </Tabs>
                      </Link>
                    </li>
                    <li>
                      <Link to="/WorkDays">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="seven" label="Work days" />
                        </Tabs>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:hidden">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="primary tabs example">
                  <Tab value="three" label="Appoinment" />
                </Tabs>
              </div>
              <div className="hidden md:block">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="primary tabs example">
                  <Tab
                    onClick={onNavigateProfile}
                    value="one"
                    label="Packages"
                  />
                  <Tab
                    onClick={onNavigateUploads}
                    value="two"
                    label="Uploads"
                  />
                  <Tab
                    onClick={onNavigateAppoinment}
                    value="three"
                    label="Appoinment"
                  />
                  <Tab
                    onClick={onNavigateCompleted}
                    value="four"
                    label="Completed Appoinment"
                  />
                  <Tab
                    onClick={onNavigateReviews}
                    value="five"
                    label="Reviews"
                  />
                  <Tab
                    onClick={onNavigateWorkH}
                    value="six"
                    label="Customize working Hours"
                  />
                  <Tab
                    onClick={onNavigateWorkD}
                    value="seven"
                    label="Customize working days"
                  />
                </Tabs>
              </div>
            </div>
            <div className="md:px-72">
              {bookingDetails &&
                bookingDetails?.map((booking) => (
                  <div key={booking.bookingId}>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>
                            <NotificationsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="You have a new appoinment"
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: "inline" }}
                                component="span"
                                variant="body2"
                                color="text.primary">
                                {booking.bookingTime}
                              </Typography>
                              {` —  ${booking.bookingDate} `}
                              <div
                                className="gap-4"
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}>
                                <Button
                                  variant="outlined"
                                  color="error"
                                  onClick={() =>
                                    handleClickOpenD(booking.bookingId)
                                  }>
                                  Cancel Appoinment
                                </Button>
                                <Button
                                  variant="outlined"
                                  onClick={() =>
                                    handleClickOpenV(booking.clientId)
                                  }>
                                  View
                                </Button>
                                <Dialog
                                  open={openD}
                                  onClose={handleCloseD}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description">
                                  <DialogTitle id="alert-dialog-title">
                                    {"Confirm cancel"}
                                  </DialogTitle>
                                  <div className="flex items-center justify-center">
                                    <CancelOutlinedIcon
                                      style={{
                                        fontSize: 40,
                                        color: red[500],
                                      }}
                                    />
                                  </div>
                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      Are you sure to cancel this appoinment?
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCloseD}>
                                      Close
                                    </Button>
                                    <Button
                                      // variant="outlined"
                                      onClick={HandleDeleteBooking}
                                      sx={{ color: red[600] }}>
                                      Cancel Appoinment
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                                <Dialog
                                  open={openV}
                                  onClose={handleCloseV}
                                  aria-labelledby="alert-dialog-title"
                                  aria-describedby="alert-dialog-description">
                                  <div className="flex items-center justify-center pt-4">
                                    <InfoOutlinedIcon
                                      style={{
                                        fontSize: 40,
                                        color: blue[500],
                                      }}
                                    />
                                  </div>
                                  <DialogTitle id="alert-dialog-title">
                                    {clientDetails?.firstName}{" "}
                                    {clientDetails?.lastName}
                                  </DialogTitle>

                                  <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                      {clientDetails?.email}
                                    </DialogContentText>
                                    <DialogContentText id="alert-dialog-description">
                                      {clientDetails?.contactNum}
                                    </DialogContentText>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleCloseV}>Ok</Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p className="text-5xl font-bold text-red-700 md:text-6xl">
            Your Account has been Deleted.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Appoinment;
