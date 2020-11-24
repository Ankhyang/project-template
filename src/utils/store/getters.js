const getters = {
  userInfo: state => state.user.userInfo, //用户信息
  tokensInfo: state => state.user.tokensInfo, //用户信息
  visitedViews: state => state.tagViews.visitedViews, //views页签信息
  activeView: state => state.tagViews.activeView, //views页签信息
  cachedViews: state => state.tagViews.cachedViews, //view 缓存队列
  configInfo: state => state.control.configInfo // 配置信息
}
export default getters
