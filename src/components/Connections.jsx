import React, { useEffect } from "react";

import axios from "axios";

import { API_URL } from "../constants";

import { useDispatch, useSelector } from "react-redux";

import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();

  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/connections`, {
        withCredentials: true,
      });

      console.log(response.data.data);

      dispatch(addConnection(response.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  console.log("connections in connections**********", connections);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections found</h1>;

  return (
    <div className="my-10 flex w-full flex-col items-center gap-4 px-4">
      <h1 className="text-bold text-2xl">Connections</h1>

      <ul className="flex w-full max-w-2xl flex-col gap-3">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl } = connection;

          console.log("connection in map", connection);

          const displayName =
            [firstName, lastName].filter(Boolean).join(" ").trim() || "User";

          return (
            <li
              key={connection._id}
              className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <img
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-gray-100"
                src={photoUrl || "https://via.placeholder.com/150"}
                alt={displayName}
              />

              <div className="min-w-0 flex-1">
                <h2 className="truncate text-lg font-semibold text-gray-900">
                  {displayName}
                </h2>
                <p className="text-sm text-gray-500">
                  {connection.age + "," + connection.gender}
                </p>
                <p className="text-sm text-gray-500">{connection.about}</p>
                <p className="text-sm text-gray-500">
                  {connection.skills.join(", ")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Connections;
