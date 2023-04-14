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

// get review by salon Id
const GetReviewsBySalon = async (salonID) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/review/getReviewBySalonId/${salonID}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  console.log("data", salonID);
  return response;
};

// delete Review
const TestDelete = async (reviewId) => {
  const response = await axios({
    method: "delete",
    url: `http://localhost:8080/salon/review/deleteReview/${reviewId}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// add a Booking
const AddBooking = async (data) => {
  console.log("data", data);
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/salon/booking/addBooking`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// `${value}-${value+duration}`

// Upadate Booking
const UpdateBooking = async (data) => {
  const response = await axios({
    method: "put",
    url: `http://localhost:8080/salon/booking/updateBooking`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Booking By Date
const GetBookingByDate = async (bookingDate) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/booking/getBookingByDate/${bookingDate}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Booking By Done
const GetBookingByDone = async (doneBook) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/booking/getBookingByDone/${doneBook}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Booking By SalonId
const GetBookingBySalonId = async (salonId) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/booking/getBookingBySalonId/${salonId}`,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// Get Booking By ClinetId
const GetBookingByClientId = async (clientId) => {
  const response = await axios({
    method: "get",
    url: `http://localhost:8080/salon/booking/getBookingByClientId/${clientId}`,
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
  GetReviewsBySalon,
  TestDelete,
  AddBooking,
  UpdateBooking,
  GetBookingByDate,
  GetBookingByDone,
};

export default AuthenticationServices;
