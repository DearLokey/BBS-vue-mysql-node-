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
  conn.query(searchsql, params.account, function(searcherr, searchresult) {
    if (searcherr) {
      console.log("searcherr" + searcherr);
    }
    if (searchresult[0] === undefined) {
      //新增
      conn.query(
        addsql,
        [
          params.account,
          "default.png",
          params.password,
          new Date().toLocaleString()
        ],
        function(adderr, addresult) {
          if (adderr) {
            console.log("adderr" + adderr);
          }
          if (addresult) {
            // jsonWrite(res, result);
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
  conn.query(searchsql, params.account, function(searcherr, searchresult) {
    if (searcherr) {
      console.log("searchErr" + searcherr);
    }
    if (searchresult) {
      if (searchresult[0] == null) {
        res.send("-1"); //没有该用户
        console.log("meiyou ");
      } else if (
        searchresult[0] != null &&
        searchresult[0].password != params.password
      ) {
        res.send("-2"); //密码错误
        console.log("mimacuowu")
      } else {
        conn.query(
          $sql.log.add,
          [params.account, new Date().toLocaleString()],
          function(adderr, addresult) {
            if (adderr) {
              console.log("logErr" + adderr);
            }
            if (addresult) {
              console.log("addLog");
            }
          }
        );
        res.send(searchresult[0]["account"]); //登录成功
      }
    }
  });
});
module.exports = router;
