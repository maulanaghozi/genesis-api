const express = require("express");
const { authEmails, userProfiles } = require("../../models");
const { hashPassword, generateToken } = require("../../helper/misc");
const sendEmail = require("../../helper/sendEmail").send;

const router = express.Router();

const challengePassword = (password1, password2) => {
  return password1 === password2;
};

const sendOtpToEmail = async ({ email, otp }) => {
  let paramsEmail = {
    to: email,
    subject: "Request OTP Change Password Genesis Account",
    html: `
      <div style="display:flex; text-align:center; justify-content: center; width:100vw">
      <div style="width: 85%">
        <label style="font-size: 20px;">Berikut otp untuk change password di aplikasi Genesis : <span style="font-weight: bold">${otp}<span></label>
      </div>
    </div>
    `,
  };
  sendEmail(paramsEmail);
};

// Create a Auth Email
router.post("/auth/email/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const auth = await authEmails.findOne({ where: { email: email } });
    const user = await userProfiles.findOne({
      where: { email: email },
    });

    const clientPassword = await hashPassword(password + auth.salt);

    if (challengePassword(clientPassword, auth.password)) {
      const token = await generateToken({
        user_id: user.userId,
        phone: user.phoneNumber,
        name: user.name,
        address: user.address,
        profile_pic: user.profilePic,
        email: auth.email,
      });
      response.status(200).send({
        code: "success",
        message: "login success",
        payload: { token },
      });
    } else {
      response.status(400).send({
        code: "error_not_match",
        payload: {},
        message: "password and email not match",
      });
    }
  } catch (error) {
    response.status(400).send(error);
  }
});

// Send a OTP forgot password
router.put("/auth/email/otp", async (request, response) => {
  const { email } = request.body;
  const auth = await authEmails.findOne({ where: { email: email } });

  if (!auth || auth === null) {
    response.status(400).send({
      code: "success",
      payload: {},
      message: "SUCCESS SEND A OTP FORGOT PASSWORD",
    });
  }
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS SEND A OTP FORGOT PASSWORD",
  });
});

// Update a Auth Email
router.put("/auth/email/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS UPDATE A AUTH EMAIL BY USER ID",
  });
});

// Change password
router.put("/auth/password/:user_id", async (request, response) => {
  const { newPassword, oldPassword } = request.body;
  const { user_id } = request.params;

  const auth = await authEmails.findOne({ where: { userId: user_id } });

  if (!auth || auth === null) {
    response.status(404).send({
      code: "error_not_found",
      payload: {},
      message: `user with user_id ${user_id}  not found!`,
    });
  }

  const clientPassword = await hashPassword(oldPassword + auth.salt);

  if (!challengePassword(clientPassword, auth.password)) {
    response.status(400).send({
      code: "error_not_match",
      payload: {},
      message: `your password is wrong!`,
    });
  }

  auth.password = hashPassword(newPassword + auth.salt);
  await auth.save();

  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS CHANGE A PASSWORD",
  });
});

// Delete a Auth Email
router.delete("/auth/email/:id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE A AUTH EMAIL BY ID",
  });
});

// Get a list of Auth Emails
router.get("/auth/email", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A LIST OF AUTH EMAIL",
  });
});

// Get a number of Auth Emails
router.get("/auth/email/count", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS UPDATE A NUMBER OF AUTH EMAIL",
  });
});

// Get a Auth Email
router.get("/auth/email/:id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A AUTH EMAIL BY ID",
  });
});

// Export a list of Auth Emails
router.get("/auth/email.csv", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS EXPORT A LIST AUTH EMAIL",
  });
});

// Delete a list of Auth Emails
router.delete("/auth/email", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE A LIST AUTH EMAIL",
  });
});

module.exports = router;
