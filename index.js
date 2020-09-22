const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || "5000";
const fileUpload = require("express-fileupload");
const db = require("./db");

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

//For the react app
if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

//Routes
app.use("/auth", require("./routes/auth/index"));
app.use("/users", require("./routes/users/index"));
app.use("/researchs", require("./routes/researchs/index"));
app.use("/settings", require("./routes/settings/index"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
