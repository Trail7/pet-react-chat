import React from "react";
import {Container, Grid} from "@mui/material";
import '../App.css';

export const Loader = () => {
    return (
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems={'center'}
                  justifyContent={'center'}
            >
                <Grid container
                      alignItems={"center"}
                      justifyContent={'center'}
                      direction={"column"}
                >
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </Grid>
            </Grid>
        </Container>
    )
}