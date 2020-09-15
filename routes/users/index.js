const express = require("express");
const router = express.Router();
const authenticateUser = require("../../authenticateUser");

router.use(authenticateUser); //for auth

router.use("/add", require("./add"));
router.use("/edit", require("./edit"));
router.use("/getUsers", require("./getUsers"));

module.exports = router;