import React from "react";
import {AppBar, CssBaseline, Grid, Toolbar, Typography, Slider} from "@mui/material"
import {DropzoneArea} from 'material-ui-dropzone'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Papa from "papaparse"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import MuiInput from '@mui/material/Input';
import { styled } from '@mui/material/styles';
import { makeStyles } from "@material-ui/core/styles";
import Paper from '@mui/material/Paper';
import axios from "axios";
//import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';

const App = () => {
    const [file, setFile] = React.useState(null)
    const [age, setAge] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [scholarship, setScholarship] = React.useState(0);
    const vendors = ["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4", "Vendor 5", "Veo", "Variable"]
    const Input = styled(MuiInput) `width: 52px;`;

    React.useEffect(() => {
      // this will run ONLY when the file changes
      if (!file) {
        return
      }
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          console.log(results.data)
          // go through the file and update the vendors and levels
        },
      });

  }, [file])

  const generateBillCall = async () => {
      // POST because we want to include files, data, backend will parse this as form data

      let data = new FormData()
      data.append("vendor", vendor)
      data.append("level", level)
      data.append("scholarship", scholarship)
      data.append("csv", file)
      
      axios.post("http://ywcabackend.com/generateBill", data)
      .then(res => {
        // process backend response

        // probably response will contain the bill PDF file, update the state with this and display it
      })
      .catch(err => {
        console.log(err)
      })
  }


    function handleChange(event) {
        setAge(event.target.value);
    };

    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleChangeVendor = (event) => {
        setVendor(event.target.value)
    }

    function handleScholarshipChange(event) {
      
      setScholarship(event.target.value)
      // if (event.target.value > 100 ){
      //   setScholarship(100)
      // } else {
      //   setScholarship(event.target.value)
      // } 
    }
    const handleInputChange = (event) => {
      console.log("input received")
      setFile()
    }


    
    

   const useStyles = makeStyles((theme) => ({
      root: {
        "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
          // Default transform is "translate(14px, 20px) scale(1)""
          // This lines up the label with the initial cursor position in the input
          // after changing its padding-left.
          transform: "translate(34px, 20px) scale(1);"
        },
        "&.Mui-focused .MuiInputLabel-outlined": {
          color: "black"
        }
      },
      inputRoot: {
        color: "purple",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
          // Default left padding is 6px
          paddingLeft: 7
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "black"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "black"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "black"
        }
      }
    }));

  const classes = useStyles();

  
  const fileAdded = (files) => {
        if (files.length != 0) {
            console.log(files[0])
            setFile(files[0])
        }   
    }

    return (
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar style={{background: 'white', height: '170px', paddingRight: "0px"}}>
                    <Grid container style={{alignItems: 'center'}}>
                        <Grid item xs = {9} style={{justify: 'center'}}><img src={ require('./ywca-logo.jpg')} style={{height: '140px'}}></img></Grid>
                        <Grid item xs = {3} style={{background: 'orange', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}><h1>Billing</h1></Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
            <Grid container style={{height: '100vh', background: "#1E1E1E"}}>
            <Grid item xs = {5} style={{paddingTop: '230px', paddingLeft: '50px'}}><DropzoneArea
                filesLimit={1}
                acceptedFiles={['text/csv']}
                dropzoneText={"Upload CSV"}
                onChange={fileAdded}
                maxFileSize={Infinity}
                style={{}}
            /></Grid>
            <Grid item xs = {7} style={{paddingTop: '230px', paddingRight: '50px', paddingLeft: '50px'}}>
      <Box sx={{ minWidth: 120}} style={{height: '100px'}}>
      <FormControl variant="filled" style={{background: 'white', borderRadius: '20px', height: "100%"}} fullWidth>
      <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}></InputLabel>
        <Autocomplete
          disablePortal
          classes={classes}
          id="combo-box-demo"
          options={vendors}
          sx={{ color: 'black', height: '200px', width: '100%', paddingTop: '18px', fontSize: '30px' }}
          renderInput={(params) => <TextField {...params} label="Select Vendor" sx={{ fontSize: '20px', height: '300px', paddingLeft: '15px', paddingLeft: '0px'}}/>}
          PaperComponent={(props) => (
            <Paper {...props} className={classes.paper} />
          )}
        />
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120}} style={{height: '100px', marginTop: '50px'}}>
      <FormControl variant="filled" style={{background: 'white', borderRadius: '20px', height: '100%'}} fullWidth>
        <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}>Select Level</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={level}
          onChange={handleChangeLevel}
          style={{height: '100%', paddingLeft: '20px', fontSize: '20px', paddingTop: '20px'}}
      
        >
          <MenuItem value={"Level 1"}>Level 1</MenuItem>
          <MenuItem value={"Level 2"}>Level 2</MenuItem>
          <MenuItem value={"Level 3"}>Level 3</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box className={"sliderBox"}>
            <FormControl variant="filled" style={{background: 'white', borderRadius: '20px'}} fullWidth>
              <div  className="slider-container">
                <p id="demo-simple-select-required-label-scholarship" style={{color: 'black', fontSize: '20px'}}>Scholarship</p>
                <Slider className={"slider-slide"} value={scholarship} onChange={handleScholarshipChange} step={10} default={10} min={0} max={100} valueLabelDisplay="auto" labelId={"demo-simple-select-required-label-scholarship"}/>
                <TextField value={scholarship} size="small" onChange={handleScholarshipChange} InputLabelProps={{shrink: true,}} />
                <Input value={scholarship} size="small" onChange={handleScholarshipChange}/>
              </div>
            </FormControl>
    </Box>

        </Grid>
        </Grid>
      </>
    )
}

export default App;