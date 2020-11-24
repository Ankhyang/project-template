/**
 * 路由控制
 **/

import PageLayout from  '@src/layout'
import baseRouter from "./modules/baseRouter";
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const constantRoutes = [
    ...baseRouter,
    {
        path: '/',
        component: PageLayout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@src/pages/home')
            }
        ]
    }
]
export const asyncRoutes = []
const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router