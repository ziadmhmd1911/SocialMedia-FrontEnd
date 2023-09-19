import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {Avatar , Button , Paper , Grid , Typography , Container, TextField} from '@material-ui/core';
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input'
import { GoogleLogin , googleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import jwt_decode from 'jwt-decode';
import Icon from "./Icon";
import {signIn , signUp} from '../../actions/auth'
const initialState = {firstName:'', lastName:'', email:'', password:'', confirmPassword:''}
const Auth = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [showPassword , setShowPassword] = useState(false);
    const [isSignup , setIsSignup] = useState(false);
    const [formData , setFromData] = useState(initialState);

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword); 

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(formData);
        if (isSignup) {
            dispatch(signUp(formData, history))
        } else {
            dispatch(signIn(formData, history))
        }
    }
    const handleChange = (e) => {
        setFromData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const decoded = jwt_decode(res.credential);
        try {
            dispatch({type: 'AUTH', data: {decoded}});
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }
    const googleFailure = () => {
        console.log('Google sign in unsuccessful')
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? `Sign Up` : `Sign In`}</Typography>
                <from className={classes.form} onSubmit={handleSubmit} > 
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={handleSubmit}>
                        {isSignup? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId = "574857338655-q9lde667ne4r9j3nnp9918aai9q0g304.apps.googleusercontent.com"
                        render = {(renderProps) => (
                            <Button className={classes.googleButton}color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                             </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy= "single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
                            </Button>
                        </Grid>
                    </Grid>
                </from>
            </Paper>
        </Container>
    )
}

export default Auth;