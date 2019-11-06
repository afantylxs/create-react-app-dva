import React,{ PureComponent } from 'react'
import { Icon } from 'antd'
import { Link } from 'dva/router'
import Authorized from '../components/Authority'

export default class Space extends PureComponent {
  render() {
    return (
      <div>
        <a>Space页面内容<Icon type="copy"/></a>
        <br />
        <Authorized authority="TEST" noMatch="测试">
          <Link to="/page/apartment/list">前往Apartment页面</Link>
        </Authorized>
        <br />
        <Link to="/page/space/commodity">前往Commodity页面</Link>
      </div>
    )
  }
}