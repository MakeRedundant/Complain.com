//import css for footer
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import icons
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

//Copyright details for footer
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://brian-trang-portfolio.netlify.app">
        Complain.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//create theme from MUI
const defaultTheme = createTheme();

//footer
export default function FooterBottom() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CssBaseline />
        <Container
          component="main"
          sx={{ mt: 8, mb: 2 }}
          maxWidth="sm"
        ></Container>
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="body1">
              Made by Brian Trang
            </Typography>
            <div className="social-icons">
              <a
                href="https://github.com/MakeRedundant"
                aria-label="GitHub profile"
              >
                <FontAwesomeIcon icon={faGithub} size="2x" className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/brian-t-webdeveloper/"
                aria-label="LinkedIn profile"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" className="icon" />
              </a>
              <a
                href="https://twitter.com/fireship_dev"
                aria-label="Twitter profile"
              >
                <FontAwesomeIcon icon={faTwitter} size="2x" className="icon" />
              </a>
            </div>
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
