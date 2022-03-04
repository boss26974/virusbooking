const { findById } = require("../models/User");
const User = require("../models/User");
const { verifyTsoken, verifyTokenAndAuthorization } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const dotenv = require('dotenv');
dotenv.config();

const router = require("express").Router();

//UPDATE
// router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
//   if (req.body.pass) {
//     req.body.pass = CryptoJS.AES.encrypt(
//       req.body.pass,
//       process.env.PASS_SEC
//     ).toString();
//   }

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );
//     res.status(200).json({"status": true, "message": "You are authenticated!"});
//   } catch (err) {
//       res.status(500).json({"message": "Error!!" + err})
//   }
// });

// added
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res
        .status(203)
        .json({ status: false, message: "ไอดีที่เรียกไม่ถูกต้อง" });
    } else {
      res
        .status(201)
        .json({ status: true, message: "ไอดีที่เรียกถูกต้อง", info: user });
    }
    // res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//added
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ status: true, message: "อัพเดทข้อมูลสำเร็จ", info: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "อัพเดทข้อมูลไม่สำเร็จ กรุณาลองใหม่ภายหลัง" });
  }
});

//added
router.put("/changepass/:id", async (req, res) => {
  try{
      const user = await User.findById(req.params.id);
      const hashedPass = await CryptoJS.AES.decrypt(
          user.pass,
          process.env.PASS_SEC
      );
      const pass = await hashedPass.toString(CryptoJS.enc.Utf8);
      if(pass == req.body.oldpass){
          const new_pass = await CryptoJS.AES.encrypt(req.body.pass, process.env.PASS_SEC).toString();
          const new_user = await User.findByIdAndUpdate(req.params.id , {pass: new_pass});

          res.json({"status":true, "message": "เปลี่ยนรหัสผ่านสำเร็จ"})
      }else{
        res.json({"status": false, "message": "รหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง"})
      }
  }catch (err) {
      res.status(500).json({"message": "อัพเดทข้อมูลไม่สำเร็จ กรุณาลองใหม่ภายหลัง"})
  }
});

module.exports = router;
