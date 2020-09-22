const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/", async (req, res) => {
  try {
    //Check if user has privilage
    if (
      !req.user &&
      (req.user.lvl != "مشرف" || req.user.lvl != "مدخل بيانات")
    ) {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }


    let research = req.body;
    let errors = [];

    //check for empty inputs
    if (!research.title) errors.push("لا يمكنك ترك عنوان البحث فارغا");
    if (!research.details) errors.push("لا يمكنك ترك تفاصيل البحث فارغة");
    if (!research.year) errors.push("يجب كتابة سنة البحث");
    if (!research.degree) errors.push("يجب كتابة درجة البحث");
    if (!research.country) errors.push("يجب كتابة بلد البحث");

    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //All OK ===> PROCEED

    /*
    
    *------In case the user submitted a file-----*
    
    */
    if (req.files && req.files.file) {
      fileExist = true;
      let fileExt = req.files.file.name.split(".").pop();

      let researchResult = await db.collection("researchs").insertOne({
        title: research.title,
        details: research.details,
        year: research.year,
        degree: research.degree,
        country: research.country,
        fileExist,
        fileExt: fileExist && fileExt,
      });

      if (researchResult && researchResult.insertedCount != 0) {
        //save the file in researchs folder with the id as its name
        if (req.files && req.files.file) {
          req.files.file.mv(
            `${__dirname}/../../client/public/researchs/${researchResult.insertedId}.${fileExt}`
          );
        }
        return res.json({
          success: true,
          messages: ["تم اضافة البحث ورفع الملف بنجاح"],
          research: researchResult.value,
        });
      } else {
        return res.json({
          success: false,
          errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 104"],
        });
      }
    }

    /*
    
    *------In case the user DID NOT submitted a file-----*
    
    */

    let researchResult = await db.collection("researchs").insertOne({
      title: research.title,
      details: research.details,
      year: research.year,
      degree: research.degree,
      country: research.country,
      fileExist: false,
    });

    if (researchResult && researchResult.insertedCount != 0) {
      return res.json({
        success: true,
        messages: ["تم اضافة البحث بنجاح"],
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
