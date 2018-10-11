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

module.exports = router;
