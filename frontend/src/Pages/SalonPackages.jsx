import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import AuthenticationServices from "../Services/AuthenticationServices";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Package from "../Assets/Package.jpg";
import { blue, red } from "@mui/material/colors";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const SalonPackages = () => {
  const navigate = useNavigate();
  const [user, SetUser] = useState();
  const [salonId, setSalonId] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);
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
    async function fetchPackages() {
      const res = await AuthenticationServices.GetPackagesBySalon(salonId);
      if (res.data.status == 1) {
        console.log("Hello");
        setPackageDetails(res.data.data);
        console.log(res.data.data);
      }
    }
    if (salonId) {
      fetchPackages();
    }
  }, [salonId]);

  // Rating
  const StyledRating = styled(Rating)({
    "& .MuiRating-iconFilled": {
      color: "#ff6d75",
    },
    "& .MuiRating-iconHover": {
      color: "#ff3d47",
    },
  });

  // Update Package
  const [values, setValues] = useState({
    id: "",
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

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [updateId, setUpdateId] = useState(0);

  const handleClickOpen = (id) => {
    setOpen(true);
    setUpdateId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const user = {
      packageId: data.id,
      packageName: data.package_name,
      duration: data.duration,
      add_ons: data.add_ons,
      add_onsType: data.add_onstype,
      packagePrice: data.price,
      salonId: salonId,
    };
    console.log(user);
    try {
      const result = await AuthenticationServices.UpdatePackage(user);
      console.log("Hello update section");
      console.log(result);
      if (result.data.code === "00") {
        console.log(result.data.content);
        toast.success("Package details have been changed successfully!");
        setTimeout(async () => {
          setOpen(false);
          window.location.reload();
        }, 4000);
      } else {
        toast.error(result.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      setOpen(false);
    }
  };

  // Delete Account
  const [openD, setOpenD] = React.useState(false);

  const handleClickOpenD = (id) => {
    setOpenD(true);
    setUpdateId(id);
  };
  console.log("aaaaaaaaaaaaaa updateId", updateId);
  const handleCloseD = () => {
    setOpenD(false);
  };

  const DeletePackage = async () => {
    try {
      const response = await AuthenticationServices.DeletePackage(updateId);
      if (response.data.code == "00") {
        toast.success("Package has been Deleted Successfully");
        setTimeout(() => {
          setOpen(false);
          window.location.reload();
        }, 4000);
      } else {
        toast.error("An Error Occurred While Deleting Your Package");
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While Deleting Your Server");
    }
  };

  return (
    <div className="">
      <div className="grid items-center justify-center grid-cols-1 text-gray-800 bg-white md:px-52 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
                  <Button
                    size="small"
                    onClick={() => handleClickOpen(packages.packageId)}>
                    Edit
                  </Button>
                  <Button
                    size="small"
                    onClick={() => handleClickOpenD(packages.packageId)}
                    sx={{ color: red[600] }}>
                    Delete
                  </Button>
                </CardActions>
                {/* Dialog */}
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
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
                        <select
                          className="w-full p-2 text-lg bg-white border-2 border-gray-300 select select-bordered"
                          type="text"
                          name="id"
                          defaultValue={packages.packageId}
                          {...register("id", {
                            required: true,
                          })}>
                          <option disabled selected>
                            Package Id
                          </option>
                          <option value={packages.packageId}>
                            {packages.packageId}
                          </option>
                        </select>
                        {errors.id && (
                          <p className="text-red-600">
                            Please select the package id
                          </p>
                        )}

                        <TextField
                          name="package_name"
                          required
                          id="outlined-required"
                          label="Package Name"
                          placeholder="Package Name"
                          defaultValue={packages.packageName}
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
                          defaultValue={packages.duration}
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
                            Please select package duration in hour
                          </p>
                        )}

                        <TextField
                          name="add_ons"
                          required
                          id="outlined-required"
                          label="Extra Included"
                          placeholder="Extra Included"
                          defaultValue={packages.add_ons}
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
                          defaultValue={packages.add_onsType}
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
                          defaultValue={packages.packagePrice}
                          {...register("price", {
                            required: true,
                            pattern: /^[0-9]+$/,
                          })}
                        />
                        {errors.price && (
                          <p className="text-red-600">
                            Enter the Package price
                          </p>
                        )}
                      </div>
                      <div>
                        <DialogActions>
                          <Button autoFocus onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button variant="contained" type="submit" autoFocus>
                            Save changes
                          </Button>
                        </DialogActions>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
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
                      style={{ fontSize: 40, color: red[600] }}
                    />
                  </div>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to delete this package?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseD}>Cansle</Button>
                    <Button
                      // variant="outlined"
                      onClick={DeletePackage}
                      sx={{ color: red[600] }}>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalonPackages;
