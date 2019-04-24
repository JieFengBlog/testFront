<template>
    <div id="adminLogin">
        <el-form :model="credentials" :rules="rules2" ref="credentials" label-position="left" label-width="0px" class="demo-ruleForm login-container">

            <i class="fab fa-earlybirds fa-4x" style="color: #000; margin-left: 140px; margin-bottom: 0px"></i>
            <h3 class="title">教学系统后台登录</h3>
            <div style="margin-left: 52px">
                <el-form-item prop="username">
                    <el-input type="text" v-model="credentials.username" style="width: 250px;" auto-complete="off" placeholder="账号" prefix-icon=" iconfont sa--gerenzhanghu"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="credentials.password" auto-complete="off" style="width: 250px;"  placeholder="密码" prefix-icon="iconfont sa--mima"></el-input>
                </el-form-item>
                <el-form-item style="width:100%;">
                    <el-button type="warning" style="width:250px;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
                    <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
                </el-form-item>
            </div>

        </el-form>
    </div>

</template>

<script>

    export default {
        data() {
            return {
                logining: false,
                credentials: {
                    username: '',
                    password: ''
                },
                rules2: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: false
            };
        },
        methods:{
            handleSubmit2(){
                this.$axios({
                    method:'post',
                    url:'/api/login/adminValidation',
                    data:{
                        adminLoginToken:this.credentials
                    }
                }).then(response=>{
                    if(response.data){
                        sessionStorage.setItem("adminLoginStatus","true");
                        this.$router.push("/adminHome");
                        this.$message.success("登陆成功");
                    }
                })

            }
        },
        created(){
            if(sessionStorage.getItem("adminLoginStatus") != null){
                this.$router.push("/adminHome");
            }
        }

    }
</script>

<style scoped>

    #adminLogin{
        position: relative;
        height: 100vh;
        background: #000;
    }
    .login-container {
        border-radius: 50%;
        background-clip: padding-box;
        position: absolute;
        margin-top: 250px;
        margin-left: 38%;
        width: 350px;
        height: 350px;
        padding: 30px 35px 35px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 35px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>