import { Link } from "react-router-dom";
import placeholderImage from "../assets/profile-icon.png";

function ActivityCard({
  _id: activityId,
  title,
  aiDescription,
  activityType,
  image = [],
  tag = [],
  city,
  country,
  weather,
  className = "",
}) {
  const activityImage =
    image.length > 0 ? image[0] : placeholderImage;

  return (
    <Link to={`/activities/details/${activityId}`}>
      <div
        className={`bg-white shadow-sm rounded-xl border border-gray-200 p-4 hover:shadow-md hover:bg-gray-50 transition duration-200 ${className}`}
      >
        <div className="flex items-center gap-4">

          {/* IMAGE */}
          <img
            src={activityImage}
            alt={title}
            className="w-16 h-16 rounded-lg object-cover border"
            onError={(e) => {
              e.currentTarget.src = placeholderImage;
            }}
          />

          {/* CONTENT */}
          <div className="flex-1">

            {/* TITLE */}
            <div className="flex justify-between items-start">
              <h2 className="text-lg font-semibold">
                {title}
              </h2>

              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full capitalize">
                {activityType}
              </span>
            </div>

            {/* DESCRIPTION */}
            {aiDescription && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {aiDescription}
              </p>
            )}

            {/* LOCATION */}
            {(city || country) && (
              <p className="text-sm text-gray-500 mt-2">
                📍 {city}
                {city && country ? ", " : ""}
                {country}
              </p>
            )}

            {/* FOOTER */}
            <div className="flex flex-wrap items-center gap-2 mt-3">

              {/* TAGS */}
              {tag.length > 0 &&
                tag.map((singleTag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    #{singleTag}
                  </span>
                ))}

              {/* WEATHER */}
              {weather && (
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                  ☀️ {weather}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ActivityCard;