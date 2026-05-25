import { Link } from "react-router-dom";
import placeholderImage from "../assets/profile-icon.png";

function ActivityCard({
  _id: activityId,
  firstName,
  lastName,
  email,
  phone,
  title,
  image,
  className,
}) {
  return (
    <Link to={`/activities/details/${activityId}`}>
      <div
        className={`ActivityCard flex justify-between items-center p-3 mb-2 bg-white shadow-sm rounded border border-gray-200 hover:bg-gray-50 ${className}`}
      >
        <span
          className="flex items-center justify-center"
          style={{ flexBasis: "20%" }}
        >
          <img
            src={image || placeholderImage}
            alt={`${firstName} ${lastName}`}
            className="rounded-full w-10 h-10 object-cover border-2 border-gray-300"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = placeholderImage;
            }}
          />
        </span>
        <span style={{ flexBasis: "20%" }}>
          {firstName} {lastName}
        </span>
        <span style={{ flexBasis: "20%" }}>{title}</span>
        <span style={{ flexBasis: "20%" }}>{email}</span>
        <span style={{ flexBasis: "20%" }}>{phone}</span>
      </div>
    </Link>
  );
}

export default ActivityCard;
