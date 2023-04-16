import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import AuthenticationServices from "../Services/AuthenticationServices";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Package from "../Assets/Package.jpg";
// import Book from "../Components/Book";
import { useTheme } from "styled-components";
import { useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Fullscreen } from "@mui/icons-material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import { blue, red } from "@mui/material/colors";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const myPropValue = location.state?.myProp;
  const [packageDetails, setPackageDetails] = useState(null);
  const [reviewDetails, setReviewDetails] = useState(null);

  useEffect(() => {
    async function fetchPackages() {
      const res = await AuthenticationServices.GetPackagesBySalon(myPropValue);
      if (res.data.status == 1) {
        // console.log("Hello");
        setPackageDetails(res.data.data);
        // console.log(res.data.data);
      }
    }
    if (myPropValue) {
      fetchPackages();
    }
  }, [myPropValue]);
  // console.log(packageDetails);

  // get all reviews
  useEffect(() => {
    async function fetchPackages() {
      const res = await AuthenticationServices.GetReviewsBySalon(myPropValue);
      if (res.data.status == 1) {
        console.log("Hello");
        setReviewDetails(res.data.data);
        // console.log(res.data.data);
      }
    }
    if (myPropValue) {
      fetchPackages();
    }
  }, [myPropValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Open dialog
  const [valueD, setValueD] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [packageId, setPackageId] = useState(0);
  const [duration, setDuration] = useState(0);
  const [name, setName] = useState("");
  const [bookings, setBookings] = useState(null);
  // const [bookingTimes, setBookingTimes] = useState([]);

  const handleClickOpen = (id, duration, name) => {
    setOpen(true);
    setPackageId(id);
    setDuration(duration);
    setName(name);
    // setBookingTimes(bookings.map((b) => b.bookingTime));
    console.log("xxxxxxxxxxxxxxxxxxxx btimes", bookingTimes);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [time, setTime] = React.useState("");

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

  // get client details
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
    // console.log(clientId);
  }, []);

  useEffect(() => {
    async function fetchclientDetails() {
      setLoading(true);
      try {
        const response = await AuthenticationServices.GetClientDetails(
          clientId
        );
        if (response.data.code == "00") {
          setclientDetails(response.data.content);
          // console.log(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
    if (clientId) {
      fetchclientDetails();
    }
  }, [clientId]);

  // add a review
  const [values, setValues] = useState({
    review: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const review = {
      review: data.review,
      reviewer: clientDetails.firstName,
      salonId: myPropValue,
      clientId: clientDetails.clientID,
    };
    const result = await AuthenticationServices.AddReview(review);
    // console.log(result);
    if (result.data.status == "1") {
      console.log(result.data.data);
      toast.success("Your review has been added!");
      setTimeout(async () => {
        setOpen(false);
        window.location.reload();
      }, 4000);
    } else {
      toast.error(result.data.data);
    }
  };

  // get booking salonId

  useEffect(() => {
    async function fetchBookings() {
      const res = await AuthenticationServices.GetBookingBySalonId(myPropValue);
      if (res.data.status == 1) {
        console.log("Hello");
        setBookings(res.data.data);
        // const bookingTimes = bookings.map(
        //   (booking) => booking.bookingTime.split("-")[0]
        // );
        // const excludedTimes = bookingTimes.map((str) => parseInt(str));
        // console.log("Bookind times xxxxxxxxxxxxxxxxxxx", excludedTimes);
      }
    }
    if (myPropValue) {
      fetchBookings();
    }
  }, [myPropValue]);
  console.log("all bookings", bookings);
  // console.log("aaaaaaaaa pid", packageId);
  // console.log("xxxxxxx date", `${valueD?.$M + 1}/${valueD?.$D}/${valueD?.$y}`);
  // console.log("yyyyyyy time", time);
  const bookingTimes = bookings?.map(
    (booking) => booking.bookingTime.split("-")[0]
  );
  const excludedTimes = bookingTimes?.map((str) => parseInt(str));
  console.log("Bookind times xxxxxxxxxxxxxxxxxxx", excludedTimes);

  // add a booking
  const [booktime, setBooktime] = useState({
    time: "",
  });

  const onBooking = async (e) => {
    console.log("Open");
    e.preventDefault();
    const book = {
      bookingDate: `${valueD.$M + 1}/${valueD.$D}/${valueD.$y}`,
      bookingTime: `${time}-${time + duration}`,
      doneBook: "",
      packagesPackageId: packageId,
      clientId: clientDetails.clientID,
      salonId: myPropValue,
    };
    console.log("yyyyyyy book", book);
    const result = await AuthenticationServices.AddBooking(book);
    // console.log(result);
    if (result.data.status == "1") {
      console.log(result.data.data);
      toast.success("Your booking has been added successfully!");
      setOpen(false);
    } else {
      toast.error(result.data.data);
      setOpen(false);
    }
  };

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  const menuItems = [
    { value: "", label: <em>None</em> },
    { value: 9, label: "9.00 am" },
    { value: 10, label: "10.00 am" },
    { value: 11, label: "11.00 am" },
    { value: 12, label: "12.00 pm" },
    { value: 13, label: "1.00 pm" },
    { value: 14, label: "2.00 pm" },
    { value: 15, label: "3.00 pm" },
    { value: 16, label: "4.00 pm" },
    { value: 17, label: "5.00 pm" },
    { value: 18, label: "6.00 pm" },
    { value: 19, label: "7.00 pm" },
  ];

  // get time by date
  const [timeSlots, setTimeSlots] = useState([]);

  const fetchBookingsByDate = async (e) => {
    e.preventDefault();
    const date = `${valueD.$M + 1}/${valueD.$D}/${valueD.$y}`;
    console.log(date);
    const res = await AuthenticationServices.GetBookingBySalonAndDate(
      myPropValue,
      date
    );

    if (res.data.status == 1) {
      console.log(res.data);
      setTimeSlots(res.data.data);
    }
  };

  // useEffect(() => {
  //   console.log(`${valueD.$M + 1}/${valueD.$D}/${valueD.$y}`);
  // }, [valueD]);

  // useEffect(() => {
  //   async function fetchBookingsByDate() {
  //     const res = await AuthenticationServices.GetBookingBySalonAndDate(myPropValue,date);
  //     if (res.data.status == 1) {
  //       console.log("Hello");
  //       setTimeSlots(res.data.data);
  //     }
  //   }
  //   if (myPropValue,date) {
  //     fetchBookingsByDate();
  //   }
  // }, [myPropValue,date]);
  // console.log("all bookings", bookings);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Packages" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
          <Tab label="Reviews" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div>
          <div className="grid items-start justify-start grid-cols-1 text-gray-800 bg-white md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {packageDetails?.map((packages) => (
              <div key={packages.packageId}>
                <div className="flex p-4 duration-300 md:hover:scale-110">
                  <Card sx={{ maxWidth: 280 }}>
                    <div>
                      <img src={Package} alt="" />
                    </div>
                    <CardContent>
                      <Typography gutterBottom variant="h4" component="div">
                        {packages.packageName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        extra included servise :
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        {packages.add_ons}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        payment type :
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                        {packages.add_onsType}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        duration : {packages.duration} hr
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        LKR {packages.packagePrice}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <div>
                        <Button
                          size="small"
                          onClick={() =>
                            handleClickOpen(
                              packages.packageId,
                              packages.duration,
                              packages.packageName
                            )
                          }>
                          Book
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title">
                          <form action="">
                            <DialogTitle id="responsive-dialog-title">
                              {name}
                            </DialogTitle>
                            <DialogContent>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={["DatePicker"]}>
                                  <DatePicker
                                    valueD={valueD}
                                    onChange={(newValue) => setValueD(newValue)}
                                  />
                                </DemoContainer>
                              </LocalizationProvider>
                              <DialogActions>
                                <Button
                                  className="right-2"
                                  variant="outlined"
                                  onClick={fetchBookingsByDate}
                                  autoFocus>
                                  Show bookings
                                </Button>
                              </DialogActions>
                              <div className="grid items-center justify-center w-full grid-cols-2 px-1">
                                {timeSlots?.map((time) => (
                                  <div key={time.bookingId}>
                                    <Button
                                      color="error"
                                      size="small"
                                      variant="outlined"
                                      startIcon={<AlarmOnIcon />}>
                                      {time.bookingTime}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <FormControl
                                sx={{ m: 1 }}
                                className="w-full top-2 right-2">
                                <InputLabel id="demo-simple-select-helper-label">
                                  Select time
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  value={time}
                                  label="Select time"
                                  onChange={handleChangeTime}>
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>
                                  <MenuItem value={9}>9.00 am</MenuItem>
                                  <MenuItem value={10}>10.00 am</MenuItem>
                                  <MenuItem value={11}>11.00 am</MenuItem>
                                  <MenuItem value={12}>12.00 pm</MenuItem>
                                  <MenuItem value={13}>1.00 pm</MenuItem>
                                  <MenuItem value={14}>2.00 pm</MenuItem>
                                  <MenuItem value={15}>3.00 pm</MenuItem>
                                  <MenuItem value={16}>4.00 pm</MenuItem>
                                  <MenuItem value={17}>5.00 pm</MenuItem>
                                  <MenuItem value={18}>6.00 pm</MenuItem>
                                  <MenuItem value={19}>7.00 pm</MenuItem>
                                </Select>
                                {/* <Select
                                  labelId="demo-simple-select-helper-label"
                                  id="demo-simple-select-helper"
                                  value={time}
                                  label="Select time"
                                  onChange={handleChangeTime}>
                                  {menuItems
                                    .filter(
                                      (item) =>
                                        !excludedTimes.includes(item.value)
                                    )
                                    .map((item) => (
                                      <MenuItem
                                        key={item.value}
                                        value={item.value}>
                                        {item.label}
                                      </MenuItem>
                                    ))}
                                </Select> */}
                                {errors.id && (
                                  <p className="text-red-600">
                                    Please select the package id
                                  </p>
                                )}
                              </FormControl>
                            </DialogContent>
                            <DialogActions>
                              <Button autoFocus onClick={handleClose}>
                                Cancel
                              </Button>
                              <Button
                                className="right-2"
                                variant="contained"
                                onClick={onBooking}
                                autoFocus>
                                Book
                              </Button>
                            </DialogActions>
                          </form>
                        </Dialog>
                      </div>
                    </CardActions>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Photos
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="p">
          <div>
            {reviewDetails?.map((review) => (
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
          <Typography
            component="div"
            sx={{ position: "", bottom: 20, left: 20 }}
            className="pt-10">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-row gap-4">
                <TextField
                  name="review"
                  placeholder="add a review..."
                  variant="outlined"
                  color="primary"
                  style={{ width: "400px" }}
                  {...register("review", {
                    required: true,
                  })}
                />
                {errors.review && (
                  <p className="text-red-600">Please add a review</p>
                )}
                <Button variant="outlined" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Typography>
        </div>
      </TabPanel>
    </Box>
  );
}
