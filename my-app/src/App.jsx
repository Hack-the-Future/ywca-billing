import React from "react";
import {AppBar, CssBaseline, Grid, Toolbar, Typography} from "@mui/material"

const App = () => {
    return (
        <>
            <CssBaseline />
            <AppBar>
                <Toolbar style={{background: 'white', height: '170px'}}>
                    <Grid container>
                        <Grid item xs = {9}><img src={ require('./ywca-logo.jpg')} style={{height: '140px'}}></img></Grid>
                        <Grid item xs = {3} style={{background: 'orange', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px'}}><h1>Billing</h1></Grid>
                    </Grid>

                </Toolbar>
            </AppBar>
        </>
    );
}

export default App;