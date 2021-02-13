const express = require("express");
const { membership } = require("../../models");

const router = express.Router();

// Create a Membership
router.post("/membership", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS CREATE A MEMBERSHIP",
  });
});

// Update a Membership
router.put("/membership/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS UPDATE A MEMBERSHIP BY USER ID",
  });
});

// Delete a Membership
router.delete("/membership/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE A MEMBERSHIP",
  });
});

// Get a list of Memberships
router.get("/membership", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A LIST OF MEMBERSHIP",
  });
});

// Get a number of Memberships
router.get("/membership/count", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A NUMBER OF MEMBERSHIP",
  });
});

// Get a Membership
router.get("/membership/:user_id", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS GET A  MEMBERSHIP BY USER ID",
  });
});

// Export a list of Memberships
router.get("/membership.csv", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS EXPORT A LIST OF MEMBERSHIP",
  });
});

// Delete a list of Memberships
router.delete("/membership", (request, response) => {
  const {} = request;
  response.send({
    code: "success",
    payload: {},
    message: "SUCCESS DELETE A LIST OF MEMBERSHIP",
  });
});

module.exports = router;
