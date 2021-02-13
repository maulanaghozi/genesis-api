const express = require("express");
const { PermissionMiddlewareCreator } = require("forest-express-sequelize");
const randomString = require("randomstring");
const moment = require("moment");
const { userProfiles, memberships, authEmails } = require("../models");
const hashPassword = require("../helper/misc").hashPassword;
const sendEmail = require("../helper/sendEmail").send;

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator(
  "userProfiles"
);

const sendVerificationEmail = async ({ email, password }) => {
  let paramsEmail = {
    to: email,
    subject: "Selamat Datang di Genesis Ternak Saham",
    html: `
      <div style="display:flex; text-align:center; justify-content: center; width:100vw">
      <div style="width: 85%">
        <label style="font-size: 20px;">Terima kasih telah bergabung!</label><br/>
        <label style="font-size: 20px;">Berikut password untuk login di aplikasi Genesis : <span style="font-weight: bold">${password}<span></label>
        <p style="margin-top: 40px; margin-bottom: 40px; font-size: 14px">
          Buka aplikasi dan mulai ternak saham.
        </p>
      </div>
    </div>
    `,
  };
  sendEmail(paramsEmail);
};

// This file contains the logic of every route in Forest Admin for the collection userProfile:
// - Native routes are already generated but can be extended/overriden - Learn how to extend a route here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/extend-a-route
// - Smart action routes will need to be added as you create new Smart Actions - Learn how to create a Smart Action here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/actions/create-and-manage-smart-actions

// Create a User Profile
router.post(
  "/userProfile",
  // permissionMiddlewareCreator.create(),
  // () => {},
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#create-a-record
    next();
    res.send({ success: "SUCCESS CREATE ACCOUNT" });
  }
);

// Update a User Profile
router.put(
  "/userProfile/:recordId",
  permissionMiddlewareCreator.update(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#update-a-record
    next();
  }
);

// Delete a User Profile
router.delete(
  "/userProfile/:recordId",
  permissionMiddlewareCreator.delete(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-record
    next();
  }
);

// Get a list of User Profiles
router.get(
  "/userProfile",
  permissionMiddlewareCreator.list(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-list-of-records
    next();
  }
);

// Get a number of User Profiles
router.get(
  "/userProfile/count",
  permissionMiddlewareCreator.list(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-number-of-records
    next();
  }
);

// Get a User Profile
router.get(
  "/userProfile/:recordId",
  permissionMiddlewareCreator.details(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#get-a-record
    next();
  }
);

// Export a list of User Profiles
router.get(
  "/userProfile.csv",
  permissionMiddlewareCreator.export(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#export-a-list-of-records
    next();
  }
);

// Delete a list of User Profiles
router.delete(
  "/userProfile",
  permissionMiddlewareCreator.delete(),
  (request, response, next) => {
    // Learn what this route does here: https://docs.forestadmin.com/documentation/v/v6/reference-guide/routes/default-routes#delete-a-list-of-records
    next();
  }
);

router.post(
  "/actions/user/register",
  permissionMiddlewareCreator.smartAction(),
  async (req, res) => {
    //email, name, member type
    const input = req.body.data.attributes.values;
    const salt = randomString.generate(16);
    const userId = randomString.generate(30);
    const password = randomString.generate(12);
    const joinedDate = moment().format("DD MMMM YYYY");
    const expiredDate = moment().add(365, "days").format("DD MMMM YYYY");

    const authEmailParams = {
      userId: userId,
      email: input.Email,
      password: password,
      salt: salt,
      otp: null,
      disabled: false,
      lastLogin: null,
    };

    const membershipParams = {
      userId: userId,
      memberType: input["Membership type"],
      joinedDate: joinedDate,
      expiredDate: expiredDate,
    };

    const userProfileParams = {
      userId: userId,
      name: input.Name,
      phone: null,
      birthdate: null,
      gender: input.Gender,
      email: input.Email,
      provincy: null,
      city: null,
      profilePic: null,
    };

    authEmailParams.password = hashPassword(password + salt);
    console.log(
      "===>>>> REQ BODY DATA ATTR ++>> ",
      authEmailParams,
      membershipParams,
      userProfileParams,
      password
    );

    await authEmails.create(authEmailParams);
    await userProfiles.create(userProfileParams);
    await memberships.create(membershipParams);

    sendVerificationEmail({ email: input.Email, password: password });
    res.send({ success: "SUCCESS CREATE ACCOUNT" });
  }
);

module.exports = router;
