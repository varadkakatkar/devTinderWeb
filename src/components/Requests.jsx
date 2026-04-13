import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequest(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const reviewRequest = async (requestId, status) => {
    try {
      const response = await axios.post(
        `${API_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      console.log("response in reviewRequest**********", response);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error);
    }
  };

  if (!requests) return;
  if (requests.length === 0)
    return (
      <h1 className="text-center text-2xl font-bold">No Requests found</h1>
    );
  return (
    <div className="my-10 flex w-full flex-col items-center gap-4 px-4">
      <h1 className="text-bold text-2xl text-center">Requests</h1>

      <ul className="flex w-full max-w-2xl flex-col gap-3">
        {requests.map((request) => {
          console.log("request in requests**********", request);
          const u = request.fromUserId;
          const displayName =
            [u?.firstName, u?.lastName].filter(Boolean).join(" ").trim() ||
            "User";
          const skills = u?.skills ?? [];

          return (
            <li
              key={request._id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-gray-100"
                src={u?.photoUrl || "https://via.placeholder.com/150"}
                alt={displayName}
              />

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-gray-900">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-500">
                  {u?.age + "," + u?.gender}
                </p>
                {u?.about ? (
                  <p className="text-sm text-gray-500">{u.about}</p>
                ) : null}
                {skills.length > 0 ? (
                  <p className="text-sm text-gray-500">{skills.join(", ")}</p>
                ) : null}
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  type="button"
                  className="btn btn-secondary btn-outline btn-sm"
                  onClick={() => reviewRequest(request._id, "rejected")}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => reviewRequest(request._id, "accepted")}
                >
                  Accept
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Requests;
