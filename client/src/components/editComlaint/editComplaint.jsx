import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
//Import datepicker incase user needs to change date
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UPDATE_COMPLAINT } from "../../utils/mutations";
import PropTypes from "prop-types";
import "./editComplaint.css";

import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function EditComplaint({
  complaintId,
  title,
  category,
  date,
  description,
  handleClose,
}) {
  //Set states from porps to fill default values in form
  const [complaintTitle, setTitle] = useState(title);
  const [complaintCategory, setCategory] = useState(category);
  const [complaintText, setComplaintText] = useState(description);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [updateComplaint, { error }] = useMutation(UPDATE_COMPLAINT);

  //Handle chnage in form. Validation included to ensure user provides a description
  const handleTextChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputValue === "") {
      return (
        setErrorMessage("Please include a description"), setComplaintText("")
      );
    } else {
      setComplaintText(e.target.value);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  //Validation included. Title required
  const handleTitleChange = (e) => {
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;
    if (inputValue === "") {
      return setErrorMessage("Please include a Title"), setTitle("");
    } else {
      setTitle(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Handle submit if date note included. Previous value for date passes as variable
    if (selectedDate === null) {
      try {
        const { data } = await updateComplaint({
          variables: {
            complaintID: complaintId,
            description: complaintText,
            title: complaintTitle,
            category: complaintCategory,
            date: date,
          },
        });
      } catch (err) {
        console.error(err);
      }
      handleClose();
    } else {
      //If date selected. Date is first formatted and then passed as variable
      const test = selectedDate.toString();
      const myArray = test.split(" ");
      let elementstodelete = 6;
      let k = myArray.filter((x, i) => i + elementstodelete < myArray.length);
      const formattedDate = k.join(" ");
      try {
        const { data } = await updateComplaint({
          variables: {
            complaintID: complaintId,
            description: complaintText,
            title: complaintTitle,
            category: complaintCategory,
            date: formattedDate,
          },
        });
      } catch (err) {
        console.error(err);
      }
      handleClose();
    }
  };

  return (
    <div className="complaint-form">
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={complaintCategory}
            label="Category"
            onChange={handleCategoryChange}
            sx={{
              marginBottom:"15px"
            }}
          >
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Work">Work</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Life">Life</MenuItem>
            <MenuItem value="Health">Health</MenuItem>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Random">Random</MenuItem>
          </Select>
        </FormControl>
        {/* Textarea for entering the title and complaint text */}
        <TextField
          placeholder="Title"
          value={complaintTitle}
          label="Title"
          name="title"
          type="text"
          required
          onChange={handleTitleChange}
          fullWidth
          variant="outlined"
          multiline
          rows={3}
          sx={{
            marginBottom:"15px"
          }}
        />
        <TextField
          placeholder="Type your complaint here"
          value={complaintText}
          label="Description"
          name="Description"
          type="text"
          required
          onChange={handleTextChange}
          fullWidth
          variant="outlined"
          multiline
          rows={5}
        />
        {/* date */}
        <div className="App">
          <DatePicker
            selected={selectedDate}
            placeholderText={date}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        <button type="submit">Submit Updated Complaint</button>
      </form>
    </div>
  );
}

EditComplaint.propTypes = {
  complaintId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleClose: PropTypes.func,
};
