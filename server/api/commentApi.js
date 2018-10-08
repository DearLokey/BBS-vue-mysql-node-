var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var addcommentsql = $sql.comment.add;
var searchByFloorIdsql = $sql.comment.searchByFloorId;

//新增评论
router.post("/addComment", (req, res) => {
  let params = req.body;
  conn.query(
    addcommentsql,
    [
      params.user_account,
      params.content,
      new Date().toLocaleString(),
      params.bbsid,
      params.floorid,
      params.commentaccount
    ],
    function(err1, result1) {
      if (err1) {
        console.log("addCommentErr" + err1);
      }
      if (result1) {
        res.send(result1.insertId.toLocaleString());
      }
    }
  );
});
// 新增与我相关
router.post("/addAbout", (req, res) => {
  let params = req.body;
  let aboutAccount;
  if (params.comment_account) {
    aboutAccount = params.comment_account;
  } else {
    aboutAccount = params.user_account;
  }
  conn.query($sql.about.add, [0, params.comment_id, aboutAccount], function(
    err,
    result
  ) {
    if (err) {
      console.log("getAboutErr" + err);
    }
    if (result) {
      res.send(result);
    }
  });
});
//与我相关
router.get("/getAbout", (req, res) => {
  let params = req.query;
  console.log(params.user_account==15295532565)
  conn.query($sql.about.searchNewAbout, params.user_account, function(
    err,
    result
  ) {
    if (err) {
      console.log("getAboutErr" + err);
    }
    if (result) {
      // result.forEach((element, index) => {
      //   conn.query($sql.comment.searchById, element["comment_id"], function(
      //     err1,
      //     result1
      //   ) {
      //     if (err1) {
      //       console.log("getcommentbyabout" + err1);
      //     }
      //     if (result1) {
      //       element["commentDetail"] = result1[0];
      //       conn.query($sql.bbs.getById, result1[0].bbs_id, function(
      //         err2,
      //         result2
      //       ) {
      //         if (err2) {
      //           console.log("getbbsbyid" + err2);
      //         }
      //         if (result2) {
      //           element["bbsDetail"] = result2[0];
      //           if (index == result.length - 1) {
      res.send(result);
      //             console.log(result);
      //           }
      //         }
      //       });
      //     }
      //   });
      // });
    }
  });
});
router.post("/updateAbout", (req, res) => {
  let params = req.body;
  conn.query($sql.about.update, params.about_id, function(err, result) {
    if (err) {
      console.log("update" + err);
    }
    if (result) {
    }
  });
});
module.exports = router;
