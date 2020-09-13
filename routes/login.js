const express = require("express");
const router = express.Router();


router.post("/", (req, res) => {

  //Check if user logged in
  if (req.user) {
    return res.json({
      success: true,
      messages: ["لقد قمت بتسجيل الدخول بالفعل"]
    });
  }

    

});



module.exports = router;