<template>
    <div class="login">
        <div class="login-container">
            <div style="width: 400px; position: fixed; top: 25%; left: 37%;">
                <h2 style="color: #fff; margin:40px 55px"> <i class="fa fa-firefox  fa-spin"></i> &nbsp;&nbsp;计算机系实验教学系统</h2>
                <el-form :model="userInfo" status-icon  ref="userInfo" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input type="text" style="background-color:transparent" prefix-icon="fas fa-user" v-model="userInfo.username" autocomplete="off" placeholder="用户名"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" prefix-icon="fa fa-lock" v-model="userInfo.password" autocomplete="off" placeholder="密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <mButton @click.native="submitForm"></mButton>
                    </el-form-item>
                </el-form>
            </div>

        </div>
    </div>
</template>

<script>
    import mButton from "@/views/mButton";

    export default {
        name: "Login",
        data(){
            return{
                fullscreenLoading: false,
                userInfo:{
                    username:'',
                    password:''
                }
            }
        },
        components:{
          mButton
        },
        methods:{
            //提交登录信息，进行登录验证
            submitForm() {
                if(this.userInfo.username == '' || this.userInfo.password == ''){
                    this.$message.error('用户名或者密码不能为空');
                    return;
                }
                const loading = this.$loading({
                    lock: true,
                    text: '',
                    spinner: 'fa fa-spinner fa-pulse',
                    background: 'rgba(0, 0, 0, 0.9)'
                });
                setTimeout(() => {
                   this.$axios({
                       method:'post',
                       url:'/api/login/validation',
                       data:{
                           userInfo:this.userInfo
                       }
                   }).then(response =>{
                       if(response.data.success){
                           //登录成功后允许用户进入首页

                           this.$store.commit("ADD_LOGIN_USER",response.data.user)
                           console.log(response.data.user)

                           if(sessionStorage.getItem("type") == '0')
                               this.$router.push("/student");
                           else
                               this.$router.push("/teacher");
                           this.$message.success("登录成功");
                       }else{
                           this.$message.error(response.data.errMsg);
                       }
                   }).finally(()=>{
                       loading.close();
                   })
                }, 1000);
            }

            //
        },
    }
</script>

<style>

    .login{
        position: relative;
        height: 100vh;
        background: url("./assets/bg2.jpg") no-repeat;
        background-size: cover;
    }

    .login-container{
        height: 100vh;
        background: rgba(0,0,0,0.7);
    }

    .login .el-input__inner{
        background-color: transparent;
        border-left-width:0px;border-top-width:0px;border-right-width:0px;border-bottom-color:#fff;
        color: #fff;
    }
    .login .el-loading-spinner i{
        color:#fff !important;
    }
</style>