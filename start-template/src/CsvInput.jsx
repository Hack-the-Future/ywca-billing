import React, { useRef } from "react";
import {
    Grid
  } from "@mui/material";
  import { DropzoneArea } from "material-ui-dropzone";
  import { AttachFile } from '@material-ui/icons';
function CsvInput({ handleFileChange }) {
  const csvRef = useRef(null);

  const handleChange = e => {
    var file = csvRef.current.files[0];
    if (!file) return;

    handleFileChange(file);
  };
  return (
    <form className="csv-form">
      <div className="csv-form-group">
        {/* <label htmlFor="file">CSV File</label> */}
        <Grid item xs={5} style={{ paddingTop: "230px", paddingLeft: "50px" }}>
          <DropzoneArea
            Icon={AttachFile}
            filesLimit={1}
            acceptedFiles={["text/csv"]}
            dropzoneText={"Upload CSV File"}
            onChange={handleChange}
            maxFileSize={Infinity}
            style={{}} 
            />
        </Grid>
      </div>
    </form>
  );
}

export default CsvInput;