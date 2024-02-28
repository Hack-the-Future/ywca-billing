import React from "react";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Papa from "papaparse";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { AttachFile } from '@material-ui/icons';
//import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';

const App = () => {
  const [file, setFile] = React.useState(null);
  const [age, setAge] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [vendor, setVendor] = React.useState("");
  const [scholarship, setScholarship] = React.useState(0);
  const vendors = [
    "Vendor 1",
    "Vendor 2",
    "Vendor 3",
    "Vendor 4",
    "Vendor 5",
    "Veo",
    "Variable",
  ];
  const Input = styled(MuiInput)`
    width: 52px;
  `;

  React.useEffect(() => {
    // this will run ONLY when the file changes
    if (!file) {
      return;
    }
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results.data);
        // go through the file and update the vendors and levels
      },
    });
  }, [file]);

  const generateBillCall = async () => {
    // POST because we want to include files, data, backend will parse this as form data

    let data = new FormData();
    data.append("vendor", vendor);
    data.append("level", level);
    data.append("scholarship", scholarship);
    data.append("csv", file);

    axios
      .post("http://ywcabackend.com/generateBill", data)
      .then((res) => {
        // process backend response
        // probably response will contain the bill PDF file, update the state with this and display it
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const newBill = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cont = () => {
    window.scrollTo({ top: "855", behavior: "smooth" });
  };

  const moveToEnd = () => {
    window.scrollTo({ top: "1760", behavior: "smooth" });
  };

  function handleChange(event) {
    setAge(event.target.value);
  }

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleChangeVendor = (event, value) => {
    console.log(value);
    setVendor(event.target.value);
    console.log(vendor);
  };

  const Newlabl = "Line1\nLine2";

  function handleScholarshipChange(event) {
    setScholarship(event.target.value);
    // if (event.target.value > 100 ){
    //   setScholarship(100)
    // } else {
    //   setScholarship(event.target.value)
    // }
  }
  const handleInputChange = (event) => {
    console.log("input received");
    setFile();
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
        // Default transform is "translate(14px, 20px) scale(1)""
        // This lines up the label with the initial cursor position in the input
        // after changing its padding-left.
        transform: "translate(34px, 27px);",
        fontSize: "30px",
        color: "black",
      },
      "&.Mui-focused .MuiInputLabel-outlined": {
        transform: "translate(0px, 27px)",
        color: "transparent",
        background: "transparent",
        opacity: "0",
        fontSize: "30px",
        display: "none",
        top: "0",
      },
    },
    inputRoot: {
      color: "black",
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: "0",
      },
      // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
      '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
        // Default left padding is 6px
        fontSize: "30px",
        paddingLeft: "24px",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "black",
      },
    },
  }));

  const classes = useStyles();

  const fileAdded = (files) => {
    if (files.length != 0) {
      console.log(files[0]);
      setFile(files[0]);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar
          style={{ background: "white", height: "170px", paddingRight: "0px" }}
        >
          <Grid container style={{ alignItems: "center" }}>
            <Grid item xs={9} style={{ justify: "center" }}>
              <img
                src={require("./ywca-logo.jpg")}
                style={{ height: "140px" }}
              ></img>
            </Grid>
            <Grid
              item
              xs={3}
              style={{
                background: "orange",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
              }}
            >
              <h1>Billing</h1>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid container style={{ height: "100vh", background: "#1E1E1E" }}>
        <Grid item xs={5} style={{ paddingTop: "230px", paddingLeft: "50px" }}>
          <DropzoneArea
            Icon={AttachFile}
            filesLimit={1}
            acceptedFiles={["text/csv"]}
            dropzoneText={"Upload CSV File"}
            onChange={fileAdded}
            maxFileSize={Infinity}
            style={{}}
          />
        </Grid>
        <Grid
          item
          xs={7}
          style={{
            paddingTop: "233px",
            paddingRight: "50px",
            paddingLeft: "50px",
          }}
        >
          <FormControl
            variant="filled"
            style={{
              borderRadius: "0px",
              height: "130px",
            }}
            fullWidth
          >
            {/* Styling for this is in CSS file */}
            <Autocomplete
              onChange={handleChangeVendor}
              disablePortal
              classes={classes}
              id="combo-box-demo"
              options={vendors}
              sx={{
                color: "black",
                fontSize: "30px",
              }}
              renderInput={(params) => (
                <div>
                  <TextField
                    label="Select Vendor"
                    InputLabelProps={{ fontSize: "40px" }}
                    sx={{
                      height: "300px",
                      paddingLeft: "15px",
                      paddingLeft: "0px",
                    }}
                    {...params}
                  />
                </div>
              )}
              PaperComponent={(props) => (
                <Paper {...props} className={classes.paper} />
              )}
            />
          </FormControl>

          <Box
            sx={{ minWidth: 120 }}
            style={{ height: "100px", marginTop: "20px", }}
            
          >
            <FormControl
              variant="filled"
              style={{
                background: "white",
                borderRadius: "20px",
                height: "100%",
                background: "white"
              }}
              fullWidth
            >
              <InputLabel
                id="demo-simple-select-required-label"
                style={{
                  color: "black",
                  fontSize: "30px",
                  height: "100%",
                  paddingTop: "12px",
                  paddingLeft: "25px",
                  
                }}
              >
                Select Level
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={level}
                onChange={handleChangeLevel}
                style={{
                  height: "100%",
                  paddingLeft: "20px",
                  fontSize: "20px",
                  paddingTop: "20px",
                }}
              >
                <MenuItem value={"Level 1"}>Level 1</MenuItem>
                <MenuItem value={"Level 2"}>Level 2</MenuItem>
                <MenuItem value={"Level 3"}>Level 3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Moved the slider next to the label, and changed the slider color. */}
          <Box
            sx={{ minWidth: 120 }}
            style={{
              height: "165px",
              marginTop: "53px",
              borderRadius: "20px",
              background: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingLeft: "20px",
              }}
            >
              <p
                id="demo-simple-select-required-label-scholarship"
                style={{
                  color: "black",
                  fontSize: "30px",
                  paddingLeft: "20px",
                  background: "white"
                }}
              >
                Scholarship (%){" "}
                <TextField
                  value={scholarship}
                  size="small"
                  onChange={handleScholarshipChange}
                  InputLabelProps={{ shrink: true }}
                  style={{
                    paddingLeft: "20px",
                    border: "30px",
                    borderColor: "black",
                    background: "white"
                  }}
                />
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slider
                aria-label="Temperature"
                defaultValue={0}
                value={scholarship}
                valueLabelDisplay="auto"
                shiftStep={30}
                step={10}
                marks
                min={0}
                max={100}
                onChange={handleScholarshipChange}
                style={{ width: "89%", color: "orange" }}
              />
            </div>
          </Box>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button
                onClick={cont}
                style={{
                  marginTop: "53px",
                  width: "450px",
                  height: "50px",
                  fontSize: "30px",
                  color: "white",
                  background: "orange",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                Continue{" "}
                <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                <MdNavigateNext style={{marginTop: "10px"}} />
                </div>
              </Button>
            </div>
          

          {/*<Box className={"sliderBox"}>
            <FormControl
              variant="filled"
              style={{
                background: "white",
                borderRadius: "20px",
                height: "100%",
              }}
              fullWidth
            >
              <div className="slider-container">
                <p
                  id="demo-simple-select-required-label-scholarship"
                  style={{
                    color: "black",
                    fontSize: "30px",
                    paddingLeft: "20px",
                  }}
                >
                  Scholarship
                </p>
                <Slider
                  className={"slider-slide"}
                  value={scholarship}
                  onChange={handleScholarshipChange}
                  step={10}
                  default={10}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                  labelId={"demo-simple-select-required-label-scholarship"}
                />
                <TextField
                  value={scholarship}
                  size="small"
                  onChange={handleScholarshipChange}
                  InputLabelProps={{ shrink: true }}
                />
                <Input
                  value={scholarship}
                  size="small"
                  onChange={handleScholarshipChange}
                />
              </div>
            </FormControl>
          </Box>*/}
        </Grid>
      </Grid>

      <div style={{ height: "100vh", background: "#1E1E1E" }}>
        {/* Bill Preview Section */}
        <Grid container style={{ height: "100%", background: "#1E1E1E" }}>
          <Grid
            item
            xs={6}
            style={{
              paddingTop: "230px",
              paddingLeft: "50px",
              paddingTop: "230px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "220px",
              }}
            >
              <Button
                onClick={moveToEnd}
                style={{
                  width: "450px",
                  height: "100px",
                  fontSize: "32px",
                  color: "white",
                  background: "orange",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                Generate Bill
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              paddingTop: "230px",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "25px",
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: "grey" }}>CSV Preview</h1>
            </div>
          </Grid>
        </Grid>
      </div>

      {/* Bill Generate Section */}
      <div style={{ height: "100vh", background: "#1E1E1E" }}>
        <Grid container style={{ height: "100%", background: "#1E1E1E" }}>
          <Grid
            item
            xs={6}
            style={{
              paddingTop: "230px",
              paddingLeft: "50px",
              paddingTop: "300px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "70px",
                flexDirection: "column",
              }}
            >
              <Button
                style={{
                  width: "450px",
                  height: "100px",
                  fontSize: "32px",
                  color: "orange",
                  background: "white",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                Download Bill{" "}
                <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                  <FaDownload />
                </div>
              </Button>
              <Button
                style={{
                  width: "450px",
                  height: "100px",
                  fontSize: "32px",
                  color: "orange",
                  background: "white",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 5 }}
                variant="contained"
              >
                Share Bill{" "}
                <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                  <FaShareAlt />
                </div>
              </Button>
              <Button
                style={{
                  width: "450px",
                  height: "100px",
                  fontSize: "32px",
                  color: "grey",
                  background: "#1E1E1E",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
                sx={{ borderRadius: 5 }}
                variant="outlined"
                onClick={newBill}
              >
                Generate new bill
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              paddingTop: "230px",
              paddingRight: "50px",
              paddingLeft: "50px",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "25px",
                height: "90%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1 style={{ color: "grey" }}>Bill Preview</h1>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default App;
