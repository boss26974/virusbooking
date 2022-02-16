const Beds = require("../models/Beds");
const User = require("../models/User");
const Bedsdealing = require("../models/Bedsdealing");
const router = require("express").Router();

//added
router.post("/beds", async (req, res) => {
  try {
    const newBed = await new Beds({
      amount: req.body.amount,
      hno: req.body.hno,
      no: req.body.no,
      lane: req.body.lane,
      district: req.body.district,
      area: req.body.area,
      province: req.body.province,
      zipcode: req.body.zipcode,
      user_id: req.body.user_id,
    });

    const New_Beds = await newBed.save();
    res.status(203).json({ status: true, message: "ลงทะเบียนเตียงสำเร็จ!" });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

router.get("/bedsbyusers/:id", async (req, res) => {
  try {
    const beds = await Beds.find({ user_id: req.params.id });
    const userby = await User.find();
    const dealing = await Bedsdealing.find();
    var list = [];
    for (let i = 0; i < beds.length; i++) {
      let name;
      let datadeal = [];
      for (let y = 0; y < userby.length; y++) {
        if (beds[i].user_id == userby[y]._id + "") {
          name = userby[y];
        }
      }
      for (let z = 0; z < dealing.length; z++){
        if (beds[i]._id == dealing[z].bed_id){
          datadeal.push(dealing[z]);
        }
      }
      list.push({
        _id: beds[i]._id,
        amount: beds[i].amount,
        hno: beds[i].hno,
        no: beds[i].no,
        lane: beds[i].lane,
        district: beds[i].district,
        area: beds[i].area,
        province: beds[i].province,
        zipcode: beds[i].zipcode,
        user_id: beds[i].user_id,
        createdAt: beds[i].createdAt,
        updatedAt: beds[i].updatedAt,
        user: name,
        bedsdealing: datadeal
      });
    }

    if (list.length === 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" });
    } else {
      res
        .status(203)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: {bed: list} });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "เกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

/// added
router.get("/beds/:id", async (req, res) => {
  try {
    const bedsid = await Beds.findById(req.params.id);
    const userid = await User.find();
    var list = [];

    let name;

    for (let i = 0; i < userid.length; i++) {
      if (bedsid.user_id == userid[i]._id + "") {
        name = userid[i];
      }
    }
    list.push({
      _id: bedsid._id,
      amount: bedsid.amount,
      hno: bedsid.hno,
      no: bedsid.no,
      lane: bedsid.lane,
      district: bedsid.district,
      area: bedsid.area,
      province: bedsid.province,
      zipcode: bedsid.zipcode,
      user_id: bedsid.user_id,
      createdAt: bedsid.createdAt,
      updatedAt: bedsid.updatedAt,
      user: name,
    });

    if (list.length == 0) {
      res.status(203).json({ status: false, message: "ไม่มีข้อมูล!" });
    } else {
      res
        .status(203)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: list });
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: "ไม่มีข้อมูลหรือเกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

/// added
router.get("/bedsready", async (req, res) => {
  try {
    const bedsready = await Beds.find({ amount: { $gt: 0 } });
    const user = await User.find();
    const list = [];

    for (let i = 0; i < bedsready.length; i++) {
      let name;
      for (let y = 0; y < user.length; y++) {
        if (bedsready[i].user_id == user[y]._id + "") {
          name = user[y];
        }
      }
      list.push({
        _id: bedsready[i]._id,
        amount: bedsready[i].amount,
        hno: bedsready[i].hno,
        no: bedsready[i].no,
        lane: bedsready[i].lane,
        district: bedsready[i].district,
        area: bedsready[i].area,
        province: bedsready[i].province,
        zipcode: bedsready[i].zipcode,
        user_id: bedsready[i].user_id,
        createdAt: bedsready[i].createdAt,
        updatedAt: bedsready[i].updatedAt,
        user: name,
      });
    }

    if (list.length === 0) {
      res
        .status(203)
        .json({ status: false, message: "ไม่มีเตียงที่พร้อมให้บริการ!" });
    } else {
      res
        .status(200)
        .json({ status: true, message: "การค้นหาสำเร็จ!", info: list });
    }
  } catch (err) {
    res.status(404).json({
      status: false,
      message: "ไม่มีข้อมูลหรือเกิดข้อผิดพลาดกรุณาลงทะเบียนอีกครั้งภายหลัง",
    });
  }
});

module.exports = router;
