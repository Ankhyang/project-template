/**
 * Api 路由集合
 * @author 谭邻宣
 * @date 2020/7/6 14:12
 **/
const baseUrl = `/uc/v0.1`

const httpServer = {
    user:{  //登录相关
        getTokens:`${baseUrl}/tokens`,  //登录前获取token

       // getUserInfo:`${baseUrl}/users/{id}/detail`,  //登录前获取token
    }
}

export default httpServer