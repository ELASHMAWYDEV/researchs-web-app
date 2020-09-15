const db = require("./db");
const jwt = require("jsonwebtoken");
const jwtToken =
  process.env.ACCESS_TOKEN_SECRET ||
  "1a00e3598aa6688f9b003b5942f321a80c49ef32c5cf911248062fb6417e9892d791fe11b887b20d49b194e8a3f0d47c7459af4a462abd083355443b055956fa";




const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  //set the req.user = null ===> check for req.user in every private route
  if (!token) {
    req.user = null;
    return next();
  }

  jwt.verify(token, jwtToken, async (err, user) => {
    if (err) req.user = null;
    // console.log(user);

    let userSearch = await db.collection("users").findOne({ accessToken: token });
    if (userSearch) {
      const userSessionTime = new Date().getTime() - userSearch.lastLogin;
      if (userSessionTime < 86400 * 1000) req.user = userSearch;
      else req.user = null;


    }
    else req.user = null;

    next();
  });

}

module.exports = authenticateUser;