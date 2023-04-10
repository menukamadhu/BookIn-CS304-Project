import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_SERVER;

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

const PackageService = {
  AddPackage,
};

export default PackageService;
