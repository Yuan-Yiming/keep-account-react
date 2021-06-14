import React, { Component } from 'react'
import { Cell, Icon } from 'zarm'
import './index.less'

class UserCenter extends Component {
  render() {
    let { avatar, userName } = this.state.userInfo
    let { expenseMoney, budgetMoney, billCount } = this.state.statData
    return (
      <div className="user-center">
        <div className='user-center-header'>
          <div className='user-info'>
            <div className="user-avatar">
              <img src={avatar} />
            </div>
            <div className='user-info-detail'>
              <span type="userNickName" className="nick-name">{userName}</span>
            </div>
          </div>
          <div className='header-info'>
            <div className='info-num'>
              <span>
                <span className={`remain${expenseMoney > budgetMoney ? ' minus' : ''}`}>{Math.abs(expenseMoney - budgetMoney)}</span>
                <span className="unit"> 元</span>
              </span>
              <span>
                {billCount}
                <span className="unit"> 笔</span>
              </span>
            </div>
            <div className='info-item'>
              <span>{expenseMoney > budgetMoney ? '超出' : '剩余'}预算</span>
              <span>本月记账</span>
            </div>
          </div>
        </div>
        <div className='cell-wrapper'>
          <Cell hasArrow title="每月预算" icon={<Icon type="broadcast" theme="primary" />} onClick={() => { }}
          />
          <Cell hasArrow title="关于" icon={<Icon type="broadcast" theme="primary" />} onClick={() => { }}
          />
        </div>
      </div>
    )
  }

  state = {
    userInfo: {
      avatar: 'https://sf3-ttcdn-tos.pstatp.com/img/user-avatar/a405d303d1290be3c11acae8b5e3b0ff~300x300.image',
      userName: '袁大明'
    },
    statData: {
      budgetMoney: 3000, // 预算金额
      expenseMoney: 2000, // 支出金额
      remainingBudget: 234,
      billCount: 23
    }
  }
}

export default UserCenter