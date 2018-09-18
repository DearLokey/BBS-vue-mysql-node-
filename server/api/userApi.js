var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require("../sqlMap");

//连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};

router.post('/addUser', (req, res) => {
    var addsql = $sql.user.add;
    var addsqlparams = req.body;
    var searchsql = $sql.user.search;
    var searchsqlparams = req.body.account;
    //查询数据库中是否有相同的account
    conn.query(searchsql, searchsqlparams, function (err, result) {
        if (err) {
            console.log('searcherr' + err);
        }
        if (result[0] === undefined) {
            //新增
            conn.query(addsql, [addsqlparams.account, addsqlparams.password, new Date().toLocaleString()], function (err, result) {
                if (err) {
                    console.log('adderr' + err);
                }
                if (result) {
                    jsonWrite(res, result);
                }
            })
        } else {
            res.send('-1');
        }
    })
});

module.exports = router;