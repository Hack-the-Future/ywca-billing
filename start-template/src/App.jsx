import React from "react";
import {useRef} from "react"
import Cookies from 'js-cookie';
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Slider,
  Button,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import "react-table-6/react-table.css";
import { DropzoneArea } from "material-ui-dropzone";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Papa from "papaparse";
import ReactTable from "react-table-6";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import MuiInput from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { MdOutlineFileDownload, MdTempleHindu } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { AttachFile } from "@material-ui/icons";
import CsvInput from "./CsvInput";
import CsvInterface from "./CsvInterface";
import Bill from "./Bill"
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import ReactPDF from '@react-pdf/renderer';
//import {pdf, saveAs} from "file-saver"

const App = () => {
  const [file, setFile] = React.useState(null);
  const [age, setAge] = React.useState("");
  const [level, setLevel] = React.useState("");
  const [vendorLevel, setVendorLevel] = React.useState([]);
  const [vendor, setVendor] = React.useState("");
  const [scholarship, setScholarship] = React.useState(0);
  const [vendors, setVendors] = React.useState([]);
  const [allVendors, setAllVendors] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);
  const [phoneNums, setPhoneNums] = React.useState([]);
  const [csvData, setCsvData] = React.useState(false);
  const [hours, setHours] = React.useState([]);
  const [overtimeHours, setOvertimeHours] = React.useState([]);
  const [month, setMonth] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [dryStorage, setDryStorage] = React.useState([]);
  const [numFreezers, setNumFreezers] = React.useState([]);
  const [offseason, setOffseason] = React.useState([]);



  // Integers storing info for vendor selected by user
  let thisHours;
  let thisDryStorage;
  let thisNumFreezers;
  let thisOffseason;
  let thisOvertimeHours;

  // Floats storing costs to go on bill
  let hoursSubtotal = 0.0;  // Cost based on hours without scholarship
  let freezerCost = 0.0;
  let overtimeCost = 0.0;
  let dryStorageCost = 0.0;
  let offseasonCost = 0.0;
  let scholarshipPercent = 0.0;
  let totalCost = 0.0;


  const Input = styled(MuiInput)`
    width: 52px;
  `;


  function getVendorData(currVendor) {

    thisHours = 0;
    let firstTime = true;

    // Check every line of file
    for (let i = 0; i < allVendors.length; i++) {
        // Check if vendor in curr file line matches name of vendor user selected
        if (allVendors[i] == currVendor) {
            thisHours += hours[i];

            // Other vars only set once because they should be the same for every line
            // referring to the same vendor
            if (firstTime) {
                thisDryStorage = dryStorage[i];   
                thisNumFreezers = numFreezers[i];
                thisOffseason = offseason[i];
                thisOvertimeHours = overtimeHours[i]; 
                firstTime = false;
            }
            
        }
    }
   
  }


  // Calculates bill based on values stored in global variables
  // Global variables are set by the getVendorData function
  function calculateBill() {
    /////////////////// TODO: offseason ///////////////
    dryStorageCost = 10 * (thisDryStorage / 10);
    freezerCost = 25 * thisNumFreezers;
    scholarshipPercent = 1 - (scholarship / 100);

    if (level == 1) {
        hoursSubtotal = 20 * thisHours;
        overtimeCost = 0.0;
    } 
    else if (level == 2) {
        hoursSubtotal = 300;
        overtimeCost = 10 * thisOvertimeHours;
        offseasonCost = 50 * thisOffseason;
    } 
    else if (level == 3) {
        hoursSubtotal = 400;
        overtimeCost = 8 * thisOvertimeHours;
        offseasonCost = 50 * thisOffseason;
    }

    totalCost = (hoursSubtotal * scholarshipPercent) + 
                dryStorageCost + 
                freezerCost + 
                overtimeCost + 
                offseasonCost;

    console.log("totalCost: %d", totalCost);
    Cookies.set('cost', totalCost);
    Cookies.set('dryStorage', dryStorageCost);
    Cookies.set('offSeason', offseasonCost);
    Cookies.set('overtime', overtimeCost);
    Cookies.set('freezer', freezerCost);
    Cookies.set('subtotal', hoursSubtotal);
    Cookies.set('scholarship', scholarshipPercent);
    Cookies.set('actualScholarship', scholarship);
  }
    

  // Stores all data from csv in global vars when file is uploaded
  function csvInputChange(files) {
    if (!files || files.length == 0) {
      return;
    }
    const file = Papa.unparse(files.data);
    console.log(file);
    setFile(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {

        // Update arrays with all data from file line by line
        for (let i = 0; i < results.data.length; i++) {
            contacts[i] = results.data[i].Contact_name;
            allVendors[i] = results.data[i].Vendor_name;


            vendorLevel[i] = results.data[i].Level;
            phoneNums[i] = results.data[i].Phone;
            numFreezers[i] = parseInt(results.data[i].Num_refrigerators) +
                             parseInt(results.data[i].Num_freezers);
            dryStorage[i] = parseInt(results.data[i].Sq_ft_dry_storage_needed);
            month[i] = results.data[i].Date_Month;


            let startTime = results.data[i].Start_time
            let startHours = parseInt(startTime.slice(0,2));
            let startMinutes = parseInt(startTime.slice(3));
            let endTime = results.data[i].End_time;
            let endHours = parseInt(endTime.slice(0,2));
            let endMinutes = parseInt(endTime.slice(3));
            hours[i] = (endHours - startHours) + ((endMinutes - startMinutes) / 60.0)

            overtimeHours[i] = (hours[i] > 50) ? (hours[i] - 50) : 0;
            

            let startOffseason = results.data[i].Month_off_season_storage_begins;
            let endOffseason = results.data[i].Month_off_season_storage_ends;

            // Note: assumes everything occurs in the same year
            if (month >= startOffseason && month <= endOffseason) {
                offseason[i] = 1;
            }
            else {
                offseason[i] = 0;
            }
            
        }


        // Not sure why this code is needed because it sets vendors = [], but vendor dropdown won't work without it
        // I'm just avoids the vendors array and using my own
        setVendors(
            results.data.map((entry, i) => {
                return { label: entry.Vendor_name, value: i };
            })
        );
      },
    });
  }

  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (data.length && columns.length) setLoading(false);
  }, [data, columns]);

  const handleFileChange = (file) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: handleDataChange,
    });
  };

  const makeColumns = (rawColumns) => {
    return rawColumns.map((column) => {
      return { Header: column, accessor: column };
    });
  };

  const handleDataChange = (file) => {
    setData(file.data);
    setColumns(makeColumns(file.meta.fields));
    csvInputChange(file);
  };

  // for conditional rendering the lower sections, if true the section renders
  const [selectionsComplete, setSelectionsComplete] = React.useState(false);
  const [generateComplete, setGenerateComplete] = React.useState(false);

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

  const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

  const newBill = async () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    await sleep(900); // There should be a better way of doing this.
    setSelectionsComplete(false); 
    setLoading(true);
    setFile(null);
    setVendor("")
    setScholarship(0);
    setLevel(0);
    setVendors([]);
  };

  const cont = () => {
    window.scrollTo({ top: "855", behavior: "smooth" });
  };

  const moveToEnd = () => {
    window.scrollTo({ top: "1760", behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: "855", behavior: "smooth" });
  };

  function handleChange(event) {
    setAge(event.target.value);
  }

  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const handleChangeVendor = (event, value) => {
    console.log(value);
    setVendor(value.label);
    setLevel(vendorLevel[value.value]);
    console.log(vendor);
    console.log(level);
  };

  const Newlabl = "Line1\nLine2";

  function handleScholarshipChange(event) {
    setScholarship(event.target.value);
    /*if (event.target.value < 0 || event.target.value > 100) {
      value = 0;
      setScholarship(100)
    } else {
      setScholarship(event.target.value)
    }*/
  }

  

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
    let file = files[0];

    setVendor("");
    setScholarship(0);
    setLevel(0);
    setVendors([]);

    if (file) {
      if (!file.name.endsWith(".csv")) {
        console.log("Please select only CSV files");
      }
    } else {
      console.log("Please select your file");
    }

    if (files.length != 0) {
      console.log(files[0]);
      setFile(files[0]);
      setCsvData(true);
    }
  };
  
  //Create a ref for the PDFDownloadLink component
  const downloadLinkRef = useRef();

  const handlePDFDownloadClick = () => {
    // Programmatically click the anchor element within the PDFDownloadLink component
    downloadLinkRef.current.click();
  }

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
          <div>
            {loading ? (
              // Display CsvInput while data is loading or not yet available
              <CsvInput handleFileChange={handleFileChange} />
            ) : (
              // Once loading is false, display the ReactTable with the parsed data
              <ReactTable
                data={data}
                columns={columns}
                defaultPageSize={15}
                className="-striped -highlight"
                style={{ background: "white", borderRadius: "30px" }}
              />
            )}
          </div>
        </Grid>
        <Grid
        onClick={()=>{
          console.log('here');
          if (!file) {
            toast.error("You must upload a file before using this interface.");
          }
        }}
          item
          xs={7}
          style={{
            paddingTop: "233px",
            paddingRight: "50px",
            paddingLeft: "50px",
          }}
          
        >
          <div >


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
              value={vendor}
              classes={classes}
              id="combo-box-demo"
              disabled={!vendors.length}
              options={vendors}
              isOptionEqualToValue={(one, two) => one == two}
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
          </div>

          {/* Moved the slider next to the label, and changed the slider color. */}
          <Box
            sx={{ minWidth: 120 }}
            style={{
              height: "165px",
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
                  background: "white",
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
                    background: "white",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={ async () => {
                {
                  if (file !== null) {
                    if (vendor === "") {
                      toast.error("Select a vendor!.");
                    } else {
                      setSelectionsComplete(true); 
                      await sleep(500);
                      scrollToBottom();
                    }
                    getVendorData(vendor); // Gets data for specified vendor
                    calculateBill(); // Calculates total, stored in totalCost global var
                  } else {
                    toast.error("Please upload a file!");
                  }
                }
              }}
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
              Generate Bill{" "}
              <div style={{ paddingLeft: "10px", paddingTop: "8px" }}>
                <MdNavigateNext style={{ marginTop: "10px" }} />
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
          <Toaster position="bottom-center" reverseOrder={false} />
        </Grid>
      </Grid>

      {/*{selectionsComplete && (
        <div style={{ height: "100vh", background: "#1E1E1E" }}>
       
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
                /
                <Button
                  onClick={() => {
                    setGenerateComplete(true);
                    moveToEnd();
                  }}
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
              )*/}

      {/* Bill Generate Section */}
      {selectionsComplete && (
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
                  <PDFDownloadLink document={<Bill />} fileName="bill_preview.pdf"
                  style={{
                    borderRadius: "20px",
                    width: "460px",
                    height: "100px",
                    fontSize: "32px",
                    color: "orange",
                    background: "white",
                    textTransform: "none",
                    letterSpacing: "normal",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none"
                  }}
                  >
                    {({ blob, url, loading, error }) => (loading ? 'Loading document...' :<> Download Bill <FaDownload style={{paddingLeft: '10px'}} /> </>  )}
                  </PDFDownloadLink>
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1 style={{ color: "grey", padding: "0", margin: "0", marginBottom: "25px" }}>Bill Preview</h1>
                <PDFViewer showToolbar={false} style={{height: "75%", marginBottom: '20px'}}>
                  <Bill />
                </PDFViewer>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default App;
