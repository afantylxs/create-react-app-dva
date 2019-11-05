import React,{ PureComponent } from 'react'
import { Icon } from 'antd'
import { Link } from 'dva/router'

export default class Apartment extends PureComponent {
  render() {
    return (
      <div>
        <a>Apartment页面内容<Icon type="plus"/></a>
        <br />
        <Link to="/page/space/commodity">前往Commodity页面</Link>
        <br />
        <Link to="/page/space/list">前往Space页面</Link>
      </div>
    )
  }
}