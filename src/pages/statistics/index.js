import React, { Component } from 'react'
import './index.less'

class Statistics extends Component {
  render() {
    return (
      <div className="statistics">
        这是统计页面。
        跳转<button onClick={() => { this.gotoAccountList() }}>账单列表</button>
      </div>
    )
  }
  gotoAccountList() {
    console.log(this)
    this.props.history.push('/account-list')
  }
}

export default Statistics