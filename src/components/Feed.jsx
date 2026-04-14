import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useCallback, useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = useCallback(async () => {
    if (feed !== null) return;
    try {
      const res = await axios.get(`${API_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data?.data || []));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, feed]);

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  const currentUser =
    Array.isArray(feed) && feed.length > 0 ? feed[0] : null;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center px-4 py-6">
      {feed === null && (
        <span className="loading loading-spinner loading-lg text-primary" />
      )}
      {feed !== null && !currentUser && (
        <p className="max-w-md text-center text-lg text-base-content/70">
          You&apos;re all caught up. No more profiles in your feed right now.
        </p>
      )}
      {currentUser && (
        <div className="w-full max-w-md">
          <UserCard key={currentUser._id} user={currentUser} />
        </div>
      )}
    </div>
  );
};

export default Feed;
