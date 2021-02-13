const express = require("express");
const randomString = require("randomstring");
const moment = require("moment");
const { userProfiles } = require("../../models");
const { memberships } = require("../../models");
const { authEmails } = require("../../models");
const hashPassword = require("../../helper/misc").hashPassword;
const sendEmail = require("../../helper/sendEmail").send;

const router = express.Router();

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

// Create a User Profile
router.post("/user", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS CREATE A USER PROFILE",
  });
});

// Update a User Profile
router.put("/user/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS UPDATE A USER PROFILE BY USER ID",
  });
});

// Delete a User Profile
router.delete("/user/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE A USER PROFILE BY USER ID",
  });
});

// Get a list of User Profiles
router.get("/user", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A LIST OF USER PROFILE",
  });
});

// Get a number of User Profiles
router.get("/user/count", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET NUMBER OF USER PROFILE",
  });
});

// Get a User Profile
router.get("/user/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET  USER PROFILE BY USER ID",
  });
});

// Export a list of User Profiles
router.get("/user.csv", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS EXPORT USER PROFILE",
  });
});

// Delete a list of User Profiles
router.delete("/user", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE LIST OF USER PROFILE",
  });
});

router.post("/user/register", async (req, res) => {
  const input = req.body;
  const salt = randomString.generate(16);
  const user_id = randomString.generate(30);
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

  await authEmails.create(authEmailParams);
  await userProfiles.create(userProfileParams);
  await memberships.create(membershipParams);

  sendVerificationEmail({ email: input.Email, password: password });
  res.send({ code: "success", payload: {}, message: "SUCCESS CREATE ACCOUNT" });
});

module.exports = router;
