import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useCallback, useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  console.log("feed ", feed);
  const getFeed = useCallback(async () => {
    try {
      if (feed) return;
      const res = await axios.get(`${API_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data?.data || []));
    } catch (error) {
      console.log(error);
      return error;
    }
  }, [dispatch, feed]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);
  return (
    feed && (
      <div className="flex justify-center my-10 flex-wrap gap-10 justify-center items-center">
        {feed.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    )
  );
};

export default Feed;
