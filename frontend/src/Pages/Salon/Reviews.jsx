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
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Reviews = () => {
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
  const onNavigateAppointment = () => {
    navigate("/Appointment");
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

  // get all reviews
  const [reviewDetails, setReviewDetails] = useState("");
  useEffect(() => {
    async function fetchReviews() {
      const res = await AuthenticationServices.GetReviewsBySalon(salonId);
      if (res.data.status == 1) {
        console.log("Hello");
        setReviewDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (salonId) {
      fetchReviews();
    }
  }, [salonId]);
  console.log("aaaaaaaa review", reviewDetails);

  // Delete Review
  const [openD, setOpenD] = React.useState(false);
  const [deleteId, setDeleteId] = useState(0);

  const handleClickOpenD = (id) => {
    setOpenD(true);
    setDeleteId(id);
  };

  const handleCloseD = () => {
    setOpenD(false);
  };
  console.log("aaaaaaaa deleteId", deleteId);

  const HandleDeleteReview = async () => {
    try {
      const response = await AuthenticationServices.TestDelete(deleteId);
      if (response.data.code == "00") {
        toast.success("Review has been Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      } else {
        toast.error("An Error Occurred While Deleting Review");
        setOpenD(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While Deleting Review");
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
          <div className="h-full">
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
                      <Link to="/Appointment">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="three" label="Appointment" />
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
                  <Tab value="five" label="Reviews" />
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
                    onClick={onNavigateAppointment}
                    value="three"
                    label="Appointment"
                  />
                  <Tab
                    onClick={onNavigateCompleted}
                    value="four"
                    label="Completed Appointment"
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
            <div>
              <div className="md:px-72">
                {reviewDetails &&
                  reviewDetails.map((review) => (
                    <div key={review.reviewId}>
                      <List
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                        }}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              alt={review.reviewer}
                              src="/static/images/avatar/1.jpg"
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={review.reviewer}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary">
                                  {review.review}
                                </Typography>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}>
                                  <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={() =>
                                      handleClickOpenD(review.reviewId)
                                    }>
                                    Delete
                                  </Button>
                                  <Dialog
                                    open={openD}
                                    onClose={handleCloseD}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description">
                                    <DialogTitle id="alert-dialog-title">
                                      {"Confirm Delete"}
                                    </DialogTitle>
                                    <div className="flex items-center justify-center">
                                      <DeleteOutlineIcon
                                        style={{
                                          fontSize: 40,
                                          color: red[600],
                                        }}
                                      />
                                    </div>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-description">
                                        Are you sure to delete this review?
                                      </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={handleCloseD}>
                                        Cancel
                                      </Button>
                                      <Button
                                        // variant="outlined"
                                        onClick={HandleDeleteReview}
                                        sx={{ color: red[600] }}>
                                        Delete
                                      </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                                {/* {
                            " — I'll be in your neighborhood doing errands this…"
                          } */}
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
          <p className="text-5xl font-bold text-red-700 md:text-6xl">
            Your Account has been Deleted.
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reviews;
