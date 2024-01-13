import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import BookIcon from "@mui/icons-material/Book";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AngryIcon from "@mui/icons-material/SentimentVeryDissatisfied";

import AuthService from "../../utils/auth";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:814px)");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const currentPage = useLocation().pathname;
  const isAuthenticated = AuthService.loggedIn();

  const handleLogout = () => {
    AuthService.logout();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { to: "/", text: "Home", icon: <HomeIcon /> },
    { to: "/profile", text: "Profile", icon: <AccountCircleIcon /> },
    { to: "/contact", text: "Contact", icon: <PhoneIcon /> },
    { to: "/terms", text: "T&Cs", icon: <BookIcon /> },
    { to: "/donate", text: "Donate", icon: <FavoriteIcon /> },
    { to: "/complainred", text: "Complain Red", icon: <AngryIcon /> },
  ];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "black" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isMobile ? (
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            // Render desktop buttons
            navLinks.map((link) => (
              <Link to={link.to} className="nav-link" key={link.text}>
                <Button
                  color="inherit"
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "blue",
                    },
                  }}
                >
                  {link.icon && <Box sx={{ marginRight: 1 }}>{link.icon}</Box>}
                  {link.text}
                </Button>
              </Link>
            ))
          )}
          {isAuthenticated ? (
            <Button
              onClick={handleLogout}
              color="inherit"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "purple",
                },
              }}
            >
              Logout
            </Button>
          ) : (
            <Link
              to="/signup"
              className={
                currentPage === "/signup" ? "nav-link active" : "nav-link"
              }
            >
              <Button
                color="inherit"
                sx={{
                  color: "white",
                  "&:hover": {
                    backgroundColor: "purple",
                  },
                }}
              >
                Sign Up/In
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {navLinks.map((link) => (
              <Link
                to={link.to}
                className="nav-link"
                key={link.text}
                onClick={toggleDrawer(false)}
              >
                <ListItem button>
                  <ListItemText primary={link.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default NavBar;
