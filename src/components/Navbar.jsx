import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Grid} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/constants";
import {useContext} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

export const Navbar = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return (
        <Box sx={{flexGrow: 1}} position="sticky" style={{top: 0}}>
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Grid container justifyContent={"flex-end"}>
                        {
                            user ? (
                                <Button onClick={() => auth.signOut()} color="inherit" variant={"outlined"}>Logout</Button>
                            ) : (
                                <NavLink to={LOGIN_ROUTE}>
                                    <Button color="inherit" variant={"outlined"}>Login</Button>
                                </NavLink>
                            )
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
