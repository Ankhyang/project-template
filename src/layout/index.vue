<script type="text/jsx">
import Main from  './main'
export default {
     components: {
        Main  // 主体
    },
    render() {
        return (
            <a-layout>
                <a-layout-header>我是头部内容 —— 创意字体展示</a-layout-header>
                <a-layout>
                    <a-layout-sider theme="light">侧边导航菜单设计, 实现点击左侧，右侧显示对应内容</a-layout-sider>
                    <a-layout-content>
                        <Main/>
                    </a-layout-content>
                </a-layout>
                <a-layout-footer>底部版权所有</a-layout-footer>
            </a-layout>
        )
    }
}
</script>

<style lang="less" scoped>
.ant-layout{
    width: 100%;
    height: 100%;
    color: #000;
    background: #fff;
    text-align: center;
    .ant-layout-header{
        width: 100%;
        height: 10%;
        background: #e8ffff;
        margin-bottom: 5px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .ant-layout-has-sider{
        height: 80%;
        .ant-layout-sider{
            background: #bedcfa;
            margin: 5px 5px 5px 0;
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
        }
        .ant-layout-content{
            background: #f6f6f6;   
            margin: 5px 0 5px 5px;
            border-radius: 5px;         
        }
    }
    .ant-layout-footer{
        height: 5%;
        margin-top: 5px;
        line-height: 100%;
        background: #d0e8f2;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}
</style>