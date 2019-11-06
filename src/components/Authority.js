import React,{ Component } from 'react'
import { connect } from 'dva'
import PropTypes from 'prop-types'

@connect(({ layout }) => ({
  permissions: layout.permissions
}))

class Authorized extends Component {
  // 用户传入 authority noMatch exact 判断是否 匹配
  
  checkPermission = () => {
    const { authority, permissions, exact } = this.props
    let hasPermission = false

    switch(typeof authority){
      case 'string':
        hasPermission = permissions.includes(authority)
        break
      case 'boolean':
        hasPermission = authority
        break
      default:
        if (!Array.isArray(authority)) return
        let count = 0
        authority.forEach(item => {
          if (permissions.includes(item)) {
            count++
          }
        })
        // 判断是是否是精准匹配
        hasPermission = exact ? count === authority.length : !!count 
    }
    return hasPermission
  }

  render() {
    const { noMatch, children } = this.props
    const hasPermission = this.checkPermission()

    return hasPermission ? children : noMatch
  }
}

Authorized.proptypes = {
  authority: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array
  ]),
  noMatch: PropTypes.node,
  exact: PropTypes.bool
}

Authorized.defaultProps = {
  authority: false,
  noMatch: null,
  exact: false
}

export default Authorized
