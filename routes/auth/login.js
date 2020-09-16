const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtToken =
  process.env.ACCESS_TOKEN_SECRET ||
  "1a00e3598aa6688f9b003b5942f321a80c49ef32c5cf911248062fb6417e9892d791fe11b887b20d49b194e8a3f0d47c7459af4a462abd083355443b055956fa";


router.post("/", async (req, res) => {
  try {
    //Check if user logged in
    if (req.user) {
      return res.json({
        success: true,
        messages: ["لقد قمت بتسجيل الدخول بالفعل"],
      });
    }

    let user = req.body;
    let errors = [];
    console.log(user);
    //check for empty inputs
    if (!user.username) errors.push("يجب كتابة اسم المستخدم");
    if (!user.password) errors.push("لا يمكنك ترك كلمة المرور فارغة");

    //check if user exist in DB
    const userResult = await db
      .collection("users")
      .findOne({ username: user.username });

    if (!userResult) errors.push("اسم المستخدم غير مسجل من قبل");

    //if any errors occur ===> STOP
    if (errors.length != 0) {
      return res.json({
        success: false,
        errors,
      });
    }

    //Check if password is ok
    if (!(await bcrypt.compare(user.password, userResult.password))) {
      return res.json({
        success: false,
        errors: ["كلمة المرور غير صحيحة"],
      });
    } else {
      //Password OK ===> PROCEED

      //delete the stored access token (if any)
      delete userResult.accessToken;

      //Create the access token
      const accessToken = jwt.sign(userResult, jwtToken);

      //store the token to the user in DB
      let storeToken = await db
        .collection("users")
        .findOneAndUpdate(
          { _id: userResult._id },
          { $set: { accessToken, lastLogin: new Date().getTime() } },
          { returnOriginal: false }
        );

      //if any errors on storing token ===> STOP
      if (!storeToken.value) {
        return res.json({
          success: false,
          errors: ["حدث خطأ أثناء تسجيل الدخول ، يرجي الرجوع الي المطور"],
        });
      }

      return res.json({
        success: true,
        messages: ["تم تسجيل الدخول بنجاح"],
        user: storeToken.value,
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
