const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("No token, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(401).send("Token is not valid");
  }
};

const addDemoUserCredentials = (req, res, next) => {
  try {
    req.body.email = process.env.DEMO_USER_EMAIL
    req.body.password = process.env.DEMO_USER_PASSWORD
    next()
  } catch (err) {
    res.status(500).send('Error while adding demo user credentials')
  }
};

module.exports = { protect, addDemoUserCredentials }
