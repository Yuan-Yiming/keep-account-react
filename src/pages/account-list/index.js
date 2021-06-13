import React, { Component } from 'react'
import './index.less'
import RecordList from '../../components/record-list'

class AccountList extends Component {
  render() {
    const datas = [
      {
        date: '2021-06-14', dataList: [
          { money: -9.5, remark: '早餐', type: '餐饮' },
          { money: 25, remark: '餐补', type: '餐饮' },
        ]
      },
      {
        date: '2021-06-13', dataList: [
          { money: -12, remark: '早餐', type: '餐饮' },
          { money: 30, remark: '晚上加班费', type: '工资' },
        ]
      }]
    return (
      <div className="account-list">
        {datas.map(data => <RecordList {...data} />)}
      </div>
    )
  }
}

export default AccountList