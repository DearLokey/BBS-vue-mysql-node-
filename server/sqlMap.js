// sql语句
var sqlMap = {
  // 用户
  user: {
    add: "insert into t_user(account, password, create_time) values (?, ?, ?)",
    search: "select * from t_user where account = ?"
  },
  bbs: {
    add:
      "insert into t_bbs(user_account,title,content,create_time) values (?,?,?,?)",
    getAll: "select * from t_bbs",
    getById: "select * from t_bbs where id = ?"
  },
  floor:{
    add:"insert into t_floor(bbs_id,user_account,content,create_time) values (?,?,?,?)", 
    getByBBSId:"select * from t_floor where bbs_id = ?",
  },
  comment: {
    add:
      "insert into t_comment(user_account,content,create_time,floor_id,user_account2) values (?,?,?,?,?)",
    searchByFloorId: "select * from t_comment where floor_id = ?"
  },
  log: {
    add: "insert into t_log(user_account,login_time) values (?,?)"
  }
};

module.exports = sqlMap;
