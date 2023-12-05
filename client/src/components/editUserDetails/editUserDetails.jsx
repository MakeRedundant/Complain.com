import { useState } from "react";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import { validateEmail, checkPassword } from "../../utils/helpers";
//Mutation to update user
import { UPDATE_USER } from "../../utils/mutations";

import { TextField, Button, InputAdornment } from "@mui/material";
import { AccountCircle, MailOutline, Lock } from "@mui/icons-material";

export default function EditUserDetails({ username, email }) {
  //State to set existing values in form
  const [userEmail, setUserEmail] = useState(email);
  const [userName, setUserName] = useState(username);
  const [userPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleTextChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Validation to check email is correct format
    if (!validateEmail(userEmail)) {
      setErrorMessage("Email is invalid, please try again");
      return;
    }
    if (userPassword) {
      //If user updates password, validation to check min lenght of password
      if (!userPassword) {
        setErrorMessage("Password is invalid, please try again");
        return;
      }
      try {
        //If password provided, it is passed as a variable
        const { data } = await updateUser({
          variables: {
            username: userName,
            email: userEmail,
            password: userPassword,
          },
        });
        //Update auth login to ensure latest user details are captured
        Auth.login(data.updateUser.token);
      } catch (err) {
        console.error(err);
      }
    }
    if (!validateEmail(userEmail) && userPassword) {
      if (!userPassword) {
        setErrorMessage("Password and email are invalid, please try again");
        return;
      }
    }

    try {
      //If no password provided, password is not passed as a variable. The user will keep old password
      const { data } = await updateUser({
        variables: {
          username: userName,
          email: userEmail,
        },
      });
      //Update auth login to ensure latest user details are captured
      Auth.login(data.updateUser.token);
    } catch (err) {
      console.error(err);
    }

    setErrorMessage("");
  };

  return (
    <div className="user-form">
      <h2>{userName}, update your profile? </h2>
      <form onSubmit={handleSubmit}>
        {/* Textarea for entering the complaint text */}
        <TextField
          value={userName}
          onChange={handleTextChange}
          label="Username"
          type="text"
          placeholder="Username"
          name="username"
          required
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "2rem" }}
        />
        <TextField
          value={userEmail}
          onChange={handleEmailChange}
          label="Email"
          type="email"
          placeholder="E-mail"
          name="email"
          required
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutline />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "2rem" }}
        />
        <TextField
          value={userPassword}
          onChange={handlePasswordChange}
          label="Update Password"
          type="password"
          placeholder="Update Password"
          name="password"
          fullWidth
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          sx={{ marginBottom: "2rem" }}
        />

        {/* Submission button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          Submit Update
        </Button>
      </form>
      {errorMessage && (
        <div>
          <p className="error-text p-2 error-display mt-2">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
