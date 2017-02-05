<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="log-container">
      <el-input class="login-input" v-model="userName" placeholder="请输入用户名" ></el-input>
    </div>
    <div class="log-container">
      <el-input class="login-input" v-model="userPassword" placeholder="请输入密码" ></el-input>
    </div>
    <div class="btn-container">
      <el-button type="primary">登录</el-button>
      <el-button>注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to my Vue.js App',
      userName: '',
      userPassword: ''
    };
  },
  methods:{
    clickUserName() {
      console.log(this.userName)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.log-container,.btn-container{
  text-align: center;
}
.login-input{
  width: 30%;
  margin-bottom: 15px;
}
</style>
