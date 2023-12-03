//import CSS for contact page
import "./contact.css";
import React, { useState, useEffect } from "react";
//import from semantic UI
// import { Form, Input, TextArea, Button } from "semantic-ui-react";
import { TextField, TextareaAutosize, Button } from "@mui/material";
import { InputAdornment } from "@mui/material";
import { AccountCircle, MailOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid";

//import emailjs
import emailjs from "emailjs-com";

import Swal from "sweetalert2";
//import validation for emails
import { validateEmail } from "../../components/utils/Email Validate/helpers";

// EmailJS
// /Constant that stores the required IDs for sending emails via the EmailJS Service
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const USER_ID = import.meta.env.VITE_USER_ID;
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;

export default function Contact() {
  //Define states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submission, setSubmission] = useState("");

  //Function to handle when input is changed
  //Checks if input is empty and calls error message if required
  const handleInputChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputType === "email") {
      if (inputValue === "") {
        return setErrorMessage("cannot be empty"), setEmail("");
      } else {
        setEmail(inputValue);
      }
    }
    if (inputType === "name") {
      if (inputValue === "") {
        return setErrorMessage("Please include your name"), setName("");
      } else {
        setName(inputValue);
      }
    }
    if (inputType === "message") {
      if (inputValue === "") {
        return (
          setErrorMessage("Please include a message, thanks"), setMessage("")
        );
      } else {
        setMessage(inputValue);
      }
    }
    setErrorMessage("");
    setSubmission("");
  };

  //Handle when form is submitted
  const handleFormSubmit = (e) => {
    //prevent default on form
    e.preventDefault();
    //Checks if email is valid and returns a error message if not
    if (!validateEmail(email)) {
      setErrorMessage("Error! Email is invalid, please try again");
      return;
    }
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID).then(
      (result) => {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully",
        });
      },
      (error) => {
        console.log(error.text);
        Swal.fire({
          icon: "error",
          title: "Ooops, something went wrong",
          text: error.text,
        });
      }
    );
    //Alerts user after successful message sent
    setSubmission(`Thanks for your email ${name}. I'll be in contact 👍`);

    setName("");
    setMessage("");
    setErrorMessage("");
    setEmail("");
  };
  const checkName = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;

    if (inputValue.length < 1) {
      setErrorMessage(`${inputType} cannot be empty`);
    }
  };
  //Form here to handle name and message using emailjs
  return (
    <section id="contact">
      <h1>Contact</h1>
      <div className="contact-container">
        <div className="text-box">
          <div className="contact-text">
            <p>
              Need to complain to the team? <br /> Feel free to contact us here
            </p>
          </div>
        </div>
        <div className="contact-details">
          {/* All links open in a new tab */}
          <a href="tel:+9999999999" className="contact-button" style={{ paddingRight: "10px" }}>
            <i className="fas fa-phone"></i>{" "}
            Phone
          </a>
          <a
            href="https://brian-trang-portfolio.netlify.app"
            className="contact-button"
            style={{ paddingRight: "10px" }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fas fa-globe"></i>{" "}
            Website
          </a>
          <a href="mailto:Brian.trang@hotmail.com" className="contact-button" style={{ paddingRight: "10px" }}>
            <i className="fas fa-envelope"></i>{" "}
            Email
          </a>
          <a
            href="https://github.com/MakeRedundant"
            className="contact-button"
            style={{ paddingRight: "10px" }}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fab fa-github"></i>{" "}
            GitHub
          </a>
        </div>
      </div>
      <div className="title-boarder rounded-circle">
        <h1>Email me here!</h1>
      </div>
      <div className="App">
        <h3>{submission}</h3>
        <form
          headers="application/json"
          name="contact-form"
          onSubmit={handleFormSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="contact-bg alignBox">
                <TextField
                  id="form-input-control-last-name"
                  value={name}
                  name="name"
                  onBlur={checkName}
                  onChange={handleInputChange}
                  label="Name"
                  type="text"
                  placeholder="Name..."
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: "2rem" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="form-input-control-email"
                  value={email}
                  name="email"
                  onBlur={checkName}
                  onChange={handleInputChange}
                  label="Email"
                  type="email"
                  placeholder="E-mail"
                  required
                  fullWidth
                  variant="outlined"
                  sx={{ marginBottom: "2rem" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailOutline />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextareaAutosize
                  id="form-textarea-control-opinion"
                  value={message}
                  onBlur={checkName}
                  name="message"
                  onChange={handleInputChange}
                  placeholder="Message here"
                  required
                  style={{ width: "100%", marginBottom: "2rem", fontSize: "1.5rem" }}
                  minRows={5}
                  maxRows={10}
                />
                <Button
                  className="submit-button mt-2"
                  type="submit"
                  variant="contained"
                >
                  Submit
                </Button>
                {/* Error message display */}
                {errorMessage && (
                  <div>
                    <p className="error-text p-2 error-display mt-2">
                      {errorMessage}
                    </p>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
        </form>
      </div>
    </section>
  );
}
