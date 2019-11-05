import React,{ PureComponent } from 'react'
import { Icon } from 'antd'
import { Link } from 'dva/router'

export default class Space extends PureComponent {
  render() {
    return (
      <div>
        <a>Space页面内容<Icon type="copy"/></a>
        <br />
        <Link to="/page/apartment/list">前往Apartment页面</Link>
        <br />
        <Link to="/page/space/commodity">前往Commodity页面</Link>
      </div>
    )
  }
}