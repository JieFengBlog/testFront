import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        userInfo: {
            id:null,
            name:null,
            type:null,
        },
        isLogin:null,
    },
    getters:{
        isLogin(state){
            if(state.isLogin == null){
                if(sessionStorage.getItem("isLogin") == "1")
                    state.isLogin = true;
                else
                    state.isLogin = false;

                state.userInfo.id = Number(sessionStorage.getItem("id"));
                state.userInfo.name = sessionStorage.getItem("name");
                state.userInfo.type = sessionStorage.getItem("type");
            }
            return state.isLogin;
        }
    },

    mutations: {

        //添加登录的用户信息
        ADD_LOGIN_USER (state, user) {
            sessionStorage.setItem("id", user.id); //添加到sessionStorage
            sessionStorage.setItem("name", user.name);
            if(user.type == 0){
                sessionStorage.setItem("classId",user.classId.id);
            }
            sessionStorage.setItem("isLogin","1");
            sessionStorage.setItem("type",user.type);
            state.userInfo.id = user.id;
            state.userInfo.name = user.name;
            state.isLogin = true;
        },

        //用户登出
        //清除所有的用户信息
        SIGN_OUT (state) {   //退出，删除状态
            sessionStorage.removeItem("username");  //移除sessionStorage
            sessionStorage.removeItem("isLogin");
            sessionStorage.removeItem("type");
            state.userInfo.name = '';           //同步的改变story中的状态
            state.userInfo.id = null;
            state.isLogin = false;
        }
    }
})

export default store;