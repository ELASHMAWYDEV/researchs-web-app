const express = require("express");
const app = express();
const PORT = process.env.PORT || "5000";
const bodyParser = require("body-parser");
const db = require("./db");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("You are not allowed to enter this website !");
});


//Routes
app.use("/login", require("./routes/login"));
app.use("/users", require("./routes/users/index"));
app.use("/researchs", require("./routes/researchs"));
app.use("/settings", require("./routes/settings"));





const authenticateUser = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  
    //set the req.user = null ===> check for req.user in every private route
    if (!token) {
      req.user = null;
      return next();
    }
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
      if (err) req.user = null;
  
      let userSearch = await db.collection("users").findOne({ accessToken: token });
      
      if (userSearch) req.user = userSearch;
      else req.user = null;
  
      next();
    });
  
}



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))