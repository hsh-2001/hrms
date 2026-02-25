import { getDistance } from "geolib";

// Company fixed location
const ALLOWED_RADIUS = 100; 
const COMPANY_LOCATION = {
  latitude: 11.5791,   // example Phnom Penh
  longitude: 104.919
};

const verifyLocation = (req) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({
      status: 400,
      message: "Location is required"
    });
  }

  const distance = getDistance(
    { latitude, longitude },
    COMPANY_LOCATION
  );

  if (distance > ALLOWED_RADIUS) {
    return {
      message: "You are too far from the company location",
      distance: distance,
      verified: false
    }
  }
  return {
    message: "Location verified",
    distance: distance,
    verified: true
  }
};

export default {
    verifyLocation,
}