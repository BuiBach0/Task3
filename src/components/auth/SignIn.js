import React, { useEffect, useState } from "react";
import { auth } from "../../firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import { NavLink, useNavigate } from "react-router-dom";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMess, setErrorMess] = useState("");
  const nac = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^\d{6,}$/
    return re.test(String(password));
  };
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        setErrorMess(userCredential.user.email);
        nac("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/invalid-credential') {
          setPasswordError( 
              "Sai email hoặc mật khẩu"
            );
          }
        
        
        
      });
      let valid = true;
      if (!validateEmail(email)) {
        setEmailError('Email không đúng định dạng');
        valid = false;
      } else {
        setEmailError('');
      }
  
      if (!validatePassword(password)) {
        setPasswordError('Mật khẩu không đúng định dạng');
        valid = false;
      } else {
        setPasswordError('');
      }
  };

  return (
    <div className="signInContainer">
      <div className="bg-image"></div>
      <form onSubmit={signIn} className="formSignIn">
        <div className="titleHeader">
          <h1 style={{ color: "white" }}>Sign In </h1>
        </div>
        <div className="formInput">
          <div className="container-input-email">
            <label className="label-email">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
              className="input-email"
            ></input>
            {emailError && <p style={{ color: 'red' , margin:'5px 0 0 150px' }}>{emailError}</p>}
          </div>
          <div className="container-input-password">
            <label className="label-password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
              className="input-password"
            ></input>
          </div>
          <p></p>
        </div>
        {passwordError && <p style={{ color: 'red', margin:'5px 0 0 150px'}}>{passwordError}</p>}
        <p></p>
        <button
          className="Submit-SignIn"
          type="submit"
          style={{ color: "white" }}
        >
        Sign In
        </button>
        <div className="footer-Register">
          <p className="p-2">
            Do you have account ?{" "}
            <span>
              <NavLink to={"/SignUp"} className={"sign-up-link"}>Sign Up</NavLink>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
