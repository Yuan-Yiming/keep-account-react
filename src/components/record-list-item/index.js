import React, { Component } from 'react'
import { SwipeAction, Button, Cell } from 'zarm'
import './index.less'

// 单条账单记录组件
class RecordListItem extends Component {
  render() {
    let { type, remark, money, id } = this.props
    return (
      <SwipeAction className="record-list-item"
        right={[
          <Button size="lg" shape="rect" theme="primary" onClick={() => console.log('右按钮1')}>
            查看
          </Button>,
          <Button size="lg" shape="rect" theme="danger" onClick={() => console.log('右按钮2')}>
            删除
          </Button>,
        ]}>
        <Cell className="content-wrap">
          <div className="type">{type}</div>
          <div className="remark">{remark}</div>
          <div className="money">{money}</div>
        </Cell>
      </SwipeAction>
    )
  }
}

export default RecordListItem