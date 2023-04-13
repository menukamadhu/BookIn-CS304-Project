import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//login
const userLogin = async (data) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/login/userLogin`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// register Salon
const Register = async (data) => {
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/salon/registerSalon`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// register Client
const RegisterClient = async (data) => {
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/client/registerClient`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Salon
const GetSalonDetails = async (salonID) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/getSalon/${salonID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Client
const GetClientDetails = async (clientID) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/client/getClient/${clientID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Update Salon
const UpdateSalon = async (data) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:8080/salon/updateSalon`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Update Client
const UpdateClient = async (data) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:8080/client/updateClient`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Delete Salon
const DeleteSalon = async (salonID) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:8080/salon/deleteSalon/${salonID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Delete Client
const DeleteClient = async (clientID) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:8080/client/deleteClient/${clientID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get all Salons
const GetAllSalons = async () => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/getAllSalons`,
    // data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
  // return Http.get < any > "";
};

// add a Package
const AddPackage = async (data) => {
  console.log("data", data);
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/salon/package/addPackage`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// get packages by salon Id
const GetPackagesBySalon = async (salonID) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/package/getPackagesBySalonId/${salonID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  console.log("data", salonID);
  return response;
};

// Upadate Packages
const UpdatePackage = async (data) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:8080/salon/package/updatePackage`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// delete Package
const DeletePackage = async (packageId) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:8080/salon/package/deletePackage/${packageId}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// add a Review
const AddReview = async (data) => {
  console.log("data", data);
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/salon/review/addReview`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

const AuthenticationServices = {
  userLogin,
  Register,
  RegisterClient,
  GetSalonDetails,
  GetClientDetails,
  UpdateSalon,
  UpdateClient,
  DeleteSalon,
  DeleteClient,
  GetAllSalons,
  AddPackage,
  GetPackagesBySalon,
  UpdatePackage,
  DeletePackage,
  AddReview,
};

export default AuthenticationServices;
