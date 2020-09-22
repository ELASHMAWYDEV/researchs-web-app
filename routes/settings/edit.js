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

    let messages = [];
    let settings = req.body;
    let logoImage = req.files && req.files.logoImage;

    //Check for empty inputs ==> no errors if any is empty
    if (!settings.websiteTitle)
      messages.push("يرجي العلم أنك تركت عنوان الموقع فارغا");
    if (!settings.keywords)
      messages.push("يرجي العلم أنك تركت الكلمات المفتاحية فارغة");
    if (!settings.whatsappNumber)
      messages.push("يرجي العلم أنك تركت رقم واتساب فارغا");
    if (!settings.telegramNumber)
      messages.push("يرجي العلم أنك تركت رقم التليجرام فارغا");
    if (!settings.email)
      messages.push("يرجي العلم أنك تركت البريد الالكتروني فارغا");
    if (!logoImage) messages.push("يرجي العلم أنك لم ترفع صورة الموقع");

    //save logo
    logoImage && await logoImage.mv(`${__dirname}/../../client/public/${logoImage.name}`);


    let settingsResult = await db.collection("settings").findOneAndUpdate(
      {},
      {
        $set: {
          websiteTitle: settings.websiteTitle,
          keywords: settings.keywords,
          whatsappNumber: settings.whatsappNumber,
          telegramNumber: settings.telegramNumber,
          email: settings.email,
          logoUrl: logoImage && `/${logoImage.name}`
        },
      },
      { returnOriginal: false, upsert: true }
    );

    if (settingsResult.ok) {
      return res.json({
        success: true,
        messages: ["تم تحديث الاعدادات بنجاح", ...messages],
        settings: settingsResult.value,
      });
    }

    //If any errors occured on update
    if (!settingsResult) {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 108"],
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
