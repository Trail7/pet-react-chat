import React, {useContext, useState} from "react";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Container, Grid, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {Loader} from "./Loader";
import { collection, doc, query, setDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

export const Chat = () => {
    const {auth, firestore} = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        query(collection(firestore, 'messages'), orderBy("createdAt"))
    )

    const sendMessage = async () => {
        await setDoc(doc(firestore, 'messages', uuidv4()), {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <Grid container
                  style={{height: window.innerHeight - 50}}
                  alignItems={'center'}
                  justifyContent={'center'}
            >
                <div style={{width: '80%', height: '70vh', border: '1px solid grey', overflowY: 'auto'}}>
                    {messages.map(message => (
                        <div style={{
                            margin: 10,
                            border: user.uid === message.uid ? '2px solid green' : '2px solid red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5
                        }}>
                            <Grid container>
                                <Avatar src={message.photoURL}/>
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                        )
                    )}
                </div>
                <Grid container
                      direction={'column'}
                      alignItems={'flex-end'}
                      style={{width: '80%'}}
                >
                    <TextField variant={'outlined'}
                               fullWidth
                               maxRows={2}
                               value={value}
                               onChange={(e) => setValue(e.target.value)}
                               margin="dense"/>
                    <Button onClick={sendMessage} variant={'outlined'}>Send</Button>

                </Grid>

            </Grid>
        </Container>
    )
};