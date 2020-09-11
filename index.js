const express = require("express");
const app = express();
const PORT = process.env.PORT || "5000";


app.get("/", (req, res) => {
  res.send("You are not allowed to enter this website !");
})





app.listen(PORT, () => console.log(`Server running on port ${PORT}`))