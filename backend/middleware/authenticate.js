const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // add userId to the request object

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authenticate;
