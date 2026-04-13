import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  console.log(
    "user in edit profile********** 1",
    JSON.stringify(user, null, 2),
  );
  // const userFromStore = useSelector((store) => store.user);
  // const user = userProp ?? userFromStore;
  console.log(
    "user in edit profile********** 2",
    JSON.stringify(user, null, 2),
  );
  const [firstName, setFirstName] = useState(user.firstName ?? "");
  const [lastName, setLastName] = useState(user.lastName ?? "");
  const [email, setEmail] = useState(user.emailId ?? "");
  const [about, setAbout] = useState(user.about ?? "");
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : (user.skills ?? ""),
  );
  const [age, setAge] = useState(user.age ?? "");
  const [gender, setGender] = useState(user.gender ?? "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl ?? "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/feed");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const skillsArray = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await axios.patch(
        `${API_URL}/profile/edit`,
        {
          firstName,
          lastName,
          emailId: email,
          about,
          skills: skillsArray,
          age: age === "" ? undefined : Number(age),
          gender,
          photoUrl,
        },
        { withCredentials: true },
      );
      console.log("res.data", res.data);
      dispatch(addUser(res.data.user));

      setSuccess("Profile saved successfully");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Could not save profile";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center my-10 px-4">
        <p className="text-base-content/70">No user loaded. Try logging in.</p>
      </div>
    );
  }

  const previewUser = {
    ...user,
    firstName,
    lastName,
    emailId: email,
    about,
    skills: skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
    age: age === "" ? "" : Number(age),
    gender,
    photoUrl,
  };

  return (
    <div className="my-10 px-4">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-center">
        <div className="card bg-base-200 w-full max-w-lg shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit profile</h2>

            {error ? (
              <div role="alert" className="alert alert-error text-sm">
                {error}
              </div>
            ) : null}
            {success ? (
              <div role="alert" className="alert alert-success text-sm">
                {success}
              </div>
            ) : null}

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-firstName">
                <span className="label-text">First name</span>
              </label>
              <input
                id="edit-firstName"
                type="text"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-lastName">
                <span className="label-text">Last name</span>
              </label>
              <input
                id="edit-lastName"
                type="text"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="edit-email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="edit-email"
                type="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-about">
                <span className="label-text">About</span>
              </label>
              <textarea
                id="edit-about"
                className="textarea textarea-bordered h-24 w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-age">
                <span className="label-text">Age</span>
              </label>
              <input
                id="edit-age"
                type="number"
                min={0}
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-gender">
                <span className="label-text">Gender</span>
              </label>
              <select
                id="edit-gender"
                className="select select-bordered w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label" htmlFor="edit-skills">
                <span className="label-text">Skills</span>
              </label>
              <input
                id="edit-skills"
                type="text"
                className="input input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div className="form-control w-full">
              <label className="label" htmlFor="edit-photoUrl">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                id="edit-photoUrl"
                type="url"
                className="input input-bordered w-full"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </div>
            <div className="card-actions justify-end gap-2 mt-4">
              <button
                type="button"
                className="btn btn-ghost border border-base-300 hover:bg-base-300/40"
                disabled={loading}
                onClick={handleCancel}
              >
                <span>⬅️ Back to Feed</span>
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSave}
              >
                {loading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : null}
                Save
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-sm flex-col items-center gap-3">
          <h3 className="text-xl font-semibold">Live preview</h3>
          <UserCard user={previewUser} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
