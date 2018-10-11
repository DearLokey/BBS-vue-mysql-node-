var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

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
  console.log(parseInt(req.query.user_account));
  conn.query(
    $sql.about.searchStatus,
    parseInt(req.query.user_account),
    function(err, result) {
      if (err) {
        console.log("getAboutErr" + err);
      }
      if (result) {
        if (result.length > 0) {
          result.forEach((element, index) => {
            conn.query($sql.comment.searchById, element["comment_id"], function(
              err1,
              result1
            ) {
              if (err1) {
                console.log("getcommentbyabout" + err1);
              }
              if (result1) {
                element["commentDetail"] = result1[0];
                conn.query($sql.bbs.getById, result1[0].bbs_id, function(
                  err2,
                  result2
                ) {
                  if (err2) {
                    console.log("getbbsbyid" + err2);
                  }
                  if (result2) {
                    element["bbsDetail"] = result2[0];
                    if (index == result.length - 1) {
                      res.send(result);
                      console.log(result);
                    }
                  }
                });
              }
            });
          });
        }else{
            res.send("0")
        }
      }
    }
  );
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
