<!--  -->
<template>
  <div class="warpper">
    <div v-for="item in msgs" :key="item">
      <div>{{ msg.id }}说: {{ msgs.msg }}</div>
    </div>
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
    <input type="text" v-model="val" placeholder="输入你的话" />
    <button @click="send" class="create">发送</button>
  </div>
</template>

<script>
import { Loginin } from "../lib/ApiSetting";
import socket from "../socket/index";
export default {
  name: "signup",
  data() {
    return {
      account: "",
      password: "",
      msgs: [],
      val: "",
    };
  },

  components: {},

  computed: {},

  mounted: function () {
    console.log(socket);
    socket.on("connect", function () {
      console.log("1");
      // console.log(socket.broadcast)
      socket.emit("join", prompt("what is your nickname"));

      socket.on("announcement", (msg) => {
        console.log(msg);
      });
    });
  },

  methods: {
    send() {
      // this.addmessage("me", inputan.val());
      socket.emit("text", this.val);
      this.val = "";
    },
    async login() {
      if (this.account === "" || this.password === "") {
        return false;
      }
      const res = await Loginin({
        account: this.account,
        password: this.password,
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
    },
  },
};
</script>
<style lang='css' scoped>
</style>