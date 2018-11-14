/**
 * vuex异步操作
 * @author lk 2018-11-08
 */
import Vue from 'vue';
import common from '@/assets/js/common';
const actions = {
    // 登录
    login({ commit }, userInfo) {
        const username = userInfo.username.trim();
        return new Promise((resolve, reject) => {
            Vue.prototype.$ajax({
                url: '/login',
                method: 'POST',
                data: {
                    username:userInfo.username,
                    password:userInfo.password
                }
            }).then(response => {
                const data = response.data;
                common.cookie.set('token',data.token);
                common.cookie.set('name',data.name);
                common.cookie.set('role',data.role);
                commit('SET_TOKEN', data.token);
                commit('SET_NAME', data.name);
                commit('SET_ROLE', data.role);
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
                    token:state.token,
                }
            }).then(() => {
                commit('SET_TOKEN', '');
                common.cookie.delete('token');
                resolve();
            }).catch(error => {
                reject(error);   
            });
        });
    }
}
export default actions;