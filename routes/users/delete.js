require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;

//remove user
router.post("/", async (req, res) => {
  try {
    //Check if user has privilage
    if (!req.user || req.user.lvl != "مشرف") {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }

    let user = req.body.user;

    //Check for developement errors
    if (!user._id) {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ: 120"],
      });
    }


    //All OK ===> PROCEED
    const userDelete = await db.collection("users").findOneAndDelete({
      _id: ObjectId(user._id),
    });

    if (!userDelete) {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ: 102"],
      });
    }

    if (userDelete && userDelete.value) {
      return res.json({
        success: true,
        messages: ["تم حذف المستخدم بنجاح"],
        user: userDelete.value,
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
