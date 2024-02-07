import React from "react";
import {AppBar, CssBaseline, Grid, Toolbar, Typography} from "@mui/material"
import {DropzoneArea} from 'material-ui-dropzone'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Papa from "papaparse";


const Generate = () => {
    (
        <>
        <div style={{height: '100vh', background: '#1E1E1E'}}>
            <Grid container style={{height: '100%', background: "#1E1E1E"}}>
            <Grid item xs = {5} style={{paddingTop: '230px', paddingLeft: '50px'}}><DropzoneArea
                filesLimit={1}
                acceptedFiles={['text/csv']}
                dropzoneText={"Upload CSV"}
                maxFileSize={Infinity}
                style={{}}
            /></Grid>
            <Grid item xs = {7} style={{paddingTop: '230px', paddingRight: '50px', paddingLeft: '50px'}}>
            </Grid>
            </Grid>
        </div>
        </>
    );
}

export default Generate;