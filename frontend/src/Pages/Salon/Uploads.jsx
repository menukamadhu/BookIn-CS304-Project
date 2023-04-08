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

const Uploads = () => {
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

  return (
    <div className="bg-white">
      <Header />
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : salonDetials ? (
          <div className="h-screen">
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
                      <Link to="/Appoinment">
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          textColor="primary"
                          indicatorColor="primary"
                          aria-label="primary tabs example">
                          <Tab value="three" label="Appoinment" />
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
                  <Tab value="two" label="Uploads" />
                </Tabs>
              </div>
              <div className="hidden md:block">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="primary"
                  indicatorColor="primary"
                  aria-label="primary tabs example">
                  <Link to="/SalonProfile">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="one"
                      label="Packages"
                    />
                  </Link>
                  <Link to="/Uploads">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="two"
                      label="Uploads"
                    />
                  </Link>
                  <Link to="/Appoinment">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="three"
                      label="Appoinment"
                    />
                  </Link>
                  <Link to="/Completed">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="four"
                      label="Completed Appoinment"
                    />
                  </Link>
                  <Link to="/Reviews">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="five"
                      label="Reviews"
                    />
                  </Link>
                  <Link to="/WorkHours">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="six"
                      label="Customize working Hours"
                    />
                  </Link>
                  <Link to="/WorkDays">
                    <Tab
                      onChange={handleChange}
                      textColor="primary"
                      indicatorColor="primary"
                      aria-label="primary tabs example"
                      value="seven"
                      label="Customize working days"
                    />
                  </Link>
                </Tabs>
              </div>
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
                      key={action.name}
                      icon={action.icon}
                      tooltipTitle={action.name}
                    />
                  ))}
                </SpeedDial>
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

export default Uploads;
