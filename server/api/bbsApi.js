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

//新增bbs，重新获取所有列表
router.post("/addBBS", (req, res) => {
  let params = req.body;
  conn.query(
    addsql,
    [
      req.cookies.loginUser.account,
      params.title,
      params.content,
      new Date().toLocaleString()
    ],
    function(err1, result1) {
      if (err1) {
        console.log("adderr" + err1);
      }
      if (result1) {
        conn.query(getallsql, function(err2, result2) {
          if (err2) {
            console.log("getAllerr" + err2);
          }
          if (result2) {
            res.send(result2);
          }
        });
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

//根据id获取bbs
router.get("/getBBSById", (req, res) => {
  let params = req.query;
  conn.query(getByIdsql, params.id, function(err1, result1) {
    if (err1) {
      console.log("getBBSByIderr" + err1);
    }
    if (result1) {
      conn.query($sql.user.search, result1[0]["user_account"], function(
        err2,
        result2
      ) {
        if (err2) {
          console.log("searchUsererr" + err2);
        }
        if (result2) {
          result1["user_head"] = result2[0]['head'];
          console.log(result1["user_head"])
          res.send(result1);
        }
      });
    }
  });
});
//新增楼层
router.post("/addFloor", (req, res) => {
  let params = req.body;
  conn.query(
    $sql.floor.add,
    [
      params.bbs_id,
      req.cookies.loginUser.account,
      params.content,
      new Date().toLocaleString()
    ],
    function(err1, result1) {
      if (err1) {
        console.log("addFloorErr:" + err1);
      }
      if (result1) {
        conn.query($sql.floor.getByBBSId, params.bbs_id, function(
          err2,
          result2
        ) {
          if (err2) {
            console.log("getAllFloorErr" + err2);
          }
          if (result2) {
            res.send(result2);
          }
        });
      }
    }
  );
});
//根据id获取bbs的floor和对应的评论
router.get("/getAllFloor", (req, res) => {
  let params = req.query;
  conn.query($sql.floor.getByBBSId, params.bbs_id, function(err1, result1) {
    if (err1) {
      console.log("getAllFloorErr" + err1);
    }
    if (result1) {
      result1.forEach(function(item, index) {
        conn.query($sql.comment.searchByFloorId, item["id"], function(
          err2,
          result2
        ) {
          if (err2) {
            console.log("getCommentByBBSIdErr" + err2);
          }
          if (result2) {
            item["commentList"] = result2;
            if (index == result1.length - 1) {
              res.send(result1);
            }
          }
        });
      });
    }
  });
});
module.exports = router;
