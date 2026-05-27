/*import * as Location from "expo-location";
import { getDistance } from "geolib";
import { generateAISuggestion } from "./services/aiService";

let oldLocation = null;

async function startTracking() {
  const permission = await Location.requestForegroundPermissionsAsync();

  if (permission.status !== "granted") {
    console.log("Permission denied");
    return;
  }

  Location.watchPositionAsync(
    {
      accuracy: Location.Accuracy.High,
      timeInterval: 10000,
      distanceInterval: 100,
    },

    (location) => {
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log("New Location:", newLocation);

      if (!oldLocation) {
        oldLocation = newLocation;
        return;
      }

      const userMoved =
        oldLocation.latitude !== newLocation.latitude ||
        oldLocation.longitude !== newLocation.longitude;

      if (userMoved) {
        console.log("User moved");

        oldLocation = newLocation;
      } else {
        console.log("User stopped");

        generateAISuggestion({
          location: newLocation,

          timestamp: new Date(),
        }).then((memory) => {
          alert(memory.message);
        });
      }
    },
  );
}

export default startTracking;*/
