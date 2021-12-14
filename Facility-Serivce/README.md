# Facility App - API

## Summary:



The app makes use of several popular javascript libraries, such as:

- MongoDB Client
- Express.js
- Jest

---

## Configuration:

The following variables are set to defaults in the app (and should be set/overidden in the host enviroment wherever image is deployed to):

| Env Var                              | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| **APP_CLIENT_ID**                    | `clientId` variable from App JWT Authorization 	   |
|									   | (Change it to the active directory config)            |
                

---

## Tests:

Unit tests were written in Jest to test each on of the major "endpoints" (landingPage, search, asset). Run `npm run test` to run all unit tests on each one of the provided queries to ensure that the service is returning the expected data.

---

## Deployment:

The Docker image can be built and saved using the npm script `npm run docker:save`.

Package is fully contained as a Docker image. The image can be deployed on any Docker hosting platform. Also, environment variables should be set at the host level of the container service.

---

## Folder Structure:

```
/api
  /routes
    /ticket-status
```

- **routes**: contains the logic for interacting with the MongoDB; each folder contains an `.js` file which is the base class, other files in each directory inherit from the base class


