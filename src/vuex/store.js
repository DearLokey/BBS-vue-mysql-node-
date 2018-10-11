import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
Vue.use(Vuex);

const state = {
  allbbs: ["aaa"],
  user: ""
};

const mutations = {
  LOGIN(state, user) {
    state.user = user;
  },
  ALLBBS(state, allbbs) {
    state.allbbs = allbbs;
  }
};

const actions = {
  login({ commit }, paramArr) {
    axios
      .post("/api/user/login", {
        account: paramArr[0],
        password: paramArr[1]
      })
      .then(res=>{
        if(res.data == 0){
          router.push({ path: "/" })
          localStorage.setItem("loginUser",paramArr[0])
        }
      })
      .catch(err => console.log(err));
  },
  getallbbs({ commit }) {
    axios
      .get("/api/bbs/getAll")
      .then(res => commit("ALLBBS", res.data))
      .catch(err => console.log(err));
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions
});
