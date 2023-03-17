import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

//login
const loginRequest = async (data) => {
  const response = await axios({
    method: "post",
    url: `${process.env.REACT_APP_BACKEND_SERVER}/register/login`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};

// register
const Register = async (data) => {
  const response = await axios({
    method: "post",
    url: `http://localhost:8080/register/registerSalon`,
    data: data,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  return response;
};


const AuthenticationServices={
    loginRequest,
    Register,
}

export default AuthenticationServices;