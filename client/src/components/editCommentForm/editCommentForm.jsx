import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT } from "../../utils/mutations";

import Auth from "../../utils/auth";

import { TextField, Button, InputAdornment } from "@mui/material";
import { AccountCircle, MailOutline, Lock } from "@mui/icons-material";


//Edit form. ComplaintID and comment passed down as props
export default function EditCommentForm({ complaintID, comment, handleClose }) {
  const userName = Auth.getProfile().data.username;
  //Mutation to update comment
  const [updateComment, { error }] = useMutation(UPDATE_COMMENT);
  const [descriptionText, setDescriptionText] = useState(comment.description);

  const handleTextChange = (e) => {
    setDescriptionText(e.target.value);
  };

  //On submit, call mutation and pass form inputs as variables
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await updateComment({
        variables: {
          complaintID: complaintID,
          commentID: comment._id,
          description: descriptionText,
          author: userName,
        },
      });
    } catch (err) {
      console.error(err);
    }
    handleClose();
  };

  return (
    <div className="comment-form">
      <h2>Update your comment {userName}</h2>
      <form onSubmit={handleSubmit}>
        {/* Textarea for entering the complaint text */}
        <TextField
          placeholder="Type your comment here"
          value={descriptionText}
          onChange={handleTextChange}
          label="comment"
          type="text"
          name="comment"
          fullWidth
          variant="outlined"
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
    </div>
  );
}
