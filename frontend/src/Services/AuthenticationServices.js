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
    url: `http://localhost:8080/register/registerSalon`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// register Client
const RegisterClient = async (data) => {
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/register/registerClient`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

const AuthenticationServices = {
  userLogin,
  Register,
  RegisterClient,
};

export default AuthenticationServices;
