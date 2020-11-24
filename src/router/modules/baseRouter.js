/**
 * 基本路由
 **/

const baseRouter =[
    {
        path: '/login',
        component: () => import('@pages/login'),
        hidden: true
    }
]

export default baseRouter