var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var addsql = $sql.bbs.add;
var getallsql = $sql.bbs.getAll;
var getByIdsql = $sql.bbs.getById;

//新增bbs
router.post("/addBBS", (req, res) => {
  let params = req.body;
  conn.query(
    addsql,
    [
      params.title,
      params.content,
      new Date().toLocaleString(),
      req.cookies.account
    ],
    function(err, result) {
      if (err) {
        console.log("adderr" + err);
      }
      if (result) {
        res.send("0");
      }
    }
  );
});

//所有帖子
router.get("/getAll", (req, res) => {
  conn.query(getallsql, function(err, result) {
    if (err) {
      console.log("getAllerr" + err);
    }
    if (result) {
      res.send(result);
    }
  });
});

//根据id
router.get("/getBBSById", (req, res) => {
  let params = req.query;
  conn.query(getByIdsql, params.id, function(err, result) {
    if (err) {
      console.log("getBBSByIderr" + err);
    }
    if (result) {
      res.send(result);
    }
  });
});

module.exports = router;
