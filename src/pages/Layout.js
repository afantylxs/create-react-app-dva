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

  // TODO 菜单 和页面的权限控制  Authority组件


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

  renderMenu = (routes) => {
    const { collapsed } = this.state
    const menus = routes.map(item => {
      if (item.routes) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>{item.icon}{!collapsed && item.title}</span>
            }
          >
            {/* 这里只显示最多2级菜单 所以不用递归 */}
            {
              item.routes.map(item => (
                <Menu.Item key={item.path}>{item.title}</Menu.Item>
              ))
            }
          </SubMenu>
        )
      } else {
        return (<Menu.Item key={item.path}>{item.title}</Menu.Item>)
      }
    })
    return menus
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

  render() {
    const { route, location: {pathname} } = this.props
    const { collapsed, openKeys } = this.state
    const mgl = collapsed ? 80 : 200

    // 菜单选中项 就是pathname
    const selectedKeys = pathname
    // console.log(openKeys, selectedKeys)
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
            { this.renderMenu(route.routes) }
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
            { renderRoutes(route.routes) }
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