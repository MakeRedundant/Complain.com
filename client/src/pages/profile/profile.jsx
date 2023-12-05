import "./profile.css";

import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
//Import query to get user
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
//import components
import EditUserDetails from "../../components/editUserDetails/editUserDetails";
import DeleteUser from "../../components/deleteUser/deleteUser";
//Styling for modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
//Import from MUI
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
const Profile = () => {
  //modal to update user
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //modal to delete user
  const [deleteModalOpen, setDeleteOpen] = React.useState(false);

  const handledeleteOpen = () => {
    setDeleteOpen(true);
  };
  const handledeleteClose = () => {
    setDeleteOpen(false);
  };
  //UseQuery
  const { loading, data } = useQuery(GET_ME);
  //If loading display loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  //save user to varibale
  const userData = data?.me || {};
  //save user's complaints
  const complaints = userData.complaints || [];
  //default image link
  const defaultImageLink = "https://source.unsplash.com/random?wallpapers";

  return (
    <section id="profile">
      <h1>Profile</h1>
      {/* check if user is logged in to display user's complaints, delete button and update button */}
      {Auth.loggedIn() ? (
        <div>
          <Typography variant="body1">
            Your User ID: <strong>{userData._id}</strong>
          </Typography>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "lightgreen",
              },
            }}
            onClick={handleOpen}
          >
            Update Profile
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title"></h2>
              {/* component to update user. Pass username, userId and email as props */}
              <EditUserDetails
                userID={userData._id}
                username={userData.username}
                email={userData.email}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
          <Button
            sx={{
              "&:hover": {
                backgroundColor: "red",
              },
            }}
            onClick={handledeleteOpen}
          >
            DELETE Profile
          </Button>
          <Modal
            open={deleteModalOpen}
            onClose={handledeleteClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <h2 id="parent-modal-title"></h2>
              {/* pass user ID and user name as props */}
              <DeleteUser userID={userData._id} username={userData.username} />
            </Box>
          </Modal>
          {/* map over complaints and display user's complaints. React router link added to Action area to send user to the single complaints page */}
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12} sx={{ paddingTop: "5rem" }}>
              <Typography variant="h2"> Your Complaints:</Typography>
              {complaints.map((complaint) => (
                <Grid
                  item
                  xs={12}
                  sx={{ paddingTop: "3rem" }}
                  key={complaint._id}
                >
                  <CardActionArea
                    component={Link}
                    to={`/Complaint/${complaint._id}`}
                  >
                    <Card
                      sx={{
                        display: "flex",
                        width: "100%",
                        borderRadius: 8,
                        boxShadow: 9,
                      }}
                    >
                      <CardContent sx={{ flex: 1 }}>
                        <Typography component="h2" variant="h5">
                          {complaint.title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                          {complaint.date}
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          {complaint.description}
                        </Typography>
                        <Typography variant="subtitle1" color="primary">
                          Continue reading...
                        </Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        sx={{
                          width: 160,
                          display: { xs: "none", sm: "block" },
                        }}
                        image={complaint.image || defaultImageLink}
                        alt="text"
                      />
                    </Card>
                  </CardActionArea>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </div>
      ) : (
        <p>
          You need to be logged in to view your profile. Please{" "}
          <Link to="/SignIn">login</Link> or <Link to="/SignUp">signup.</Link>
        </p>
      )}
    </section>
  );
};

export default Profile;
