import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BY_COMPLAINT } from "../../utils/queries";
import { GET_COMPLAINT } from "../../utils/queries";
import DisplayAllComments from "../../components/displayAllComments/displayAllComments";
import { CREATE_VOTE } from "../../utils/mutations";
import { CREATE_VOTE_UNSUPPORTED } from "../../utils/mutations";
import CommentForm from "../../components/commentForm/commentForm";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import EditComplaint from "../../components/editComlaint/editComplaint";
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
  const [deleteComplaint, { error: err }] = useMutation(DELETE_COMPLAINT);

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (Auth.loggedIn()) {
      const userInfo = Auth.getProfile().data.username;

      setCurrentUser(userInfo);
    } else {
      setCurrentUser("");
    }
  }, []);

  console.log("username " + currentUser);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const { complaintID } = useParams();
  console.log(complaintID);

  const [createVote, { error }] = useMutation(CREATE_VOTE);

  const [createVoteUnsupported, { error: mutation_error }] = useMutation(
    CREATE_VOTE_UNSUPPORTED
  );

  const { loading, data } = useQuery(GET_COMPLAINT, {
    variables: { complaintID: complaintID },
  });

  const singleComplaint = data?.complaint || [];
  console.log(singleComplaint);

  const complaintComments = singleComplaint.comments;

  const { loading: branch_loading, data: branch_data } = useQuery(
    GET_USER_BY_COMPLAINT,
    {
      variables: { complaintID: complaintID },
    }
  );

  const userComplaint = branch_data?.userComplaint || [];

  const handleVote = async () => {
    try {
      await createVote({
        variables: { complaintID: complaintID },
      });
    } catch (err) {
      console.error(err);
    }
  };

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
              {singleComplaint.votes}&aposs votes of support
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {singleComplaint.unsupportedVotes}&aposs votes not in support
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
                <h2 id="parent-modal-title">Text in a modal</h2>
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
          {Auth.loggedIn() && currentUser != userComplaint.username ? (
            <div>
              <button
                className="btn btn-sm btn-danger ml-auto"
                onClick={() => handleVote()}
              >
                How did you manage?
              </button>
              <button
                className="btn btn-sm btn-danger ml-auto"
                onClick={() => handleVoteUnsupport()}
              >
                Stop Complaining!
              </button>
            </div>
          ) : (
            <div></div>
            // <p>
            //   You need to be logged in to add a vote. Please{" "}
            //   <Link to="/SignIn">login</Link> or {" "}
            //   <Link to="/SignUp">signup.</Link>
            // </p>
          )}
        </div>
        <div>
          {!Auth.loggedIn() ? (
            <p>
              You need to be logged in to add a vote. Please{" "}
              <Link to="/SignIn">login</Link> or{" "}
              <Link to="/SignUp">signup.</Link>
            </p>
          ) : (
            <div></div>
          )}
        </div>
      </Grid>
      <Grid item xs={12} md={12}>
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {complaintComments.map((comment) => (
                <div key={comment._id}>
                  <DisplayAllComments
                    complaintID={complaintID}
                    comment={comment}
                    currentUser={currentUser}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {Auth.loggedIn() ? (
          <button onClick={openModal} className="make-complaint-button">
            Add a comment
          </button>
        ) : (
          <p>
            You need to be logged in to add a comment. Please{" "}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
        {isModalOpen && (
          <CommentForm
            closeModal={closeModal}
            singleComplaint={singleComplaint}
          />
        )}
      </Grid>
    </Grid>
  );
}

export default SingleComplaint;
