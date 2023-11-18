import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import { useMutation } from "@apollo/client";
//Import component to edit comment
import EditCommentForm from "../../components/editCommentForm/editCommentForm";
//Import mutation to delete comment
import { DELETE_COMMENT } from "../../utils/mutations";

//Modal styling
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

//display all comments for one complaint
function DisplayAllComments({ complaintID, comment, currentUser }) {
  //Mutation to remove comment
  const [removeComment, { error }] = useMutation(DELETE_COMMENT);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //Delete comment. pass commentID and complaintID as varaibles
  const handleDeleteComment = async () => {
    try {
      await removeComment({
        variables: {
          complaintID: complaintID,
          commentID: comment._id,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
  <Grid container justifyContent="center" alignItems="center"> 
    <Grid item xs={12} md={6}>
      <Card sx={{ display: "flex" }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {comment.description}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {comment.author}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {comment.createdAt}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: "none", sm: "block" } }}
          image="https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
          alt="text"
        />
      </Card>
{/* check if logged in user is the same as the author of the comment. Edit comment can only be displayed if comment belongs to user */}
{/* delete button is also only displayed if comment belongs to logged in user  */}
{/* on click open form to edit comment passing the complaintID and comment as props */}
      {currentUser === comment.author ? (
        <div>
          <Button onClick={handleOpen}>Edit</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box sx={{ ...style, width: 400 }}>
              <EditCommentForm
                complaintID={complaintID}
                comment={comment}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
          <div>
            <Button onClick={handleDeleteComment}>Delete</Button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </Grid>
    </Grid>
  );
}

export default DisplayAllComments;
