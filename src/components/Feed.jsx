import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import { useEffect } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = axios.get(`${API_URL}/feed`, { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return <div>Feed</div>;
};

export default Feed;
