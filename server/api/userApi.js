var models = require("../db");
var express = require("express");
var router = express.Router();
var mysql = require("mysql");
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === "undefined") {
    res.json({
      code: "1",
      msg: "操作失败"
    });
  } else {
    res.json(ret);
  }
};
var addsql = $sql.user.add;
var searchsql = $sql.user.search;
//注册
router.post("/regist", (req, res) => {
  let params = req.body;
  //查询数据库中是否有相同的account
  conn.query(searchsql, params.account, function(err, result) {
    if (err) {
      console.log("searcherr" + err);
    }
    if (result[0] === undefined) {
      //新增
      conn.query(
        addsql,
        [params.account, params.password, new Date().toLocaleString()],
        function(err, result) {
          if (err) {
            console.log("adderr" + err);
          }
          if (result) {
            jsonWrite(res, result);
            res.send("0"); //注册成功
          }
        }
      );
    } else {
      res.send("-1"); //该用户已存在
    }
  });
});
//登录
router.post("/login", (req, res) => {
  let params = req.body;
  conn.query(searchsql, params.account, function(err, result) {
    if (err) {
      console.log("searchErr" + err);
    }
    if (result[0] === undefined) {
      res.send("-1"); //没有该用户
    }
    if (result[0].password != params.password) {
      res.send("-2"); //密码错误
    } else {
      conn.query(
        $sql.log.add,
        [params.account, new Date().toLocaleString()],
        function(err, result) {
          if (err) {
            console.log("logErr" + err);
          }
          if (result) {
              console.log(result);
          }
        }
      );
      res.send("0"); //登录成功
    }
  });
});
module.exports = router;
