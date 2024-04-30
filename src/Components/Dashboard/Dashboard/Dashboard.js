import AddIcon from "@mui/icons-material/Add";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import CreateIcon from "@mui/icons-material/Create";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import MenuIcon from "@mui/icons-material/Menu";
import PasswordIcon from "@mui/icons-material/Password";
import SettingsIcon from "@mui/icons-material/Settings";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Link, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../Hook/useAuth";
import PrivateRoute from "../../PrivateRoute/PrivateRoute";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddSupport from "../DashboardPage/AdminPage/AddSupport/AddSupport";
import AdminDeposit from "../DashboardPage/AdminPage/AdminDeposit/AdminDeposit";
import AdminSettings from "../DashboardPage/AdminPage/AdminSettings/AdminSettings";
import AdminWithdraw from "../DashboardPage/AdminPage/AdminWithdraw/AdminWithdraw";
import DepositAdminReport from "../DashboardPage/AdminPage/DepositAdminReport/DepositAdminReport";
import ManageAccount from "../DashboardPage/AdminPage/ManageAccount/ManageAccount";
import UserHistory from "../DashboardPage/AdminPage/UserHistory/UserHistory";
import WithdrawAdminReport from "../DashboardPage/AdminPage/WithdrawAdminReport/WithdrawAdminReport";
import Adminpassword from "../DashboardPage/Adminpassword/Adminpassword";
import UserName from "../DashboardPage/DashboardUser/UserName/UserName";
import Deposit from "../DashboardPage/Deposit/Deposit";
import SettingsPage from "../DashboardPage/SettingsPage/SettingsPage";
import Support from "../DashboardPage/Support/Support";
import UserPassword from "../DashboardPage/UserPassword/UserPassword";
import Withdraw from "../DashboardPage/Withdraw/Withdraw";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import "./Dashboard.css";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Dashbaord = () => {
  const { user, logOut, admin } = useAuth();
  let { path, url } = useRouteMatch();
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/checkAdmin/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]?.role === "admin") {
          setIsAdmin(false);
        } else {
          setIsAdmin(true);
        }
      });
  }, [user?.email]);
  console.log(admin);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          <Box>
            <AppBar open={open}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                  <Link className="useNameMain" to={`${url}/mydashboard`}>
                    Dasboard
                  </Link>
                </Typography>
              </Toolbar>
            </AppBar>

            <div className="">
              <Drawer
                sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                  },
                }}
                variant="persistent"
                anchor="left"
                open={open}
              >
                <DrawerHeader>
                  <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "ltr" ? (
                      <ChevronLeftIcon />
                    ) : (
                      <ChevronRightIcon />
                    )}
                  </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                  {isAdmin ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemIcon></ListItemIcon>
                        <Link to={`${url}/mydashboard`}>
                          <ListItemText primary={user.email} />
                        </Link>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <DashboardIcon />
                          </ListItemIcon>
                          <Link to={`${url}/mydashboard`}>
                            <ListItemText primary="Dashboard" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AddCircleOutlineIcon />
                          </ListItemIcon>
                          <Link to={`${url}/deposit`}>
                            <ListItemText primary="Deposit" />
                          </Link>
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AttachMoneyIcon />
                          </ListItemIcon>
                          <Link to={`${url}/withdraw`}>
                            <ListItemText primary="Withdraw" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ContactSupportIcon />
                          </ListItemIcon>
                          <Link to={`${url}/Support`}>
                            <ListItemText primary="Support" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <Link to={`${url}/Settings`}>
                            <ListItemText primary="Settings" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <PasswordIcon />
                          </ListItemIcon>
                          <Link to={`${url}/passwordchanage`}>
                            <ListItemText primary="Password Chanage" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AddCircleOutlineIcon />
                          </ListItemIcon>
                          <Link to={`${url}/admindeposit`}>
                            <ListItemText primary="Deposit" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AttachMoneyIcon />
                          </ListItemIcon>
                          <Link to={`${url}/admintwithdraw`}>
                            <ListItemText primary="Withdraw" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <HistoryIcon />
                          </ListItemIcon>
                          <Link to={`${url}/user`}>
                            <ListItemText primary="User History" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <Link to={`${url}/adminSettings`}>
                            <ListItemText primary="Settings" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <PasswordIcon />
                          </ListItemIcon>
                          <Link to={`${url}/adminpass`}>
                            <ListItemText primary="Password Change" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ManageAccountsIcon />
                          </ListItemIcon>
                          <Link to={`${url}/manageaccount`}>
                            <ListItemText primary="Manage Account" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AddIcon />
                          </ListItemIcon>
                          <Link to={`${url}/addsupport`}>
                            <ListItemText primary="Add Support" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ManageSearchIcon />
                          </ListItemIcon>
                          <Link to={`${url}/depositreport`}>
                            <ListItemText primary="Deposit Report" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ManageSearchIcon />
                          </ListItemIcon>
                          <Link to={`${url}/withdrawreport`}>
                            <ListItemText primary="Withdraw Report" />
                          </Link>
                        </ListItemButton>
                      </ListItem>

                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <CreateIcon />
                          </ListItemIcon>
                          <Link to={`${url}/makeAdmin`}>
                            <ListItemText primary="Make Admin" />
                          </Link>
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
                <Divider />
                <ListItem disablePadding onClick={logOut}>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <Link to="..">
                      <ListItemText primary="Logout" />
                    </Link>
                  </ListItemButton>
                </ListItem>
              </Drawer>
            </div>
            <main className="" open={open}>
              <Switch>
                <PrivateRoute path={`${path}/mydashboard`}>
                  <UserName />
                </PrivateRoute>
                <PrivateRoute path={`${path}/deposit`}>
                  <Deposit />
                </PrivateRoute>
                <PrivateRoute path={`${path}/withdraw`}>
                  <Withdraw />
                </PrivateRoute>
                <PrivateRoute path={`${path}/support`}>
                  <Support />
                </PrivateRoute>
                <PrivateRoute path={`${path}/settings`}>
                  <SettingsPage />
                </PrivateRoute>
                <PrivateRoute path={`${path}/passwordchanage`}>
                  <UserPassword />
                </PrivateRoute>

                <AdminRoute path={`${path}/admindeposit`}>
                  <AdminDeposit />
                </AdminRoute>
                <AdminRoute path={`${path}/user`}>
                  <UserHistory />
                </AdminRoute>
                <AdminRoute path={`${path}/admintwithdraw`}>
                  <AdminWithdraw />
                </AdminRoute>
                <AdminRoute path={`${path}/adminsettings`}>
                  <AdminSettings />
                </AdminRoute>
                <AdminRoute path={`${path}/adminpass`}>
                  <Adminpassword />
                </AdminRoute>
                <AdminRoute path={`${path}/manageaccount`}>
                  <ManageAccount />
                </AdminRoute>
                <AdminRoute path={`${path}/addsupport`}>
                  <AddSupport />
                </AdminRoute>
                <AdminRoute path={`${path}/depositreport`}>
                  <DepositAdminReport />
                </AdminRoute>
                <AdminRoute path={`${path}/withdrawreport`}>
                  <WithdrawAdminReport />
                </AdminRoute>

                <AdminRoute path={`${path}/makeAdmin`}>
                  <MakeAdmin></MakeAdmin>
                </AdminRoute>

                <PrivateRoute path={path}>
                  <UserName />
                </PrivateRoute>
              </Switch>
            </main>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashbaord;
