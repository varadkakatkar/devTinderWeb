const UserCard = ({ user }) => {
  // console.log("user in user card", JSON.stringify(user, null, 2));
  const { firstName, lastName, age, gender, about, photoUrl } = user;

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
        <div className="card-actions justify-end mt-3 gap-2">
          <button className="btn btn-secondary btn-outline btn-md">
            Ignore
          </button>
          <button className="btn btn-primary btn-soft btn-md">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
