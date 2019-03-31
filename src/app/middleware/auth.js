const jwt = require("jsonwebtoken");
const { secret } = require("../../config/auth");
const { promisify } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // checks if the token is present on the header of the requisiton
  if (!authHeader) {
    return res.status(401).json({ error: "Token not provider" });
  }
  // checks if the token is valid on the header of the requisiton
  const [, token] = authHeader.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, secret);
    req.userId = decoded.id;
    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }
};
