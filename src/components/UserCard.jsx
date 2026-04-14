import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";

const UserCard = ({ user }) => {
  // console.log("user in user card", JSON.stringify(user, null, 2));
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();
  const loggedInUser = useSelector((store) => store.user);
  const isViewingSelf =
    loggedInUser?._id != null &&
    _id != null &&
    String(loggedInUser._id) === String(_id);
  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `/request/send/${status}/${userId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-all duration-300">
      <figure>
        <img
          src={photoUrl}
          alt={firstName + " " + lastName}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg font-bold">
          {firstName + " " + lastName}
        </h2>
        <p>{age + "," + gender}</p>
        <p className="text-sm text-base-content/70">{about}</p>
        {!isViewingSelf && (
          <div className="card-actions justify-end mt-3 gap-2">
            <button
              className="btn btn-secondary btn-outline btn-md"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-primary btn-soft btn-md"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
