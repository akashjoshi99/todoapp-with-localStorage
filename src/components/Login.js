import React, { useState } from 'react'
import "./Login.css"
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import { Button } from '@material-ui/core';
import {auth, provider} from "../firebase"
import { useStateValue } from '../StateProvider';
import { actionTypes } from '../reducer';

function Login() {
    const [{}, dispatch] = useStateValue()

    const signIn = () => {
        auth.signInWithPopup(provider).then(result => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user
            })
            console.log(result)
        }).catch((error) => alert(error.message))
    }


    return (
        <div className="login">
            <div className="login__container">
                <div className="login__logos">
                <LockOpenRoundedIcon style={{ fontSize: 80 }}/>
                </div>

                <div className="login__text">
                    <h1>Sign in with google</h1>
                </div>
                <Button onClick={signIn}>Sign In</Button>
            </div>
            
        </div>
    )
}



export default Login

