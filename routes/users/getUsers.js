const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/", async (req, res) => {
  try {
    
    //Check if user has privilage
    if (!req.user || req.user.lvl != "مشرف") {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }

    //Get all users from DB
    const usersResult = await db.collection("users").find().toArray();

    //Check if there any users
    if (usersResult.length == 0) {
      return res.json({
        success: false,
        errors: ["لا يوجد مستخدمين"],
      });
    } else {
      return res.json({
        success: true,
        users: usersResult,
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
