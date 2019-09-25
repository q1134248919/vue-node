export default {
     changeLoginStatus(state){
        state.isLogin=!state.isLogin;
    },
    getUserInfo(state,msg){
       state.userInfo=msg;
    }
    
}