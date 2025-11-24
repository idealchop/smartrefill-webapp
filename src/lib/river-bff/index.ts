
// This is a placeholder for the river-bff library.
// In a real-world scenario, this would be a separate npm package.

const RIVER_MICROSERVICE_URL = process.env.RIVER_MICROSERVICE_URL || "http://localhost:5000";

export const riverBFF = {
  signup: async (fullName: string, email: string, password: string) => {
    // In a real-world scenario, this would make an API call to the river-microservice
    console.log("Calling river-microservice to sign up user:", { fullName, email, password });

    // Simulate an API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({
            id: "123",
            fullName,
            email,
          }),
        });
      }, 1000);
    });

    return response;
  },
  login: async (email: string, password: string) => {
    // In a real-world scenario, this would make an API call to the river-microservice
    console.log("Calling river-microservice to log in user:", { email, password });

    // Simulate an API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({
            id: "123",
            email,
          }),
        });
      }, 1000);
    });

    return response;
  },
  google: async(email: string, name: string, image: string, accessToken: string) => {
    // In a real-world scenario, this would make an API call to the river-microservice
    console.log("Calling river-microservice to log in user:", { email, name, image, accessToken });

    // Simulate an API call
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          json: () => Promise.resolve({
            id: "123",
            email,
            name,
            image
          }),
        });
      }, 1000);
    });

    return response;
  }
};
