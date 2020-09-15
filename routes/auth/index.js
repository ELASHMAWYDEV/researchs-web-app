const express = require("express");
const router = express.Router();
const authenticateUser = require("../../authenticateUser");

router.use(authenticateUser); //for auth


router.use("/login", require("./login"));
router.use("/register", require("./register"));





module.exports = router;