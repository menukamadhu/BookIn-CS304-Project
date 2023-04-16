import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import ProfileS from "./ProfileS";
import AuthenticationServices from "../Services/AuthenticationServices";
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
import PackageService from "../Services/PackageService";
import SalonPackages from "./SalonPackages";

const SalonProfile = () => {
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
    // console.log(salonId);
  }, []);

  useEffect(() => {
    async function fetchSalonDetails() {
      setLoading(true);
      try {
        const response = await AuthenticationServices.GetSalonDetails(salonId);
        if (response.data.code == "00") {
          setSalonDetails(response.data.content);
          // console.log(response.data.content);
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

  // Speed Dial
  const actions = [
    { icon: <UploadFileIcon />, name: "add package" },
    // { icon: <SaveIcon />, name: "Save" },
    // { icon: <PrintIcon />, name: "Print" },
    // { icon: <ShareIcon />, name: "Share" },
  ];

  // Responsive
  const [open, setOpen] = useState(false);
  useEffect(() => {
    console.log(open);
  }, [open]);

  // Add Package
  const [openP, setOpenP] = React.useState(false);
  const themeP = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpenP(true);
  };

  const handleClose = () => {
    setOpenP(false);
  };

  const [type, setType] = React.useState("");
  const [district, setDistrict] = React.useState("");

  const handleChangeT = (event) => {
    setType(event.target.value);
  };
  const handleChangeD = (event) => {
    setDistrict(event.target.value);
  };

  // handle form
  const [values, setValues] = useState({
    package_name: "",
    duration: "",
    add_ons: "",
    add_onstype: "",
    price: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = {
      packageName: data.package_name,
      duration: data.duration,
      add_ons: data.add_ons,
      add_onsType: data.add_onstype,
      packagePrice: data.price,
      salonId: salonDetials.salonID,
    };
    console.log(user);

    console.log("Hello");
    const result = await PackageService.AddPackage(user);
    console.log(result);
    if (result.data.status == "1") {
      console.log(result.data.data);
      toast.success("Your package has been added successfully!");
      setTimeout(async () => {
        setOpen(false);
        window.location.reload();
      }, 4000);
    } else {
      toast.error(result.data.data);
    }
  };

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

  return (
    <div className="w-screen bg-white">
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
                  <Tab value="one" label="Packages" />
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
            {/* Packages List */}
            <div>
              <SalonPackages />
            </div>
            {/* Speed Dial */}
            <div>
              <div className="">
                <SpeedDial
                  ariaLabel="SpeedDial basic example"
                  sx={{ position: "fixed", bottom: 20, right: 20 }}
                  icon={<SpeedDialIcon />}>
                  {actions.map((action) => (
                    <SpeedDialAction
                      onClick={handleClickOpen}
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
              </div>
              {/* Dialog */}
              <Dialog
                fullScreen={fullScreen}
                open={openP}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                  {"Add a Package"}
                </DialogTitle>
                <DialogContent>
                  <form
                    action=""
                    className="flex flex-col gap-4 p-2"
                    onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                      <TextField
                        name="package_name"
                        required
                        id="outlined-required"
                        label="Package Name"
                        placeholder="Package Name"
                        {...register("package_name", {
                          required: true,
                        })}
                      />
                      {errors.package_name && (
                        <p className="text-red-600">
                          Please enter the Package Name
                        </p>
                      )}

                      <select
                        className="w-full p-2 text-lg bg-white border-2 border-gray-300 select select-bordered"
                        type="text"
                        name="duration"
                        {...register("duration", {
                          required: true,
                        })}>
                        <option disabled selected>
                          Duration_hr
                        </option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                      </select>
                      {errors.duration && (
                        <p className="text-red-600">
                          Please select package duration in hours
                        </p>
                      )}

                      <TextField
                        name="add_ons"
                        required
                        id="outlined-required"
                        label="Extra Included"
                        placeholder="Extra Included"
                        defaultValue="None"
                        {...register("add_ons", {
                          required: true,
                        })}
                      />
                      {errors.add_ons && (
                        <p className="text-red-600">
                          Enter the extra included or none
                        </p>
                      )}

                      <select
                        className="w-full p-2 text-lg bg-white border-2 border-gray-300 select select-bordered"
                        type="text"
                        name="add_onstype"
                        {...register("add_onstype", {
                          required: true,
                        })}>
                        <option disabled selected>
                          Extra included type
                        </option>
                        <option value="For an additional fee">
                          For an additional fee
                        </option>
                        <option value="For a free of charge">
                          For a free of charge
                        </option>
                        <option value="None">None</option>
                      </select>
                      {errors.add_onstype && (
                        <p className="text-red-600">
                          Please select your extra included type
                        </p>
                      )}

                      <TextField
                        name="price"
                        required
                        id="outlined-required"
                        label="Price"
                        placeholder="Price-LKR"
                        {...register("price", {
                          required: true,
                          pattern: /^[0-9]+$/,
                        })}
                      />
                      {errors.price && (
                        <p className="text-red-600">Enter the Package price</p>
                      )}
                    </div>
                    <div>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button variant="contained" type="submit" autoFocus>
                          Add
                        </Button>
                      </DialogActions>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
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

export default SalonProfile;
