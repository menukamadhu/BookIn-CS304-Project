import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationServices from "../Services/AuthenticationServices";
import { Avatar } from "@mui/material";
import { Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "../Components/Footer";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const MyBookings = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState();
  const [clientId, setclientId] = useState("");
  const [clientDetails, setclientDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("loggedUser");
    const parseData = JSON.parse(dataFromLocalStorage);
    const userIdFromData = parseData?.userId;
    setclientId(userIdFromData);
    console.log(clientId);
  }, []);

  //   get all bookings
  const [bookingDetails, setBookingDetails] = useState("");
  useEffect(() => {
    async function fetchBookings() {
      const res = await AuthenticationServices.GetBookingByClientAndDone(
        clientId,
        false
      );
      if (res.data.status == 1) {
        console.log("Hello");
        setBookingDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (clientId) {
      fetchBookings();
    }
  }, [clientId]);
  console.log("aaaaaaaa booking", bookingDetails);

  // Delete Booking
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
        toast.success("Appointment has been canceled Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        toast.error("An Error Occurred While cancelling Appointment");
        setOpenD(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While cancelling Appointment");
      setOpenD(false);
    }
  };

  //   get all bookings
  const [bookingDetailsC, setBookingDetailsC] = useState("");
  useEffect(() => {
    async function fetchBookings() {
      const res = await AuthenticationServices.GetBookingByClientAndDone(
        clientId,
        true
      );
      if (res.data.status == 1) {
        console.log("Hello");
        setBookingDetailsC(res.data.data);
        console.log(res.data.data);
      }
    }
    if (clientId) {
      fetchBookings();
    }
  }, [clientId]);

  return (
    <div className="w-screen">
      <Header />
      <div className="bg-white md:pt-10">
        <h1 className="flex items-center justify-center pb-4 text-5xl font-bold text-blue-600 md:text-6xl">
          My Bookings
        </h1>
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookingDetailsC ? (
            <div>
              <div>
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
                              primary="You have booked a time"
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
                                      Cancel Appointment
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
                                          Are you sure to cancel this
                                          Appointment?
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
                                          Cancel Appointment
                                        </Button>
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
                <div className="md:px-72">
                  {bookingDetailsC &&
                    bookingDetailsC?.map((bookingC) => (
                      <div key={bookingC.bookingId}>
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
                              primary="You have booked a time"
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary">
                                    {bookingC.bookingTime}
                                  </Typography>
                                  {` —  ${bookingC.bookingDate} `}
                                  <div
                                    className="gap-4"
                                    style={{
                                      display: "flex",
                                      justifyContent: "flex-end",
                                    }}>
                                    <Button
                                      variant="outlined"
                                      color="success"
                                      startIcon={<CheckCircleOutlineIcon />}>
                                      Confirmed Appointment
                                    </Button>
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
            </div>
          ) : (
            <p>No any confirmed bookings found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
