// import CSS for homepage
import "./Homepage.css";
import React, { useState } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import components
import LatestComplaint from "../../components/latestComplaint";
import DisplayTopVoted from "../../components/DisplayTopVoted";
// import Auth
import Auth from "../../utils/auth";
import Header from "../../components/header/header";
// import Sidebar from "../../components/sidebars/sidebar";
import { useEffect } from "react";
const theme = createTheme();
// sections to be displayed with React router links
const sections = [
  { title: "General", url: "/category/General" },
  { title: "Food", url: "/category/Food" },
  { title: "Work", url: "/category/Work" },
  { title: "Finance", url: "/category/Finance" },
  { title: "Life", url: "/category/Life" },
  { title: "Health", url: "/category/Health" },
  { title: "Technology", url: "/category/Technology" },
  { title: "Random", url: "/category/Random" },
];
// display for sidebar
// const sidebar = {
//   title: "About",
//   description: "Complaining is a way of life",
//   archives: [
//     { title: "March 2020", url: "#" },
//     { title: "February 2020", url: "#" },
//     { title: "January 2020", url: "#" },
//     { title: "November 1999", url: "#" },
//     { title: "October 1999", url: "#" },
//     { title: "September 1999", url: "#" },
//     { title: "August 1999", url: "#" },
//     { title: "July 1999", url: "#" },
//     { title: "June 1999", url: "#" },
//     { title: "May 1999", url: "#" },
//     { title: "April 1999", url: "#" },
//   ],
// };

export default function Homepage() {
  // state for admin user
  const [isAdmin, setIsAdmin] = useState();
  // useEffect to check if admin and set to state
  useEffect(() => {
    if (Auth.loggedIn()) {
      const userInfo = Auth.getProfile().data.isModerator;
      setIsAdmin(userInfo);
    } else {
      setIsAdmin(false);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container style={{ paddingTop: "90px" }} maxWidth="lg">
        <Header title="" sections={sections} />
        {/* display top voted complaint */}
        <DisplayTopVoted />
        {/* Pass Admin state to component */}
        <LatestComplaint isAdmin={isAdmin} />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          spacing={10}
          sx={{ mt: 10, height: "100vh" }}
        >
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
