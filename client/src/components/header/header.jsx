import React, { useState } from "react";
//import CSS for header
import "./header.css";

import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ComplaintForm from "../../components/complaintForm/complaintForm";
import Auth from "../../utils/auth";

function Header(props) {
  const { sections, title } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const userIsLoggedIn = Auth.loggedIn(); // Check if the user is logged in

  return (
    <React.Fragment>
      <Toolbar
        className="header"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Button
          className="header-subscribe"
          variant="contained"
          color="primary"
        >
          Subscribe
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          className="header-title"
        >
        🗣️ Featured Complaint
        </Typography>

        {userIsLoggedIn && ( // Display the "Make a Complaint" button only if the user is logged in
          <Button
            onClick={openModal}
            className="header-complaint"
            variant="contained"
            color="primary"
          >
            Make a Complaint
          </Button>
        )}
        {isModalOpen && <ComplaintForm closeModal={closeModal} />}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {/* map over sections and display. add links to corresponding sections */}
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            className="header-nav-link"
            sx={{
              p: 1,
              flexShrink: 0,
              textDecoration: "underline",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#3f51b5",
                color: "#fff",
                borderRadius: "4px",

              },
            }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
