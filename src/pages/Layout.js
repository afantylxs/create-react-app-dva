import React, { PureComponent } from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { renderRoutes } from 'dva-router-config'
import { Layout, Menu, Icon, Button } from 'antd'
import './Layout.less'
import logo from '../assets/avatar.png'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

const getKeys = (pathname) => {
  return [pathname.split('/').slice(0,3).join('/')]
}

@connect(({layout}) => ({
  data: layout
}))

class LayoutPage extends PureComponent {

  constructor(props) {
    super(props)
    const { location: { pathname } } = this.props
    this.state = {
      collapsed: false,
      openKeys: getKeys(pathname)
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'layout/getPermissionList',
      payload: {}
    })
  }

  componentWillReceiveProps(nextProps) {
    const { pathname } = nextProps.location

    if (pathname != this.props.pathname) {
      this.setState({
        openKeys: getKeys(pathname)
      })
    }
  }

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  renderMenu = (menus) => {
    const { collapsed } = this.state
    const menuArr = menus.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>{item.icon}{!collapsed && item.title}</span>
            }
          >
            {/* 这里只显示最多2级菜单 所以不用递归 */}
            {
              item.children.map(item => (
                <Menu.Item key={item.path}>{item.title}</Menu.Item>
              ))
            }
          </SubMenu>
        )
      } else {
        return (<Menu.Item key={item.path}>{item.title}</Menu.Item>)
      }
    })
    return menuArr
  }

  clickItem = (param) => {
    const { dispatch } = this.props
    // 路由跳转
    dispatch(routerRedux.push(param.key))
  }

  OpenChange = (openKeys) => {
    const keys = openKeys.length > 1 ? [openKeys[1]] : openKeys

    this.setState({
      openKeys: keys
    })
  }

  getAuthorityRoutes = (routes) => {
    const { permissions } = this.props.data
    const ret = []
    // console.log(routes)
    if (!permissions.length){
      return ret
    }
    routes.forEach(route => {
      const { authority, routes } = route
      // 无须配置权限，或者具有权限
      if (!authority || permissions.includes(authority)) {
        // 判断子路由        
        if (routes) {
          route.routes = this.getAuthorityRoutes(routes)
        }
        ret.push(route)
      }
    })
    return ret
  }

  configMenu = (route) => {
    const menus = []
    route.forEach(item => {
      if (!item.showMenu) return

      var obj = {
        title: item.title,
        icon: item.icon,
        path: item.path
      }
      if (item.routes) {
        obj.children = this.configMenu(item.routes)
      }
      menus.push(obj)
    })
    return menus
  }

  render() {
    const { route, location: {pathname} } = this.props
    const { collapsed, openKeys } = this.state
    const mgl = collapsed ? 80 : 200

    // 菜单选中项 就是pathname
    const selectedKeys = pathname
    const authRoutes = this.getAuthorityRoutes(route.routes)
    const menus = this.configMenu(authRoutes)

    return (
      <Layout className="layout">

        {/* 侧边栏区域 */}
        <Sider className="sider" collapsed={collapsed}>
          <div className="logo">
            <img src={logo} alt='logo' />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onClick={this.clickItem}
            onOpenChange={this.OpenChange}
          >
            { this.renderMenu(menus) }
          </Menu>
        </Sider>

        {/* 主体区域 */}
        <Layout className="main" style={{marginLeft: mgl}}>

          {/* 头部区域 */}
          <Header className="header">
            <Button type="primary" onClick={this.toggleCollapsed}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
          </Header>

          {/* 内容区域 */}
          <Content className="content">
            { renderRoutes(authRoutes) }
          </Content>

          {/* 底部区域 */}
          <Footer>
              天天向上信息技术有限公司UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default LayoutPage