import React, { useState } from "react";
import { auth } from "../../firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const nac = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return re.test(String(password));
  };

  const SignUp = (e) => {
    e.preventDefault();
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

    if (password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu và xác nhận mật khẩu không khớp');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        nac("/");
      })
      .catch((error) => {
        console.log(error);
        setConfirmPasswordError(error.message);
      });
  };

  return (
    <div className="signInContainer">
      <div className="bg-image"></div>
      <form onSubmit={SignUp} className="formSignIn">
        <h1 style={{ color: "white", marginTop:'70px' }}>Create account</h1>
        <div className="Email">
          <label className="label-email">Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            className="input-email"
          />
          {emailError && <p style={{ color: 'red' , margin:'5px 0 0 150px' }}>{emailError}</p>}
        </div>
        <div className="Password">
          <label className="label-password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
            className="input-password"
          />
          {passwordError && <p style={{ color: 'red', margin:'5px 0 0 150px'}}>{passwordError}</p>}
        </div>
        <div className="confirmPassword">
          <label className="label-confirmPassword">Confirm</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setConfirmPasswordError('');
            }}
            className="input-confirmPassword"
          />
          {confirmPasswordError && <p style={{ color: 'red', margin:'5px 0 0 150px' }}>{confirmPasswordError}</p>}
        </div>
        <button className="Submit" type="submit">
          Sign up <NavLink to={"/"}></NavLink>
        </button>
      </form>
    </div>
  );
};

export default SignUp;
