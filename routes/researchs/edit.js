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

    let research = req.body;
    let errors = [];

    //check for empty inputs
    if (!research._id)
      errors.push("حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 107");
    if (!research.title) errors.push("لا يمكنك ترك عنوان البحث فارغا");
    if (!research.details) errors.push("لا يمكنك ترك تفاصيل البحث فارغة");
    if (!research.year) errors.push("يجب اختيار سنة البحث");
    if (!research.degree) errors.push("يجب اختيار درجة البحث");
    if (!research.country) errors.push("يجب اختيار بلد البحث");

    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //All OK ===> PROCEED
    let researchResult = await db.collection("researchs").findOneAndUpdate(
      { _id: ObjectId(research._id) },
      {
        $set: {
          title: research.title,
          details: research.details,
          year: research.year,
          degree: research.degree,
          country: research.country,
        },
      },
      { returnOriginal: false }
    );

    if (researchResult.ok) {
      return res.json({
        success: true,
        messages: ["تم تعديل البحث بنجاح"],
        research: researchResult.value,
      });
    } else {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 104"],
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
