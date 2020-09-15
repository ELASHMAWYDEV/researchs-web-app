require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");

//add user
router.post("/", async (req, res) => {
  try {
    //Check if user has privilage
    if (!req.user || req.user.lvl != "مشرف") {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }

    
    let errors = [];
    let user = req.body;

    /*----------VALIDATION----------*/
    //Check for empty inputs
    if (!user.username) errors.push("يجب كتابة اسم المستخدم");
    if (!user.lvl) errors.push("يجب اختيار المستوي");
    if (!user.password) errors.push("يجب كتابة كلمة المرور");
    if (!user.passwordConfirm) errors.push("يجب كتابة تأكيد كلمة المرور");

    //Password validation
    if (user.password.length < 6)
      errors.push("يجب أن تكون كلمة المرور أكثر من 6 أحرف");
    if (user.password != user.passwordConfirm)
      errors.push("يجب أن يكون كلمة المرور وتأكيد كلمة المرور متطابقين");

    //Check if username exist in DB
    const usernameCheck = await db
      .collection("users")
      .findOne({ username: user.username });
    if (usernameCheck) errors.push("اسم المستخدم موجود من قبل");

    //if there any errors ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    } else {
      //All OK ===> PROCEED

      //Encrypt the password before putting in DB
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userResult = await db.collection("users").insertOne({
        username: user.username,
        lvl: user.lvl,
        password: hashedPassword,
        createdAt: new Date(),
      });

      if (!userResult)
        errors.push("حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ: 102");

      if (userResult && userResult.insertedCount == 1) {
        return res.json({
          success: true,
          messages: ["تم اضافة المستخدم بنجاح"],
          user: userResult,
        });
      }
    }
  } catch (e) {
    return res.json({
      success: false,
      errors: ["حدث خطأ ما", e.message],
    });
  }
});

module.exports = router;
