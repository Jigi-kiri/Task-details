import * as React from 'react';
import { Box, TextField, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const initialLoginInfo = {
  email: "", password: ""
}
const Form = () => {
  const navigator = useNavigate();
  const [loginInfo, setLoginInfo] = React.useState(initialLoginInfo);


  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 1) {
      signInWithEmailAndPassword(authentication, loginInfo.email, loginInfo.password)
        .then((response) => {
          navigator("/tasks");
          sessionStorage.setItem('Auth Token', response._tokenResponse.refreshToken)
        })
        .catch((err) => {
          if (err.code === 'auth/wrong-password') {
            toast.error('Please check the Password');
          }
          if (err.code === 'auth/invalid-email') {
            toast.error('Please check your email!');
          }
          if (err.code === 'auth/user-not-found') {
            toast.error('Please check the Email');
          }
        })
    } else {
      createUserWithEmailAndPassword(authentication, loginInfo.email, loginInfo.password)
        .then((res) => {
          sessionStorage.setItem('Auth Token', res._tokenResponse.refreshToken);
          if (res.refreshToken) toast.success("Registered successfuly!")
        })
        .catch((err) => {
          if (err.code === 'auth/email-already-in-use') {
            toast.error('Email Already in Use');
          }
          if (err.code === 'auth/weak-password') {
            toast.error('Password should be at least 6 characters');
          }
        })
    }
  }


  return (
    <div>
      <div className="heading-container">
        <h3>
          Login Form
        </h3>
      </div>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="email"
          label="Enter the Email"
          variant="outlined"
          onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        />
        <TextField
          id="password"
          type="password"
          label="Enter the Password"
          variant="outlined"
          style={{ marginLeft: 15 }}
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
      </Box>
      <div style={{ marginLeft: 200 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAction(1)}
          style={{ marginTop: 10 }}
        >
          Login
        </Button>
        <Typography style={{ margin: 10 }} variant="subtitle1">
          <strong>OR</strong>
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAction(2)}
        >
          Register
        </Button>
      </div>
      <ToastContainer />
    </div>
  )
}


export default Form