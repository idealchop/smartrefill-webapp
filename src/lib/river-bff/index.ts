
// This is a placeholder for the river-bff library.
// In a real-world scenario, this would be a separate npm package.

const RIVER_MICROSERVICE_URL = process.env.RIVER_MICROSERVICE_URL || "http://localhost:5000";

// Helper function to simulate API calls
const simulateApiCall = (data: any, success: boolean = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject(new Error("Simulated API Error: Invalid credentials"));
      }
    }, 500);
  });
};

export const riverBFF = {
  signup: async (fullName: string, email: string, password: string) => {
    console.log("Calling river-microservice to sign up user:", { fullName, email, password });

    // Simulate a failure case for testing purposes
    if (password === "fail-test") {
      return simulateApiCall({}, false);
    }

    console.log("Storing user information in Firestore via river-microservice.");
    console.log(`Sending verification email to ${email}.`);
    
    // On success, this should return the user object from your microservice
    return simulateApiCall({
      id: "123",
      fullName,
      email,
    });
  },

  login: async (email: string, password: string) => {
    console.log("Calling river-microservice to log in user:", { email, password });

    // On success, this should return the user object from your microservice
    return simulateApiCall({
      id: "123",
      email,
    });
  },

  google: async(email: string, name: string | null | undefined, image: string | null | undefined, accessToken: string) => {
    console.log("Calling river-microservice for Google sign-in:", { email, name, image, accessToken });

    // On success, this should return the user object from your microservice
    return simulateApiCall({
      id: "123",
      email,
      name,
      image
    });
  }
};
