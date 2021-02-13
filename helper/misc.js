const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
const GENESIS_AUTH_SECRET = process.env.FOREST_AUTH_SECRET;
const GENESIS_AUTH_TOKEN = process.env.FOREST_AUTH_TOKEN;
const GENESIS_AUTH_TOKEN_EXP = process.env.FOREST_AUTH_TOKEN_EXP;

module.exports.hashPassword = plainText => {
  let hash = crypto.createHmac("SHA256", GENESIS_AUTH_SECRET);
  return hash.update(plainText).digest("hex");
};

module.exports.generateToken = async params => {
  let authToken = GENESIS_AUTH_TOKEN;
  let authTokenExpired = GENESIS_AUTH_TOKEN_EXP || "24h";
  let newToken = jwt.sign(
    {
      ...params,
    },
    authToken,
    { expiresIn: authTokenExpired }
  );
  return newToken;
};

const getToken = req => {
  try {
    let token = req.headers.authorization;
    if (token === undefined) {
      throw "Token is not found!";
    }
    return token.substring(7, token.length);
  } catch (err) {
    throw err;
  }
};

module.exports.verifyToken = () => async (req, res, next) => {
  try {
    const token = await getToken(req);

    if (jwt.verify(token, GENESIS_AUTH_TOKEN)) {
      let user = decode(token);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(403).send({
          code: "error_forbidden",
          payload: {},
          message: "You don't have access!",
        });
      }
    } else {
      throw "Invalid Token!";
    }
  } catch (err) {
    res
      .status(401)
      .send({ code: "error_unauthorize", message: "Invalid Token!" });
  }
};
