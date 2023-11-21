import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState, useEffect } from "react";
//Import to get ID from param
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
//import query to get user of complaint
import { GET_USER_BY_COMPLAINT } from "../../utils/queries";
//import query to get single complaint
import { GET_COMPLAINT } from "../../utils/queries";
import DisplayAllComments from "../../components/displayAllComments/displayAllComments";
// Mutations to vote
import { CREATE_VOTE } from "../../utils/mutations";
import { CREATE_VOTE_UNSUPPORTED } from "../../utils/mutations";

// Import component to add a comment
import CommentForm from "../../components/commentForm/commentForm";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
// Import from MUI
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
//Import Component to edit complaint
import EditComplaint from "../../components/editComlaint/editComplaint";
// Mutation to delete a complaint
import { DELETE_COMPLAINT } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";

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

function SingleComplaint() {
  //mutation to delete complaint
  const [deleteComplaint, { error: err }] = useMutation(DELETE_COMPLAINT);
  //modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //state for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  //state of current user
  const [currentUser, setCurrentUser] = useState("");
  //UseEffect to get username of current user
  useEffect(() => {
    if (Auth.loggedIn()) {
      const userInfo = Auth.getProfile().data.username;

      setCurrentUser(userInfo);
    } else {
      setCurrentUser("");
    }
  }, []);

  //function to openmodal
  const openModal = () => {
    setIsModalOpen(true);
  };
  //function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //save complaint ID from Params
  const { complaintID } = useParams();

  //mutation to create vote
  const [createVote, { error }] = useMutation(CREATE_VOTE);
  //mutation to creat unsupported vote
  const [createVoteUnsupported, { error: mutation_error }] = useMutation(
    CREATE_VOTE_UNSUPPORTED
  );
  //query to get a single complaint by ID
  const { loading, data } = useQuery(GET_COMPLAINT, {
    variables: { complaintID: complaintID },
  });
  //save single complaint to const
  const singleComplaint = data?.complaint || [];

  // get comments belonging to single complaint
  const complaintComments = singleComplaint.comments;
  //Query to get user of complaint by complaint ID
  const { loading: branch_loading, data: branch_data } = useQuery(
    GET_USER_BY_COMPLAINT,
    {
      variables: { complaintID: complaintID },
    }
  );

  const userComplaint = branch_data?.userComplaint || [];
  //function to handle vote
  const handleVote = async () => {
    try {
      await createVote({
        variables: { complaintID: complaintID },
      });
    } catch (err) {
      console.error(err);
    }
  };
  // function to handle unsupported vote
  const handleVoteUnsupport = async () => {
    try {
      await createVoteUnsupported({
        variables: { complaintID: complaintID },
      });
    } catch (err) {
      console.error(err);
    }
  };
  let navigate = useNavigate();
  // function to handle deletion of complaint by ID. re-route to homepage
  const handleDeleteComplaint = async () => {
    try {
      await deleteComplaint({
        variables: {
          complaintID: complaintID,
        },
      });
    } catch (err) {
      console.error(err);
    }

    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Card sx={{ display: "flex" }}>
          {/* display complaint info */}
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {singleComplaint.category}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {userComplaint.username}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {singleComplaint.date}
            </Typography>{" "}
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.title}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.description}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.votes} votes of support
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.unsupportedVotes} votes not in support
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.createdAt}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: "none", sm: "block" } }}
            image="https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
            alt="text"
          />
        </Card>
        {/* if current user is the same as the user of the complpaint, edit button for complpaint is displayed */}
        {currentUser === userComplaint.username ? (
          <div>
            <Button onClick={handleOpen}>Edit</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 400 }}>
                <EditComplaint
                  complaintId={singleComplaint._id}
                  title={singleComplaint.title}
                  category={singleComplaint.category}
                  username={userComplaint.username}
                  date={singleComplaint.date}
                  description={singleComplaint.description}
                  handleClose={handleClose}
                />
              </Box>
            </Modal>
            <div>
              <Button onClick={handleDeleteComplaint}>Delete</Button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          {/* if user is logged in and not the same as the username of complaint, vote buttons are displayed. This is to ensure a user cannot vote for their own complaint */}
          {Auth.loggedIn() && currentUser != userComplaint.username ? (
            <div>
              <button
                className="btn btn-sm btn-danger ml-auto"
                onClick={() => handleVote()}
              >
                Up vote !👍
              </button>
              <button
                className="btn btn-sm btn-danger ml-auto"
                onClick={() => handleVoteUnsupport()}
              >
                Down vote!👎
              </button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {/* if not loggged in the user is prompted to login or sign up */}
          {!Auth.loggedIn() ? (
            <p>
              You need to be logged in to add a vote or comment. Please{" "}
              <Link to="/SignIn">login</Link> or{" "}
              <Link to="/SignUp">signup.</Link>
            </p>
          ) : (
            <div></div>
          )}
        </div>
        <>
          {/* if user is logged in, and add comment button is displayed */}
          {Auth.loggedIn() ? (
            <button onClick={openModal} className="make-complaint-button">
              Add a comment
            </button>
          ) : (
            <></>
          )}
          {isModalOpen && (
            <CommentForm
              closeModal={closeModal}
              singleComplaint={singleComplaint}
            />
          )}
        </>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {/* map over comments and display */}
              {{ complaintComments } ? (
                complaintComments.map((comment) => (
                  <div key={comment._id}>
                    <DisplayAllComments
                      complaintID={complaintID}
                      comment={comment}
                      currentUser={currentUser}
                    />
                  </div>
                ))
              ) : (
                <>No Comments</>
              )}
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
}

export default SingleComplaint;
