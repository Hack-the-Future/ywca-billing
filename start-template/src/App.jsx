import React from "react";
import {AppBar, CssBaseline, Grid, Toolbar, Typography} from "@mui/material"

const App = () => {
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

            </main>
        </>
    );
}

export default App;