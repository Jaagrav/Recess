import React, { useState, useEffect } from "react";

import Logo from "../../assets/logo.png";

import { makeStyles } from "@material-ui/core/styles";
import { TextField, Modal, Button, IconButton } from "@material-ui/core";
import {
  Google as GoogleIcon,
  Twitter as TwitterIcon,
} from "@material-ui/icons";

import firebase from "firebase";
import { auth } from "../../firebase";

import styles from "./style";

const useStyles = makeStyles(styles);

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function signInWithGoogle(event) {
  event.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function signInWithTwitter(event) {
  event.preventDefault();
  var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider);
}

function SignUpForm({ openSignUp, setOpenSignUp }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const signUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));

    setOpenSignUp(false);
  };

  return (
    <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
      <div style={modalStyle} className={classes.auth}>
        <form noValidate autoComplete="off">
          <center>
            <img src={Logo} alt="logo" />
          </center>
          <br />
          <TextField
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="filled"
            color="primary"
            className={classes.field}
          />{" "}
          <br />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            color="primary"
            className={classes.field}
          />{" "}
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            color="primary"
            className={classes.field}
          />{" "}
          <br />
          <div className={classes.authBtns}>
            <Button
              type="submit"
              onClick={signUp}
              variant="contained"
              color="primary"
              className={classes.loginBtn}
            >
              Sign Up
            </Button>
            <div className={classes.authDivider}>Or Log In with</div>
            <span className={classes.thirdPartyAuths}>
              <IconButton
                color="primary"
                type="submit"
                onClick={signInWithGoogle}
              >
                <GoogleIcon />
              </IconButton>
              <IconButton
                color="primary"
                type="submit"
                onClick={signInWithTwitter}
              >
                <TwitterIcon />
              </IconButton>
            </span>
          </div>
        </form>
      </div>
    </Modal>
  );
}

const SignInForm = ({ openSignIn, setOpenSignIn }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
      <div style={modalStyle} className={classes.auth}>
        <form noValidate autoComplete="off">
          <center>
            <img src={Logo} alt="logo" />
          </center>
          <br />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="filled"
            color="primary"
            className={classes.field}
          />{" "}
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            color="primary"
            className={classes.field}
          />{" "}
          <br />
          <div className={classes.authBtns}>
            <Button
              type="submit"
              onClick={signIn}
              variant="contained"
              color="primary"
              className={classes.loginBtn}
            >
              Sign In
            </Button>
            <div className={classes.authDivider}>Or Log In with</div>
            <span className={classes.thirdPartyAuths}>
              <IconButton
                color="primary"
                type="submit"
                onClick={signInWithGoogle}
              >
                <GoogleIcon />
              </IconButton>
              <IconButton
                color="primary"
                type="submit"
                onClick={signInWithTwitter}
              >
                <TwitterIcon />
              </IconButton>
            </span>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { SignInForm, SignUpForm };
