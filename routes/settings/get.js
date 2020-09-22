const express = require("express");
const router = express.Router();
const db = require("../../db");


router.post("/", async (req, res) => {
  try {

    let settings = await db.collection("settings").findOne({});
    if (settings) {
      return res.json({
        success: true,
        settings
      });
    } else {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ: 121"],
      });
    }


  } catch (e) {
    return res.json({
      success: false,
      errors: ["حدث خطأ ما", e.message],
    });
  }
});

module.exports = router;
