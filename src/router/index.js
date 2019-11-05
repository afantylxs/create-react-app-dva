import React from 'react'
import { Router, Switch } from 'dva/router'
import { renderRoutes, convertRoutes, convertRoutesConfig } from 'dva-router-config'
import routerConfig from './routes'

function mergePath(path) {
  return path.split('/').reduce((pre, cur) => (
    cur ? `${pre}/${cur}` : pre
  ), '')
}

function ProcessRoutesConfig(routes, relativePath, configRoutes) {
  const res = []
  routes.forEach((route, index) => {
    // 处理路径属性
    route = { ...configRoutes[index], ...route }
    relativePath = relativePath || ''
    // 拼接路径层级
    const path = mergePath(`${relativePath}/${route.path}`) || '/'
    route.path = path

    if (route.routes) {
      route.routes = ProcessRoutesConfig(route.routes || [], route.path, configRoutes[index].routes)
    }
    res.push(route)
  })
  return res
}

function RouterConfig({ history, app }) {
  // convertRoutesConfig 将我们配置的routes 转换为动态嵌套路由
  // ProcessRoutesConfig 拼接路由路径 及其他属性
  // convertRoutes 可以将路由配置转换为路由组件，但是我们路由配置的icon,title等属性不会有，所以这里用 renderRoutes 渲染组件
  const routes = ProcessRoutesConfig(convertRoutesConfig(routerConfig, { app }), '', routerConfig)
  return (
    <Router history={history}>
      <Switch>
        { renderRoutes(routes) }
        {/* {convertRoutes(routerConfig, { app })} */}
      </Switch>
    </Router>
  )
}

export default RouterConfig