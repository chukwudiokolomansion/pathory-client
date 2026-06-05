import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import service from "../services/index.services";

import placeholderImage from "./../assets/placeholder.png";



function ActivityDetailsPage() {
  const { activityId } = useParams();

  const [activity, setActivity] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await service.get(
          `/activities/${activityId}`
        );

        setActivity(response.data);
      } catch (err) {
        console.log(err);

        setErrorMessage(
          "Failed to load activity details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (loading) {
    return (
      <div className="p-6 text-center">
        Loading activity...
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="p-6 text-center text-red-500">
        {errorMessage}
      </div>
    );
  }

  const activityImage =
    activity?.image?.length > 0
      ? activity.image[0]
      : placeholderImage;

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">

        {/* HERO IMAGE */}
        <div className="relative h-72 bg-gray-200">

          <img
            src={activityImage}
            alt={activity?.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                placeholderImage;
            }}
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-black/40 flex items-end p-6">

            <div>
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full capitalize">
                {activity?.activityType}
              </span>

              <h1 className="text-4xl font-bold text-white mt-3">
                {activity?.title}
              </h1>

              {(activity?.city ||
                activity?.country) && (
                <p className="text-gray-200 mt-2">
                  📍 {activity?.city}
                  {activity?.city &&
                  activity?.country
                    ? ", "
                    : ""}
                  {activity?.country}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8 space-y-8">

          {/* DESCRIPTION */}
          {activity?.aiDescription && (
            <div>
              <h2 className="text-xl font-semibold mb-3">
                Description
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {activity.aiDescription}
              </p>
            </div>
          )}

          {/* DETAILS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* LOCATION */}
            <div className="bg-gray-50 rounded-xl p-5 border">

              <h3 className="font-semibold mb-4">
                Location
              </h3>

              <div className="space-y-2 text-sm">

                <p>
                  <strong>City:</strong>{" "}
                  {activity?.city || "N/A"}
                </p>

                <p>
                  <strong>Country:</strong>{" "}
                  {activity?.country || "N/A"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {activity?.address ||
                    "N/A"}
                </p>

                {activity?.coordinates
                  ?.length === 2 && (
                  <>
                    <p>
                      <strong>
                        Latitude:
                      </strong>{" "}
                      {
                        activity
                          .coordinates[0]
                      }
                    </p>

                    <p>
                      <strong>
                        Longitude:
                      </strong>{" "}
                      {
                        activity
                          .coordinates[1]
                      }
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* EXTRA INFO */}
            <div className="bg-gray-50 rounded-xl p-5 border">

              <h3 className="font-semibold mb-4">
                Activity Info
              </h3>

              <div className="space-y-3 text-sm">

                <p>
                  <strong>
                    Activity Type:
                  </strong>{" "}
                  <span className="capitalize">
                    {
                      activity?.activityType
                    }
                  </span>
                </p>

                <p>
                  <strong>Weather:</strong>{" "}
                  {activity?.weather ||
                    "N/A"}
                </p>

                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(
                    activity?.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* TAGS */}
          {activity?.tag?.length > 0 && (
            <div>

              <h2 className="text-xl font-semibold mb-4">
                Tags
              </h2>

              <div className="flex flex-wrap gap-2">

                {activity.tag.map(
                  (singleTag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      #{singleTag}
                    </span>
                  )
                )}
              </div>
            </div>
          )}

          {/* VIDEO */}
          {activity?.video?.length > 0 && (
            <div>

              <h2 className="text-xl font-semibold mb-4">
                Video
              </h2>

              <a
                href={activity.video[0]}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Video
              </a>
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">

            <Link
              to={`/activities/edit/${activity?._id}`}
            >
              <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-200">
                Edit Activity
              </button>
            </Link>

            <Link to="/activities">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg transition duration-200">
                Back to Activities
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetailsPage;