const jwt = require("jsonwebtoken");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

module.exports = (req) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    return false;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.jsonWebTokenKey);
  } catch (err) {
    return false;
  }

  if (!decodedToken) {
    return false;
  }

  return decodedToken;
};
