<!--  -->
<template>
  <div class="warpper">
    <div>
      <div class="account">
        账号：
        <input type="text" v-model="account" />
      </div>
      <p>
        密码：
        <input type="text" v-model="password" />
      </p>
      <button @click="login" class="create">登陆</button>
    </div>
  </div>
</template>

<script>
import { Loginin } from "../lib/ApiSetting";
export default {
  name: "signup",
  data() {
    return {
      account: "",
      password: ""
    };
  },

  components: {},

  computed: {},

  mounted: function() {},

  methods: {
    async login() {
      if (this.account === "" || this.password === "") {
        return false;
      }
      const res = await Loginin({
        account: this.account,
        password: this.password
      });
      let { name, time, id } = res.data;
      let newdata = { name, time, id };
      newdata = JSON.stringify(newdata);
      if (res.data.length >= 1) {
        localStorage.setItem("loginStatus", true);
        localStorage.setItem("userInfo", JSON.stringify(newdata));
        this.$store.dispatch("getUserInfo", newdata);
        this.$store.dispatch("changeLoginStatus");
        this.$router.push("/");
      } else {
        alert("账号或者密码错误");
      }
    }
  }
};
</script>
<style lang='css' scoped>
</style>