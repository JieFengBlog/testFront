<template>
    <el-row style="width: 100%;">
        <el-col :span="22" :offset="1" >
            <el-tabs type="border-card"   style="min-height:600px;">
                <el-tab-pane >
                    <span slot="label"><i class="el-icon-date"></i> 我的实验</span>
                    <StudentTest></StudentTest>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label">
                        <i class="fa fa-address-card-o"></i> 我的消息
                    </span>
                    <StudentInfo></StudentInfo>
                </el-tab-pane>

            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
    import StudentTest from "@/views/role/student/StudentTest";
    import StudentInfo from "@/views/role/Message";

    export default {
        name: "Student",
        components:{
            StudentTest,
            StudentInfo
        },
        data(){
          return{

          }
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        },

    }
</script>

<style>
    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .el-tabs__nav-scroll{
        overflow-y: visible;
    }
    .el-badge__content.is-fixed{
        position:absolute;
        top: 5px;
    }
</style>
