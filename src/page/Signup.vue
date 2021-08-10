<!--  -->
<template>
  <div class="warpper">
    <div v-for="item in msgs" :key="item.id">
      <div>
        <template v-if="item.name">
          {{ item.name }}：
          <div v-html="item.msg"></div>
        </template>
        <div v-else>{{ item.msg }}</div>
      </div>
    </div>
    <!-- <div>
      <div class="account">
        账号：
        <input type="text" v-model="account" />
      </div>
      <p>
        密码：
        <input type="text" v-model="password" />
      </p>
      <button @click="login" class="create">登陆</button>
    </div> -->
    <div
      contenteditable="true"
      type="text"
      class="border"
      v-html="val"
      @blur="blurFun($event)"
      placeholder="输入你的话"
    />
    <input type="file" @change="addImg" />

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
      socket: "",
      name: "",
      nameList: ["亮亮", "路人甲5", "路人乙6"],
    };
  },

  components: {},

  computed: {},
  beforeCreate() {
    console.log(this.$el, this.nameList);
  },
  created() {
    console.log(this.$el, this.nameList);
  },
  beforeMount() {
    console.log(this.$el, this.nameList);
  },

  mounted() {
    console.log(this.$el, this.nameList);
    const name = this.nameList[
      Math.floor(Math.random() * this.nameList.length)
    ];
    this.name = name;
    const socket = new WebSocket("ws://localhost:80/ws");
    this.socket = socket;
    socket.onopen = (event) => {
      socket.send(JSON.stringify({ name: name }));
    };
    socket.onclose = function (event) {
      console.log("连接被关闭");
    };
    socket.onmessage = (event) => {
      console.log(event);
      this.msgs.push(JSON.parse(event.data));
      this.msgs = [...this.msgs];
    };
  },

  methods: {
    addImg(e) {
      const file = e.target.files[0];
      let reader = new FileReader();
      if (file) {
        //定义一个文件阅读器
        let reader = new FileReader();
        reader.readAsDataURL(file);

        //文件装载后将其显示在图片预览里
        reader.onload = () => {
          let src = reader.result; // 读取结果c
          console.log(src);
          this.val = this.val + '<img class="sendImg" src="' + src + '">';
          // this.socket.send(
          //   JSON.stringify({
          //     // 发送
          //     msg: src,
          //     type: "img", // 发送类型为img
          //   })
          // );
        };
      }
    },
    blurFun(e) {
      this.val = e.target.innerHTML;
    },
    send() {
      // this.addmessage("me", inputan.val());
      this.socket.send(JSON.stringify({ msg: this.val, name: this.name }));
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
.warpper >>> img {
  width: auto !important;
  height: auto !important;
  max-width: 200px !important;
  max-height: 100% !important;
}
.border {
  border: 2px solid rebeccapurple;
}
</style>
