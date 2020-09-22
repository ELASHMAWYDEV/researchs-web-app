const express = require("express");
const router = express.Router();
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;



router.post("/", async (req, res) => {
  try {
    //Check if user has privilage
    if (
      !req.user ||
      (req.user.lvl != "مشرف" && req.user.lvl != "مدخل بيانات")
    ) {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }

    let research = req.body.research;

    //check for developer errors
    if (!research._id)
    return res.json({
      success: false,
      errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 107"]
    });


    //All OK ===> PROCEED
    let researchDelete = await db.collection("researchs").findOneAndDelete(
      { _id: ObjectId(research._id) }
    );

    if (!researchDelete) {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ: 125"],
      });
    } else {
      return res.json({
        success: true,
        messages: [`تم حذف البحث رقم #${research.index} بنجاح`],
        research: researchDelete.value
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
