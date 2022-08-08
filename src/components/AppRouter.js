import React, {useContext} from "react";
import {Route, Navigate, Routes} from "react-router-dom";
import {privatRoutes, publicRoutes} from "../routes";
import {CHAT, LOGIN_ROUTE} from "../utils/constants";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

export const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

    return user ? (
            <Routes>
                {privatRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} exact element={Component}/>
                )}
                <Route path='*' element={<Navigate to={CHAT}/>}/>
            </Routes>
        )
        : (
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path}  path={path} exact element={Component}/>
                )}
                <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
            </Routes>
        )
}