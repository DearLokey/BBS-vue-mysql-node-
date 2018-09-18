// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into t_user(account, password, create_time) values (?, ?, ?)',
        search:'select * from t_user where account = ?'
    }
}

module.exports = sqlMap;