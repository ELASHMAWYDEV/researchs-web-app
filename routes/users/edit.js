const express = require("express");
const router = express.Router();
const db = require("../../db");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    //Check if user has privilage
    if (!req.user || req.user.lvl != "مشرف") {
      return res.json({
        success: false,
        errors: ["غير مسموح لك بالإطلاع علي هذه المعلومات"],
      });
    }

    let user = req.body;
    let errors = [];

    //Check for empty inputs
    if (!user._id)
      errors.push("حدث خطأ ما ،يرجي الرجوع للمطور ، رقم الخطأ 105");
    if (!user.username) errors.push("يجب كتابة اسم المستخدم");
    if (!user.lvl) errors.push("يجب اختيار المستوي");

    //if the admin tried to change user's password
    if (user.password || user.passwordConfirm) {
      //Password validation
      if (!user.password) errors.push("يجب كتابة كلمة المرور");
      if (!user.passwordConfirm) errors.push("يجب كتابة تأكيد كلمة المرور");
      if (user.password != user.passwordConfirm)
        errors.push("يجب أن يكون كلمة المرور وتأكيد كلمة المرور متطابقين");
      if (user.password.length < 6)
        errors.push("يجب أن تكون كلمة المرور أكثر من 6 أحرف");
    }

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
    }

    //All OK ===> PROCEED

    /*----------With Password Change-----------*/
    if (user.password) {
      //Encrypt the password before putting in DB
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const userResult = await db.collection("users").findOneAndUpdate(
        {
          _id: ObjectId(user._id),
        },
        {
          $set: {
            username: user.username,
            lvl: user.lvl,
            password: hashedPassword,
            accessToken: "randomAccessTokenCannotBeLeftNull", //remove the access token because password has changed
          },
        },
        {
          returnOriginal: false,
        }
      );

      if (userResult) {
        return res.json({
          success: true,
          messages: ["تم تحديث المستخدم وكلمة مروره بنجاح"],
          user: userResult.value,
        });
      }
    } else {
      /*----------No Password Change-----------*/
      const userResult = await db.collection("users").findOneAndUpdate(
        {
          _id: ObjectId(user._id),
        },
        {
          $set: {
            username: user.username,
            lvl: user.lvl,
          },
        },
        {
          returnOriginal: false,
        }
      );

      if (userResult) {
        return res.json({
          success: true,
          messages: ["تم تحديث المستخدم بنجاح"],
          user: userResult.value,
        });
      }
    }

    //If any errors occured on update
    if (!userResult) {
      return res.json({
        success: false,
        errors: ["حدث خطأ ما ، يرجي الرجوع للمطور ، رقم الخطأ 106"],
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
