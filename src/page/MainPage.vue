<!--  -->
<template>
  <div class='warpper'>
      我是主页
     {{userInfo.name}}
  </div>
</template>

<script>
import  {mapGetters}  from 'vuex'
export default {
  name:'mainpage',
  data () {
    return {
    };
  },
   created:function(){
   if(!this.isLogin){
    this.$router.push('/signup');
   }
  },
  components: {},

  computed: {
    ...mapGetters({
      isLogin:'isLogin',
      userInfo:'userInfo'
    })
  },

  mounted:function(){
    
  },

  methods: {}
}

</script>
<style lang='css' scoped>
.warpper{
 text-align: center;
}
</style>