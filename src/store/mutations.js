/**
 * vuex同步操作
 * @author lk 2018-11-08
 */
const mutations = {
	SET_ROLE:(state,role)=>{
		state.role = role;
	},
	SET_NAME:(state,name)=>{
		state.name = name;
	},
	SET_TOKEN:(state,token)=>{
		state.token = token;
	}
}
export default mutations;
