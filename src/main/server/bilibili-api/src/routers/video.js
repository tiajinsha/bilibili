const express = require("express");
const {
  fetchVideoDetail,
  fetchPlayUrl,
  fetchRecommendById,
  fetchReplay,
  fetchVideoShot,
  fetchBarrage
} = require("../api");
const { parseString } = require("xml2js");
const router = express.Router();

// 视频详情
router.get("/av/:aId", (req, res, next) => {
  if (req.path == "/av/replay" || req.path == "/av/play_url") {
    next();
    return;
  }
  fetchVideoDetail(req.params.aId).then((data) => {
    const resData = {
      code: "1",
      msg: "success",
      data
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

// 视频地址
router.get("/av/play_url", (req, res, next) => {
  fetchPlayUrl(req.query.aId, req.query.cId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/recommend/:aId", (req, res, next) => {
  fetchRecommendById(req.params.aId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});
router.get("/av/fetchVideoShot/:aId", (req, res, next) => {
  console.log(req.params.aId,'req.params.aId')
  fetchVideoShot(req.params.aId).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/replay", (req, res, next) => {
  let aId = req.query.aId;
  let p = req.query.p;
  fetchReplay(aId, p).then((data) => {
    let resData = {
      code: "1",
      msg: "success"
    }
    if (data.code === 0) {
      resData.data = data.data;
    } else {
      resData.code = "0";
      resData.msg = "fail";
    }
    res.send(resData);
  }).catch(next);
});

router.get("/av/barrage/:cId", (req, res, next) => {
  fetchBarrage(req.params.cId).then((xml) => {
    parseString(xml, { explicitArray : false, trim: true } , (err, result) => {
      if (!err) {
        let resData = {
          code: "1",
          msg: "success",
          data: []
        }
        if (result.i.d) {
          result.i.d.forEach((item) => {
            let p = item.$.p;
            let attrs = p.split(",");
            resData.data.push({
              time: attrs[0],  // 时间
              type: attrs[1],  // 类型
              decimalColor: attrs[3],  // 十进制颜色
              sendTime: attrs[4],   // 发送时间
              content: item._,  // 内容
              p
            });
          });
        }
        res.send(resData);
      } else {
        next(err);
      }
    });
    
  }).catch(next);
});

module.exports = router;
