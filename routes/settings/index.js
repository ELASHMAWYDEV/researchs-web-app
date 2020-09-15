const express = require("express");
const router = express.Router();
const authenticateUser = require("../../authenticateUser");

router.use(authenticateUser); //for auth


router.use("/edit", require("./edit"));




module.exports = router;