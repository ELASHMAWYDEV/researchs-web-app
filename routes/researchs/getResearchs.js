const express = require("express");
const router = express.Router();
const db = require("../../db");

router.post("/", async (req, res) => {
  try {


    //All OK ===> PROCEED
    let researchsResult = await db.collection("researchs").find().toArray();

    if (researchsResult.length != 0) {
      return res.json({
        success: true,
        researchs: researchsResult
      })
    } else {
      return res.json({
        success: false,
        errors: ["لا يوجد أبحاث لعرضها"]
      })
    }

  } catch (e) {
    return res.json({
      success: false,
      errors: ["حدث خطأ ما", e.message],
    });
  }
});


module.exports = router;