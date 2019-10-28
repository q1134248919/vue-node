<template>
  <div class="hello">
  
 
    <img src="../assets/logo.png">
    <h2>Hello</h2>
    <div>
      <div class="account">
        账号：
      <input type="text" v-model='account' @input="press" placeholder="账号长度为6-13位">
      <span :class="[!isUse===true?'green':'red']">{{msg}}</span>
      </div>
      <p class="password">密码：<input type="password" @input="pressPsw"  v-model='password' placeholder="密码长度为6-20位">
          <span class="red">{{pswMsg}}</span>
      </p>
    
      <button @click='login' class="create">创建</button>
    </div>
  </div>
</template>

<script>
 
import {createAccount,checkAccount} from "../lib/ApiSetting";
export default {
   name:'signin',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      account:'',
      password:'',
      isPress:false,
      t:null,
      msg:'',
      isUse:true,
      pswMsg:'',
      actStyle:false,
      pswStyle:false,
    }
  },
  created() {

  },
  methods: {
      async login(){
       
       if(this.account === ''||this.password === ''||this.isUse||!this.pswStyle||!this.actStyle){
         return false;
       }
     const  res= await createAccount({account:this.account,password:this.password});
        let {name,time,_id}=res.data;
        let newdata={name,time,_id};
         localStorage.setItem('loginStatus',true);
         localStorage.setItem("userInfo",JSON.stringify(newdata));
         this.$store.dispatch("getUserInfo",newdata);
          this.$store.dispatch("changeLoginStatus");
          this.$router.push('/');
          console.log(2);
  },
  press(){
        if(this.account.length<6||this.account.length>13){
                   this.msg='账号的长度应该为6-13位';
                   this.actStyle=false;
                   this.isUse=true; 
                   setTimeout(() => {
                    this.msg='';
                   },2500);   
       }
       else{
         this.msg='';
         this.actStyle=true;
       }
       
    
    if(this.actStyle){

    if(this.t){
    clearTimeout(this.t);
    }
      this.t=setTimeout( ()=>{
      const res = checkAccount({account:this.account}).then((res)=>{
        
       if(res.data.length<1){
         this.msg="该账号可以使用";
         this.isUse=false;
         setTimeout(()=>{
           this.msg='';
         },2500)
       }
       else{
         this.msg="该账号已经被注册了";
         this.isUse=true;
       }
      });
     
    },400)
  }
  },
  pressPsw(){
 if(this.password.length<6||this.password.length>20){
                   this.pswMsg="密码的长度应该为6-20位";
                   this.pswStyle=false;
       }
       else{
           this.pswMsg='';
           this.pswStyle=true;
       }
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
 text-align: center;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.account {
  position: relative;
}
.password{
  position: relative;
}
.password span{
position: absolute;
left:50%;
margin-left: 100px;
}
.account span{
position: absolute;
left:50%;
margin-left: 100px;
}
.red{
color:red;
}
.green{
  color:#42b983;
}
.create{
  background:#42b983;
  color: #fff;
  width: 80px;
  height: 30px;

  line-height:30px;
}
</style>
