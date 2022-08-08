import React, {useContext} from "react";
import {Container, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Context} from "../index";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export const Login = () => {
    const {auth} = useContext(Context)

    const login = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider).then((result) => console.log(result.user) ).catch(e => console.log(e))
    }

    return (
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems={'center'}
                  justifyContent={'center'}
            >
                <Grid container
                      style={{width: 400, height: 200, background: "lightgray", borderRadius: 10}}
                      alignItems={"center"}
                      justifyContent={'center'}
                      direction={"column"}
                >
                    <Box p={'5'}>
                        <Button onClick={login} variant={'outlined'}>Login with Google</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
};