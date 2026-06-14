import React, { Fragment, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Grid, Paper, Avatar, TextField, Checkbox, FormControlLabel,
    Button, Typography, Link
} from '@mui/material'

// MUI Icons
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
// Our CSS Module:
import LoginCSS from "./css/Login.module.css";
// Using Styled-Components to apply <body> bacjaground image only on this page:
import styled, { createGlobalStyle } from 'styled-components';
// ======= Form Validation (Fromik & Yup): ==========
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
// ======== HTTP Request to Backend: =========
import axios from 'axios'
import axiosInstance from "../../api/axios";
// =============== Snackbar Notification Alert: ===========
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
/* react-redux has 2 hooks: 
    1. useSelector: to access the states
    2. useDispatch: to modify/update/set the states 
*/
import { setSnackbar } from "../../store/slices/snackbarSlice";
import { loginPending, loginSuccess, loginFail } from "../../store/slices/loginSlice";

// --------- React-Router-Dom ---------------
import { Navigate, Location, useLocation } from "react-router-dom";

// Since the server creates a cookie with the name: 'access-token'
// and it will be httpOnly: true, then we can't access it from browser, so no need
// to the following library right now:
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

interface LoginFormAttrs {
    // Login Form Attributes
    username: string;
    password: string;
}

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, isAuth, errorMessage }: any = useSelector((state: RootState) => state.login);
    const location: Location = useLocation(); //returns the current location object, which represents the current URL in web browsers.
    console.log(location);

    // useEffect(() => {
    //     dispatch(setSnackbar({
    //         snackbarOpen: true,
    //         snackbarType: "error",
    //         snackbarMessage: errorMessage,
    //     }))
    // }, [errorMessage]);

    const paperStyle: any = {
        padding: "44px 40px 36px",
        width: "420px",
        maxWidth: "92vw",
        margin: "0px auto",
        background: "rgba(255, 255, 255, 0.97)",
        backdropFilter: "blur(6px)",
        position: "relative",
        zIndex: "2",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 30px 70px rgba(6,26,51,0.45)",
        // gold hairline accent across the top of the card
        borderTop: "3px solid #C8A24B",
    };
    const avatarStyle = {
        background: "linear-gradient(135deg, #C8A24B 0%, #A07F2E 100%)",
        color: "#061A33",
        width: 60,
        height: 60,
        marginBottom: "14px",
        boxShadow: "0 8px 20px rgba(200,162,75,0.4)",
    };
    const btnStyle = {
        marginTop: "22px",
        paddingBlock: "11px",
        fontSize: "1rem",
    };
    const txtFieldStyle = {
        textTransform: "none",
        marginBottom: "18px"
    };
    const errMsgStyle = {
        color: "red"
    };
    // ============== End My Custom Styles for MUI Components: ==============

    // ============== Formik & Yup for Validation: ==============
    const initialValues = {
        username: "",
        password: "",
        rememberMe: false,
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required"),
        password: Yup.string().required("Required").min(4)
    });
    // ============== End Formik & Yup for Validation: ==============

    const onSubmit = (values: LoginFormAttrs, props: any) => {
        console.log(values);
        dispatch(loginPending());

        const { username, password } = values;

        const response = axios.post(
            `${process.env.REACT_APP_API_URL}auth/login`,
            { username, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true,
                /* XMLHttpRequest from a different domain cannot set cookie values for their 
                own domain unless withCredentials is set to true before making the request.*/
            }
        ).then((response) => {
            // const { message, type, tokenData } = response.data;
            const { tokenData, message, type, employeeCurrentPositionId } = response.data;
            //tokenData is an object
            if (type === "success") {
                // ---- Store token data in the redux global state (login):
                dispatch(
                    loginSuccess(tokenData)
                );
                // dispatch(getUserProfile());
                // --- Now, store the data that will be changing in the localStorage:
                localStorage.setItem("employeeCurrentPositionId", employeeCurrentPositionId);
            }
            else {
                // Show a Snackbar Notification Alert:
                dispatch(
                    setSnackbar({
                        snackbarOpen: true,
                        snackbarType: type,
                        snackbarMessage: message,
                        autoHideDuration: 5000,
                    })
                );
                // Set the login state:
                dispatch(loginFail(message));
            }
        }).catch(err => {
            dispatch(loginFail(err.message));
        });
    }

    return (
        <Fragment >
            {isAuth === true ? (
                <Navigate to="/" state={{ from: location }} replace />
                // {navigate(-1)}
            ) : (
                <Grid className={LoginCSS["main-container"]}>
                    <Paper
                        sx={{ textTransform: 'none' }}
                        elevation={3}
                        style={paperStyle}
                    >
                        <Grid className={LoginCSS["paper-title"]}>
                            <Avatar style={avatarStyle}><LockOpenOutlinedIcon /></Avatar>
                            <Typography
                                variant="overline"
                                sx={{ color: "secondary.dark", letterSpacing: "0.22em", fontWeight: 700 }}
                            >
                                Mail Tracking &amp; Management
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{ color: "primary.main", fontWeight: 600, mt: 0.5 }}
                            >
                                Welcome back
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", mt: 0.5, mb: 1 }}
                            >
                                Sign in to manage your correspondence
                            </Typography>
                        </Grid>
                        {/* Formik will not call onSubmit() validationSchema is satisfied*/}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <Field
                                        // In order to tell Formik that I am using MUI, I have
                                        // to write the as={} property and specify the MUI component's name:
                                        as={TextField}
                                        name="username"
                                        label="Username"
                                        placeholder="name@institution.edu"
                                        variant="outlined"
                                        fullWidth //will take fillWidth fo its container
                                        // required
                                        style={txtFieldStyle}
                                        helperText={
                                            <ErrorMessage
                                                name="username"
                                                render={msg => <span className={LoginCSS.errMsg}>{msg}</span>}
                                            />
                                        }
                                    // helperText is a MUI prop, and we pass to it the
                                    // Formik's <ErrorMessage /> compoent to be rendered. 
                                    // We shoul tell Formik the `name` to know which error to show.
                                    />
                                    <Field
                                        as={TextField}
                                        type="password"
                                        name="password"
                                        label="Password"
                                        placeholder="Enter your password"
                                        variant="outlined"
                                        fullWidth //will take fillWidth fo its container
                                        // required
                                        style={txtFieldStyle}
                                        helperText={
                                            <ErrorMessage
                                                name="password"
                                                render={msg => <span className={LoginCSS.errMsg}>{msg}</span>}
                                            />
                                        }
                                    />
                                    {/* <Field
                                        as={FormControlLabel}
                                        name="rememberMe"
                                        control={
                                            <Checkbox
                                                color="primary"
                                                size="small"
                                            // checked={checked}
                                            // onChange={handleChange}
                                            />
                                        }
                                        label="Remember me"
                                    /> */}
                                    <Button
                                        type='submit'
                                        color='primary'
                                        variant="contained"
                                        // onClick={}
                                        style={btnStyle}
                                        fullWidth
                                        startIcon={<LoginOutlinedIcon />}
                                        disabled={isLoading as boolean}
                                    >
                                        {isLoading ? "Submitting.." : "Login"}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Typography align='center'>
                            {/* <Link href="/forgot-password">
                                Forgot password?
                            </Link> */}
                            <Button
                                sx={{ textTransform: 'none' }}
                                color="primary"
                                variant="text"
                                // onClick={() => navigate("/forgot-password")}
                                onClick={() => navigate("/forgot-password-faris")}
                            >
                                Forgot password?
                            </Button>
                        </Typography>
                    </Paper>
                </Grid>
            )
            }
        </Fragment >
    )
}
export default Login

