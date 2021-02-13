const express = require("express");
const { PermissionMiddlewareCreator } = require("forest-express-sequelize");
const { authEmails } = require("../models");

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator(
  "authEmails"
);

// This file contains the logic of every route in Forest Admin for the collection authEmail:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

router.post("/authEmail/login", (request, response) => {
  // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
  //email, name, member type
  console.log("REQUEST ==>> ", request);
  response.send({ success: "Legal documents are successfully uploaded." });

  //generate password 12 char

  //joined date, expired date
});

// Create a Auth Email
router.post(
  "/authEmail/login",
  permissionMiddlewareCreator.create(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
    //email, name, member type
    console.log("REQUEST ==>> ", request);
    response.send({ success: "Legal documents are successfully uploaded." });

    //generate password 12 char

    //joined date, expired date

    next();
  }
);

// Update a Auth Email
router.post(
  "/authEmail/login",
  permissionMiddlewareCreator.update(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
    next();
  }
);

// Delete a Auth Email
router.delete(
  "/authEmail/:recordId",
  permissionMiddlewareCreator.delete(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
    next();
  }
);

// Get a list of Auth Emails
router.get(
  "/authEmail",
  permissionMiddlewareCreator.list(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
    next();
  }
);

// Get a number of Auth Emails
router.get(
  "/authEmail/count",
  permissionMiddlewareCreator.list(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
    next();
  }
);

// Get a Auth Email
router.get(
  "/authEmail/:recordId",
  permissionMiddlewareCreator.details(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
    next();
  }
);

// Export a list of Auth Emails
router.get(
  "/authEmail.csv",
  permissionMiddlewareCreator.export(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
    next();
  }
);

// Delete a list of Auth Emails
router.delete(
  "/authEmail",
  permissionMiddlewareCreator.delete(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
    next();
  }
);

module.exports = router;
