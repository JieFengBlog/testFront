module.exports ={
    devServer:{
        open:true,
        host:"localhost",
        port: 8081,
        hotOnly: true,//热更新
        proxy:{
            //配置跨域
            '/api':{
                target:"http://localhost:8080/test",
                ws: true,
                changeOrigin: true,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }

    }
};
