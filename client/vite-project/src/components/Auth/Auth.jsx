import { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import CustomInput from "./CustomInput";

import useStyles from "./auth-styles";
import { gapi } from "gapi-script";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/authAction";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const state = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const classes = useStyles();

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log("handleFormSubmit");
    console.log(formData);

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log("handleChange");
  }
  function handleShowPassword() {
    console.log("handleShowPassword");
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }
  function switchMode() {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  async function googleSuccess(res) {
    // **you can access the token like this**
    // const accessToken = gapi.auth.getToken().access_token;
    // console.log(accessToken);
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  function googleFailure(e) {
    console.log(e);
    console.log("Google Sign In was unsuccessful. Try again later");
    alert("Google Sign In was unsuccessful. Try again later");
  }

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "198180225584-430k787mjul2i03fed9n2me65fbrk48h.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <CustomInput
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />

                <CustomInput
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <CustomInput
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <CustomInput
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <CustomInput
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <GoogleLogin
            clientId="198180225584-430k787mjul2i03fed9n2me65fbrk48h.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
