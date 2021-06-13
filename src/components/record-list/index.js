import React, { Component } from 'react'
import './index.less'
import RecordListItem from '../record-list-item'

export default class RecordList extends Component {
  // 计算余额
  get computedMoney() {
    let { dataList } = this.props
    return dataList.map(item => item.money).reduce((a, b) => a + b)
  }
  render() {
    let { dataList, date } = this.props

    return (
      <div className="record-list">
        <div className="header">
          <div className="date">{date}</div>
          <div className="balabce">结余：{this.computedMoney}</div>
        </div>
        {dataList.map(data => <RecordListItem {...data} />)}
      </div>
    )
  }
}