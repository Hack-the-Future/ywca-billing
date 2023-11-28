import React from "react";
import {AppBar, CssBaseline, Button, Grid, CloudUploadIcon, InputLabel, Toolbar, Typography, TextField, FormControl, MenuItem} from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';

const App = () => {
    
    const vendors = ["ven1", "ven2", "ven3"]
    const levels = [1, 2, 3]

    const [selectedFile, setSelectedFile] = React.useState('')
    const [selectedVendor, setSelectedVendor] = React.useState('');
    const [selectedLevel, setSelectedLevel] = React.useState(0);
    const [notesText, setNotesText] = React.useState('')

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files);
    }
    
    const handleLevelChange = (event) => {
        setSelectedLevel(event.target.value)
    }

    const handleVendorChange = (event) => {
        setSelectedVendor(event.target.value);
    };

    const handleNotesChange = (event) => {
        setNotesText(event.target.value);
    }
    
    const handleClick = (event) => {
        alert("File upload successful!")
        //setSelectedFile(event.target.value);
        return(
            <MenuItem>selectedFile</MenuItem>
        )
    }
    

    return (
        <>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar style={{background: 'white', height: '118', width: '100%', margin: '0px', padding: '0px'}}>
                    <Grid container style={{width: '100%', margin: '0px', padding: '0'}}>
                        <Grid item xs = {9}><img src={ require('./ywca-logo.jpg')} height={118} style={{paddingTop: '10px', paddingLeft: '50px'}}/></Grid>
                        <Grid item xs = {3}  style={{background: 'orange', justifyContent: "center", alignItems: "center", display: "flex"}}><Typography variant="h1" style={{color: 'white', paddingTop: '5px', fontFamily: "Noto Sans Oriya", fontSize: '60px'}}>Billing</Typography></Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <main style={{background: "#383838"}}>

            <FormControl fullWidth>

                <TextField type="file" files={selectedFile} onChange={handleFileChange}>Upload CSV File</TextField>

                <InputLabel id="vendor-select-label">Select Vendor</InputLabel>
                <Select
                    labelId="vendor-select-label"
                    id="vendor-select-label"
                    value={selectedVendor}
                    label="Select Vendor"
                    onChange={handleVendorChange}
                >
                    {vendors.map(ven => <MenuItem value={ven}>{ven}</MenuItem>)}
                </Select>

                <div class="verticalSpace"></div>
                
                <InputLabel id="level-select-label">Select Level</InputLabel>
                <Select
                    labelId="level-select-label"
                    id="level-select-label"
                    value={selectedLevel}
                    label="Select Level"
                    onChange={handleLevelChange}
                >
                    {levels.map(level => <MenuItem value={level}>Level {level}</MenuItem>)}            
                </Select>

                <TextField multiline value={notesText} onChange={handleNotesChange}/>

                <Button variant="contained" color="primary" component="span" onClick={(e) => handleClick(e.target.files)}>
                    Upload
                </Button>
                
            </FormControl>
            </main>
        </>
    );
}

export default App;