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

const App = () => {
    const [age, setAge] = React.useState('');
    const [level, setLevel] = React.useState('Select Level');
    const [vendor, setVendor] = React.useState('Select Vendor');
    const [scholarship, setScholarship] = React.useState(0);
    const vendors = ["Vendor 1", "Vendor 2", "Vendor 3", "Vendor 4", "Vendor 5", "Veo", "Variable"]
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
      <FormControl variant="filled" style={{background: 'white', borderRadius: '20px', height: '100%'}} fullWidth>
        <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}>{vendor}</InputLabel>
        <Autocomplete
        id="autocomplete-input"
        options={vendors}
        renderInput={(params) => (
          <TextField {...params} label="Vendors" variant="outlined" />
        )}
      />
      
          <MenuItem value={"Vendor 1"}>Vendor 1</MenuItem>
          <MenuItem value={"Vendor 2"}>Vendor 2</MenuItem>
          <MenuItem value={"Vendor 3"}>Vendor 3</MenuItem>
          <MenuItem value={"Vendor 4"}>Vendor 4</MenuItem>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120}} style={{height: '100px', marginTop: '50px'}}>
      <FormControl variant="filled" style={{background: 'white', borderRadius: '20px', height: '100%'}} fullWidth>
        <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}>{level}</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={""}
          label="Vendor"
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
                <InputLabel id="demo-simple-select-required-label-scholarship" style={{color: 'black', fontSize: '30px', paddingTop: '25px', paddingLeft: '25px'}}>Scholarship</InputLabel>
                <Slider className={"slider-slide"} value={scholarship} onChange={handleScholarshipChange} step={10} marks min={0} max={100} labelId={"demo-simple-select-required-label-scholarship"}/>
              </div>
            </FormControl>
    </Box>

            </Grid>
            </Grid>

      </>
    );
}

export default App;
