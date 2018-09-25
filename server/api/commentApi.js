var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var addcommentsql = $sql.comment.add;
var searchByBBSIdsql = $sql.comment.searchByBBSId;

//获得帖子评论
router.get("/getCommentByBBSId", (req, res) => {
  let params = req.query;
  conn.query(searchByBBSIdsql, params.bbsid, function(err, result) {
    if (err) {
      console.log("getCommentByBBSIdErr" + err);
    }
    if (result) {
      res.send(result);
    }
  });
});
//新增评论
router.post("/addComment", (req, res) => {
  let params = req.body;
  conn.query(
    addcommentsql,
    [
      req.cookies.account,
      params.content,
      new Date().toLocaleDateString(),
      params.bbsid
    ],
    function(err1, result1) {
      if (err1) {
        console.log("addCommentErr" + err1);
      }
      if (result1) {
        conn.query(searchByBBSIdsql, params.bbsid, function(err2, result2) {
          if (err2) {
            console.log("getCommentByBBSIdErr" + err2);
          }
          if (result2) {
            res.send(result2);
          }
        });
      }
    }
  );
});
module.exports = router;
