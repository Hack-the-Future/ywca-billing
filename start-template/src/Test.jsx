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
//import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
//import { useDemoData } from '@mui/x-data-grid-generator';



const App = () => {
    const [age, setAge] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [vendor, setVendor] = React.useState('');
    const [scholarship, setScholarship] = React.useState(0);
    const vendors = ["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4", "Vendor 5", "Veo", "Variable"]
    const Input = styled(MuiInput) `width: 52px;`;


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const handleChangeLevel = (event) => {
        setLevel(event.target.value);
    };

    const handleChangeVendor = (event) => {
        setVendor(event.target.value)
    }

    const handleScholarshipChange = (event) => {
      setScholarship(event.target.value)
    }

    // const handleInputChange = (event) => {
    //   setScholarship(event.target.value)

    // };
  
    


    const fileAdded = (files) => {
        if (files.length != 0) {
            console.log(files[0])
            Papa.parse(files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                  console.log(results.data)
                },
              });
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
          id="combo-box-demo"
          options={vendors}
          sx={{ color: 'black', height: '100%', width: 783, paddingTop: '12px', fontSize: '30px' }}
          renderInput={(params) => <TextField {...params} label="Select Vendor" />}
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
                <Slider className={"slider-slide"} value={scholarship} onChange={handleScholarshipChange} step={10} default={10} marks min={0} max={100} valueLabelDisplay="auto" labelId={"demo-simple-select-required-label-scholarship"}/>
                <Input value={scholarship} size="small" onChange={handleScholarshipChange} inputProps = {{step: 10, min: 0, max: 100, type: 'number', 'aria-labelledby':' input-slider'}} />
              </div>
            </FormControl>
    </Box>

        </Grid>
        </Grid>
      </>
    );
}

export default App;
