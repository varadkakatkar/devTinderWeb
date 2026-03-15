import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { API_URL } from "../constants";

const Login = () => {
  const [emailId, setEmilId] = useState("john.doe12@example.com");
  const [password, setPassword] = useState("Password@123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
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
      navigate("/feed");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-2xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="form-control my-2">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              value={emailId}
              onChange={(e) => setEmilId(e.target.value)}
            />
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
          </div>
          <div className="card-actions justify-end ">
            <button className="btn" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
