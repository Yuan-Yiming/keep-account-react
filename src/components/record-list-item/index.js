import React, { Component } from 'react'
import { SwipeAction, Button, Cell } from 'zarm'
import './index.less'
import bus from '@u/event-bus'

// 单条账单记录组件
class RecordListItem extends Component {
  render() {
    let { type, remark, money } = this.props
    return (
      <SwipeAction className="record-list-item"
        right={[
          <Button size="sm" shape="rect" theme="primary" onClick={this.handleCheck}>
            查看
          </Button>,
          <Button size="sm" shape="rect" theme="danger" onClick={this.handleDelete}>
            删除
          </Button>
        ]}>
        <Cell className="content-wrap" onClick={this.handleCheck}>
          <div className="type">{type}</div>
          <div className="remark">{remark}</div>
          <div className="money">{money}</div>
        </Cell>
      </SwipeAction>
    )
  }

  handleCheck = (e) => {
    console.log('e', e);
    bus.emit('bill-check', this.props)
  }

  handleDelete = (e) => {
    bus.emit('bill-delete', this.props)
  }
}

export default RecordListItem