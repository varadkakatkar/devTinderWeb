import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
const Profile = () => {
  const user = useSelector((store) => store.user);
  console.log("user in profile >>>>>>>>>>", JSON.stringify(user, null, 2));
  return (
    <div>{user ? <EditProfile user={user} /> : <div>No user found</div>}</div>
  );
};
export default Profile;
