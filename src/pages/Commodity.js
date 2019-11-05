import React,{ PureComponent } from 'react'
import { Icon } from 'antd'
import { Link } from 'dva/router'

export default class Commodity extends PureComponent {
  render() {
    return (
      <div>
        <a>Commodity页面内容<Icon type="form"/></a>
        <br />
        <Link to="/page/space/apartment">前往Apartment页面</Link>
        <br />
        <Link to="/page/space/list">前往Space页面</Link>
      </div>
    )
  }
}