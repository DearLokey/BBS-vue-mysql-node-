// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into t_user(account, password, create_time) values (?, ?, ?)',
        search:'select * from t_user where account = ?'
    },
    bbs:{
        add: 'insert into t_bbs(title,content,create_time,create_account) values (?,?,?,?)',
        getAll:'select * from t_bbs'
    },
    log:{
        add:'insert into t_log(user_account,login_time) values (?,?)',
    }
}

module.exports = sqlMap;