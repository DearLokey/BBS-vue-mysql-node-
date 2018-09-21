// sql语句
var sqlMap = {
  // 用户
  user: {
    add: "insert into t_user(account, password, create_time) values (?, ?, ?)",
    search: "select * from t_user where account = ?"
  },
  bbs: {
    add:
      "insert into t_bbs(title,content,create_time,create_account) values (?,?,?,?)",
    getAll: "select * from t_bbs",
    getById: "select * from t_bbs where id = ?"
  },
  comment: {
    add:
      "insert into t_comment(comment_account,content,comment_time,bbs_id) values (?,?,?,?)",
    searchByBBSId: "select * from t_comment where bbs_id = ?"
  },
  log: {
    add: "insert into t_log(user_account,login_time) values (?,?)"
  }
};

module.exports = sqlMap;
