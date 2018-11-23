/**
 * vuex异步操作
 * @author lk 2018-11-08
 */
import Vue from 'vue';
import common from '@/assets/js/common';
const actions = {
    // 登录
    login({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            Vue.prototype.$ajax({
                url: '/login',
                method: 'POST',
                data: {
                    username:userInfo.username,
                    password:userInfo.password
                }
            }).then(response => {
                let data = response.data,
                    info = {token:data.token,name:data.name};
                common.cookie.set(common.cookie.dataName,JSON.stringify(info));
                commit('SET_DATA', info);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },

    // 登出
    logOut({ commit, state }){
        return new Promise((resolve, reject) => {
            Vue.prototype.$ajax({
                url: '/logout',
                method: 'POST',
                data: {
                    token:state.data.token
                }
            }).then(() => {
                commit('SET_DATA', '');
                common.cookie.delete(common.cookie.dataName);
                resolve();
            }).catch(error => {
                reject(error);   
            });
        });
    }
}
export default actions;