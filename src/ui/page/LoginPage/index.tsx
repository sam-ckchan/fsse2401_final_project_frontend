import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import NavbarTop from "../../component/NavbarTop";
import * as FirebaseAuthService from "../../../authService/firebaseAuthService.ts"
import {FormEvent, useState} from "react";
import {Alert, Snackbar} from '@mui/material';
import {useLoginUserContext} from "../../../context/LoginUserProvider.tsx";
import {GoogleLoginButton} from "react-social-login-buttons";
import {Divider} from "@mui/material";
import {StyledRDDLink} from "../../component/StyledRDDLink";


const googleLoginBtnStyle = {
    width: "100%",
    margin: "0 0 2rem",
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
}

const defaultFormFields = {
    email: "",
    password: "",
};

export default function LoginPage() {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)
    const {email, password} = formFields

    const navigate = useNavigate()

    const loginUser = useLoginUserContext()

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isSuccess = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password)
        if (isSuccess) {
            navigate("/")
        } else {
            setIsSnackbarOpen(true)
        }
        setFormFields(defaultFormFields)
    };

    const handleClose = () => {
        setIsSnackbarOpen(false);
    };

    return <>
        <NavbarTop/>
        {!loginUser
            ? <Grid container component="main" sx={{height: '91vh', mt: -3}}>
                <CssBaseline/>
                <Grid
                    item xs={false} sm={4} md={7}
                    sx={{
                        backgroundImage: 'url(https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/428682366_18016185383157723_2642410493154053121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=H96bRhsrV6cAb4wW4uM&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBP1WSRvylzyVaNtE5Jg_D5WgSwFUetzexTroUz2-_Z-Q&oe=662EDEA7)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={24} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={e => setFormFields({...formFields, email: e.target.value})}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={e => setFormFields({...formFields, password: e.target.value})}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3}}
                            >
                                Sign In
                            </Button>
                            <Divider sx={{my: 1.5}}/>
                            <GoogleLoginButton
                                style={googleLoginBtnStyle}
                                onClick={FirebaseAuthService.handleSignInWithGoogle}
                            />
                            <Snackbar
                                open={isSnackbarOpen}
                                autoHideDuration={6000}
                                anchorOrigin={{vertical: "top", horizontal: "center"}}
                                onClose={handleClose}>
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    variant="filled"
                                    sx={{width: '100%'}}
                                >
                                    Login Fail!
                                </Alert>
                            </Snackbar>
                            <Grid container>
                                <Grid item xs>
                                    <StyledRDDLink to="#">
                                        Forgot password?
                                    </StyledRDDLink>
                                </Grid>
                                <Grid item>
                                    <StyledRDDLink to="#">
                                        Don't have an account? Sign Up
                                    </StyledRDDLink>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            : <Grid container sx={{
                height: '91vh', mt: -3,
                backgroundImage: 'url(https://scontent-hkg1-1.xx.fbcdn.net/v/t39.30808-6/428682366_18016185383157723_2642410493154053121_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=H96bRhsrV6cAb4wW4uM&_nc_ht=scontent-hkg1-1.xx&oh=00_AfBP1WSRvylzyVaNtE5Jg_D5WgSwFUetzexTroUz2-_Z-Q&oe=662EDEA7)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                justifyContent: "center"
            }}>
                <Grid mt={5}>
                    <Typography variant="h5" color="white">
                        You are already logged in 😀
                    </Typography>
                </Grid>
            </Grid>
        }
    </>
}

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {`Copyright © Crewcut ${new Date().getFullYear()}`}
        </Typography>
    );
}