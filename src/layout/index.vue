<template>
    <el-container>
        <el-header>
            
        </el-header>
        <el-main>
            <Main/>
        </el-main>
    </el-container>
</template>
<script>
    import Main from  './main'
    export default {
        name: "PageLayout",
        components: {
           Main  // 主体
        }
    }
</script>
<style lang="less" scoped>
.el-container{
    width: 100%;
    height: 100%;
    .el-header{
        padding: 0 !important;
        overflow: hidden;
        height: 45px !important;
    }
    .el-main{
        padding: 0;
        height: 99% !important;
        .app-main{
            height:100% !important;
            overflow: hidden;
        }
    }
}
    
</style>