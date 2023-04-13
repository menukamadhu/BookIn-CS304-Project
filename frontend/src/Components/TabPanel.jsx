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

  useEffect(() => {
    async function fetchPackages() {
      const res = await AuthenticationServices.GetPackagesBySalon(myPropValue);
      if (res.data.status == 1) {
        console.log("Hello");
        setPackageDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (myPropValue) {
      fetchPackages();
    }
  }, [myPropValue]);
  console.log(packageDetails);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Open dialog
  const [valueD, setValueD] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
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
    console.log(clientId);
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
          console.log(response.data.content);
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
    console.log(result);
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
                      <Typography gutterBottom variant="body2" component="div">
                        with {packages.add_ons}
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
                        <Button size="small" onClick={handleClickOpen}>
                          Book
                        </Button>
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="responsive-dialog-title">
                          <DialogTitle id="responsive-dialog-title">
                            {"book a time and date"}
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
                                label="Age"
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
                            </FormControl>
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              Cansle
                            </Button>
                            <Button
                              className="right-2"
                              variant="outlined"
                              onClick={handleClose}
                              autoFocus>
                              Book
                            </Button>
                          </DialogActions>
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
          Reviews
          <Typography
            component="div"
            sx={{ position: "absolute", bottom: 20, left: 20 }}>
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
