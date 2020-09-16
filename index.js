const express = require("express");
const app = express();
const PORT = process.env.PORT || "5000";
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

app.get("/", (req, res) => {
  res.send("You are not allowed to enter this website !");
});


//Routes
app.use("/auth", require("./routes/auth/index"));
app.use("/users", require("./routes/users/index"));
app.use("/researchs", require("./routes/researchs/index"));
app.use("/settings", require("./routes/settings/index"));





app.listen(PORT, () => console.log(`Server running on port ${PORT}`))