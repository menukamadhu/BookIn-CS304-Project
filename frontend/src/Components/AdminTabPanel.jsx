import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AuthenticationServices from "../Services/AuthenticationServices";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { red } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AdminTabPanel(props) {
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

AdminTabPanel.propTypes = {
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   get all salons
  const navigate = useNavigate();
  const [salonList, setSalonList] = useState([]);

  useEffect(() => {
    AuthenticationServices.GetAllSalons().then((res) => {
      if (res.data.code == "00") {
        setSalonList(res.data.content);
        console.log(res.data.content);
      }
      console.log("aaa salon list", salonList);
    });
  }, []);
  // get all clients
  const [clientList, setClientList] = useState([]);

  useEffect(() => {
    AuthenticationServices.GetAllClients().then((result) => {
      if (result.data.code == "00") {
        setClientList(result.data.content);
        console.log(result.data.content);
      }
      console.log("aaa client list", clientList);
    });
  }, []);

  // Delete Salon
  const [openDS, setOpenDS] = React.useState(false);
  const [deleteIdS, setDeleteIdS] = useState(0);

  const handleClickOpenDS = (id) => {
    setOpenDS(true);
    setDeleteIdS(id);
  };

  const handleCloseDS = () => {
    setOpenDS(false);
  };
  console.log("aaaaaaaa deleteId", deleteIdS);

  const DeleteUser = async () => {
    try {
      console.log(deleteIdS);
      const response = await AuthenticationServices.DeleteSalon(deleteIdS);
      if (response.data.code == "00") {
        toast.success("Salon has been Deleted Successfully");
        setOpenDS(false);
      } else {
        toast.error("An Error Occurred While Deleting Salon");
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While Deleting Salon");
    }
  };

  //   delete client
  const [openDC, setOpenDC] = React.useState(false);
  const [deleteIdC, setDeleteIdC] = useState(0);

  const handleClickOpenDC = (id) => {
    setOpenDC(true);
    setDeleteIdC(id);
  };

  const handleCloseDC = () => {
    setOpenDC(false);
  };
  console.log("aaaaaaaa deleteId", deleteIdC);

  const DeleteClient = async () => {
    try {
      console.log(deleteIdC);
      const response = await AuthenticationServices.DeleteClient(deleteIdC);
      if (response.data.code == "00") {
        toast.success("Client has been Deleted Successfully");
        setOpenDC(false);
      } else {
        toast.error("An Error Occurred While Deleting Client");
      }
    } catch (error) {
      console.log(error);
      toast.error("An Error Occurred While Deleting Client");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example">
          <Tab label="Salons" {...a11yProps(0)} />
          <Tab label="Clients" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <AdminTabPanel value={value} index={0}>
        <div className="">
          {salonList &&
            salonList?.map((salon) => (
              <div key={salon?.salonID}>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={salon?.name}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={salon?.name}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {salon?.contactNum}
                          </Typography>
                          {` — ${salon?.email}`}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleClickOpenDS(salon.salonID)}>
                              Delete Salon
                            </Button>
                            <Dialog
                              open={openDS}
                              onClose={handleCloseDS}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                {"Confirm Delete"}
                              </DialogTitle>
                              <div className="flex items-center justify-center">
                                <DeleteOutlineIcon
                                  style={{
                                    fontSize: 40,
                                    color: red[600],
                                  }}
                                />
                              </div>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure to delete salon?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseDS}>Cancel</Button>
                                <Button
                                  // variant="outlined"
                                  onClick={DeleteUser}
                                  sx={{ color: red[600] }}>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </div>
            ))}
        </div>
      </AdminTabPanel>
      <AdminTabPanel value={value} index={1}>
        <div className="">
          {clientList &&
            clientList.map((client) => (
              <div key={client.clientID}>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                  }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={client.firstName}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${client.firstName} ${client.lastName}`}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary">
                            {client.contactNum}
                          </Typography>
                          {` — ${client.email}`}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleClickOpenDC(client.clientID)
                              }>
                              Delete Client
                            </Button>
                            <Dialog
                              open={openDC}
                              onClose={handleCloseDC}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description">
                              <DialogTitle id="alert-dialog-title">
                                {"Confirm Delete"}
                              </DialogTitle>
                              <div className="flex items-center justify-center">
                                <DeleteOutlineIcon
                                  style={{
                                    fontSize: 40,
                                    color: red[600],
                                  }}
                                />
                              </div>
                              <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                  Are you sure to delete client?
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button onClick={handleCloseDC}>Cancel</Button>
                                <Button
                                  // variant="outlined"
                                  onClick={DeleteClient}
                                  sx={{ color: red[600] }}>
                                  Delete
                                </Button>
                              </DialogActions>
                            </Dialog>
                          </div>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </div>
            ))}
        </div>
      </AdminTabPanel>
    </Box>
  );
}
