const express = require("express");
const router = express.Router();


router.use("/add", require("./add"));
router.use("/getUsers", require("./getUsers"));

module.exports = router;