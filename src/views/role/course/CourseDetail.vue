<template>

    <div>
        <el-collapse accordion>
            <el-collapse-item v-for="item in 10">
                <template slot="title">
                    <strong>第{{item}}章  &nbsp; Java程序设计环境</strong>
                </template>
                <el-row style="width: 100%; ">
                    <el-col :span="20">
                        介绍了Java的基本程序设计结构
                    </el-col>
                    <el-col :span="4" style="cursor:pointer;">
                        <el-button type="warning" icon="fa fa-youtube-play" circle></el-button>&nbsp;查看实验
                    </el-col>
                </el-row>
            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script>
    export default {
        name: "CourseDetail"
    }
</script>

<style scoped>

</style>
