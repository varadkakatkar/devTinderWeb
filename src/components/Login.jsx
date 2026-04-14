import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_URL } from "../constants";
import { validateEmail, validatePassword } from "../utils/checkValidations";

const Login = () => {
  const [emailId, setEmilId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setLoginForm] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmilId(value);
    setEmailError(validateEmail(value));
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);
    //  setEmailError(validateEmail(value));
  };
  const handleLastNameChange = (e) => {
    const value = e.target.value;
    setLastname(value);
    // setEmailError(validateEmail(value));
  };

  const toggleAuthMode = () => {
    setLoginForm((v) => !v);
    setError("");
  };

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        `${API_URL}/login`,
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true },
      );

      const data = result.data;
      console.log("data", data.user);
      dispatch(addUser(data.user));

      if (result.status == 200) {
        setError("");
        navigate("/feed");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      const backendError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Login failed";
      setError(backendError);
      console.log("error", err);
    }
  };
  const handleSignUp = async () => {
    const emailErr = validateEmail(emailId);
    if (emailErr) {
      setEmailError(emailErr);
      return;
    }
    const passwordErr = validatePassword(password);
    if (passwordErr) {
      setError(passwordErr);
      return;
    }
    if (!firstName.trim() || !lastName.trim()) {
      setError("First name and last name are required");
      return;
    }

    setError("");
    try {
      const result = await axios.post(
        `${API_URL}/signup`,
        {
          emailId,
          password,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        },
        { withCredentials: true },
      );

      const data = result.data.data;
      console.log("data", data);
      dispatch(addUser(data));

      if (result.status === 201) {
        setError("");
        navigate("/profile");
      }
    } catch (err) {
      const backendError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Sign up failed";
      setError(backendError);
      console.log("error", err);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "SignUp"}</h2>
          {!isLoginForm && (
            <>
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text">First Name</span>
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="input input-bordered"
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </div>
              <div className="form-control my-2">
                <label className="label">
                  <span className="label-text">Last Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="input input-bordered"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </div>
            </>
          )}
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={emailId}
              onChange={handleEmailChange}
            />
            <p className="text-error">{emailError}</p>
          </div>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-error">{error}</p>
          </div>

          <div className="card-actions flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
            {isLoginForm ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLogin}
              >
                Login
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            )}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={toggleAuthMode}
            >
              {isLoginForm
                ? "New user? Create an account"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
