import React from "react";
import {AppBar, CssBaseline, Grid, Toolbar, Typography, Button} from "@mui/material"
import {DropzoneArea} from 'material-ui-dropzone'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Papa from "papaparse";
import Generate from "./Generate";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaShareSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";


const App = () => {
    const [age, setAge] = React.useState('');
    const [level, setLevel] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const handleChange2 = (event) => {
        setLevel(event.target.value);
    };

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
        <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', fontFamily: 'Noto Sans Oriya', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}>Select Vendor</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={age}
          label="Vendor"
          onChange={handleChange}
          style={{height: '100%', paddingLeft: '20px', fontSize: '20px', paddingTop: '10px'}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ minWidth: 120}} style={{height: '100px', marginTop: '50px'}}>
      <FormControl variant="filled" style={{background: 'white', borderRadius: '20px', height: '100%'}} fullWidth>
        <InputLabel id="demo-simple-select-required-label" style={{color: 'black', fontSize: '30px', height: '100%', paddingTop: '12px', paddingLeft: '25px'}}>Select Level</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={level}
          label="Vendor"
          onChange={handleChange2}
          style={{height: '100%', paddingLeft: '20px', fontSize: '20px', paddingTop: '10px'}}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
            </Grid>
            </Grid>
        </>
        <div style={{height: '100vh', background: '#1E1E1E'}}>
            <Grid container style={{height: '100%', background: "#1E1E1E"}}>
            <Grid item xs = {6} style={{paddingTop: '230px', paddingLeft: '50px', paddingTop: '230px'}}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '220px'}}>
                <Button style={{width: '450px', height: '100px', fontSize: '32px', fontFamily: "Noto Sans", color: 'white', background: 'orange', textTransform: "none", letterSpacing: "normal", fontWeight: "bold"}} sx={{ borderRadius: 5 }} variant="contained">Generate Bill</Button>
              </div>
            </Grid>
            <Grid item xs = {6} style={{paddingTop: '230px', paddingRight: '50px', paddingLeft: '50px'}}>
              <div style={{background: 'white', borderRadius: '25px', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: 'grey'}}>CSV Preview</h1>
              </div>
            </Grid>
            </Grid>
        </div>
        <div style={{height: '100vh', background: '#1E1E1E'}}>
            <Grid container style={{height: '100%', background: "#1E1E1E"}}>
            <Grid item xs = {6} style={{paddingTop: '230px', paddingLeft: '50px', paddingTop: '300px'}}>
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '70px', flexDirection: 'column'}}>
                <Button style={{width: '450px', height: '100px', fontSize: '32px', color: 'orange', background: 'white', textTransform: "none", letterSpacing: "normal", fontWeight: "bold"}} sx={{ borderRadius: 5 }} variant="contained">Download Bill <div style={{paddingLeft: "10px", paddingTop: "8px"}}><FaDownload /></div></Button>
                <Button style={{width: '450px', height: '100px', fontSize: '32px', color: 'orange', background: 'white', textTransform: "none", letterSpacing: "normal", fontWeight: "bold"}} sx={{ borderRadius: 5 }} variant="contained">Share Bill <div style = {{paddingLeft: "10px", paddingTop: "8px"}}><FaShareAlt /></div></Button>
                <Button style={{width: '450px', height: '100px', fontSize: '32px', color: 'grey', background: '#1E1E1E', textTransform: "none", letterSpacing: "normal", fontWeight: "bold"}} sx={{ borderRadius: 5 }} variant="outlined">Generate new bill</Button>
              </div>
            </Grid>
            <Grid item xs = {6} style={{paddingTop: '230px', paddingRight: '50px', paddingLeft: '50px'}}>
              <div style={{background: 'white', borderRadius: '25px', height: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h1 style={{color: 'grey'}}>Bill Preview</h1>
              </div>
            </Grid>
            </Grid>
        </div>
        </>
    );
    
}

export default App;