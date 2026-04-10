import React, { useCallback, useEffect } from "react";
import AppHeader from "./AppHeder";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import { API_URL } from "../constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useRef } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchedRef = useRef(false);
  const fetchUser = useCallback(async () => {
    try {
      if (userData) return;
      const res = await axios.get(`${API_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      // navigate("/login");
      // redirect to error page
      console.log(error);
      //
    }
  }, [dispatch, navigate, userData]);

  useEffect(() => {
    if (userData || fetchedRef.current) return;
    fetchedRef.current = true;
    fetchUser();
  }, [fetchUser, userData]);

  return (
    <>
      <AppHeader />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
