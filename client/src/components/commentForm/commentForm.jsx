import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT } from "../../utils/mutations";
// import { gql } from "@apollo/client";
import PropTypes from "prop-types";
import Auth from "../../utils/auth";

// const UPLOAD_IMAGE = gql`
//   mutation uploadImage($file: Upload!) {
//     uploadImage(file: $file) {
//       filename
//       mimetype
//       encoding
//     }
//   }
// `;

const CommentForm = ({ closeModal, singleComplaint }) => {
  const [addComment, { error }] = useMutation(CREATE_COMMENT);

  const [author, setAuthor] = useState("");

  const userInfo = Auth.getProfile().authenticatedPerson.username;

  setAuthor(userInfo);

  [complaintText, setComplaintText] = useState("");

  const [image, setImage] = useState(
    "https://i5.walmartimages.com/asr/9b971d54-7995-4a47-aa7a-adb2d7630c6c.f21033ccb62a1d89e93c2402428e6085.jpeg"
  );

  const handleTextChange = (e) => {
    setComplaintText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addComment({
        variables: {
          author: author,
          description: complaintText,
        },
      });
      setAuthor("");

      setComplaintText("");
    } catch (err) {
      console.error(err);
    }

    closeModal();
  };

  return (
    <div className="complaint-form">
      <h2>Make add a comment</h2>
      <form onSubmit={handleSubmit}>
        {/* Textarea for entering the complaint text */}
        <textarea
          placeholder="Type your comment here"
          value={complaintText}
          onChange={handleTextChange}
        />

        {/* Submission button */}
        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

// PropTypes validation to ensure that props are passed correctly
CommentForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// Export 'CommentForm' component to make it available for use in other parts of app
export default CommentForm;
