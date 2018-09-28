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
      req.cookies.loginUser.account,
      params.content,
      new Date().toLocaleString(),
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
    aboutAccount = req.cookies.loginUser.account;
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
  conn.query($sql.about.searchNewAbout, req.cookies.loginUser.account, function(
    err,
    result
  ) {
    if (err) {
      console.log("getAboutErr" + err);
    }
    if (result) {
      res.send(result);
      console.log(result);
    }
  });
});
module.exports = router;
