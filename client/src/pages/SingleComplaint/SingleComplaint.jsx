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
import CommentForm from "../../components/complaintForm/complaintForm"
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

function SingleComplaint() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <Grid item xs={12} md={6}>
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
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {singleComplaint.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {singleComplaint.votes}'s votes of support
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {singleComplaint.unsupportedVotes}'s votes not in support
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
      <div>
        {/* {Auth.loggedIn() ? ( */}
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
        {/* // ) : (
        //   <p>
        //     You need to be logged in to add a comment. Please{" "}
        //     <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        //   </p>
        // )} */}
      </div>
      <Grid item xs={12} md={6}>
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div>
              {complaintComments.map((comment) => (
                <div key={comment._id}>
                  <DisplayAllComments comment={comment} />
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={openModal} className="make-complaint-button">
          Add a comment
          </button>
          {isModalOpen && <CommentForm closeModal={closeModal} />}
      </Grid>
    </Grid>
  );
}

export default SingleComplaint;
