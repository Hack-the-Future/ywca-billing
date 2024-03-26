import React, { useRef } from "react";
import { Grid } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { AttachFile } from "@material-ui/icons";
function CsvInput({ handleFileChange }) {
  const csvRef = useRef(null);

  // Adjusted to handle file input directly from the DropzoneArea or the hidden input
  const handleChange = (files) => {
    // If 'files' is an array, coming from DropzoneArea
    if (Array.isArray(files)) {
      const file = files[0]; // Taking the first file
      if (file) {
        handleFileChange(file);
      }
    } else {
      // Otherwise, it's coming from the hidden input's onChange event
      const file = files.target.files[0];
      if (file) {
        handleFileChange(file);
      }
    }
  };

  return (
    <form className="csv-form">
      <div className="csv-form-group">
        <DropzoneArea
          Icon={AttachFile}
          filesLimit={1}
          acceptedFiles={["text/csv"]}
          dropzoneText={"Upload CSV File"}
          onChange={handleChange}
          maxFileSize={Infinity}
          style={{}}
        />
        <input
          type="file"
          className="csv-form-control"
          id="file"
          accept=".csv"
          onChange={handleChange}
          ref={csvRef}
          style={{ display: "none" }} // Hide the input
        />
      </div>
    </form>
  );
}

export default CsvInput;
