import React, { Component } from 'react'
import { Button, Icon, DatePicker, Modal } from 'zarm'
import './index.less'
import RecordList from '@c/record-list'
import * as dateFn from '@u/datetime'
import bus from '@u/event-bus'

class AccountList extends Component {
  render() {
    let { computedDatas,
      computedMonthMoney: {
        total,
        expense,
        income }
    } = this

    let { date, dataType, modal } = this.state

    return (
      <div className="account-list">
        <div className="board">
          <div className="stat">
            <div className="total">
              <span>本月结余(￥)</span>
              <span>{total}</span>
            </div>
            <div className="expense">
              <span>支出(￥)：</span>
              <span>{expense}</span>
            </div>
            <div className="income">
              <span>收入(￥)：</span>
              <span>{income}</span>
            </div>
          </div>
          <div className="date-picker">
            <Button size="xs" shape="round" ghost onClick={this.handleShowDatePicker(true)}>
              {this.computedDate}
              <Icon type="arrow-bottom" size="sm" />
            </Button>
            <DatePicker visible={date.visible} mode="month" value={date.value}
              onOk={this.handleDatePick} onCancel={this.handleShowDatePicker(false)} maskClosable />
          </div>
        </div>
        <div className="btn-wrap" onClick={this.handleClickDataType}>
          <Button size="xs" shadow theme={!dataType && 'primary'}>全部</Button>
          <Button size="xs" shadow theme={(dataType < 0) && 'primary'}>支出</Button>
          <Button size="xs" shadow theme={(dataType > 0) && 'primary'}>收入</Button>
        </div>
        {Object.keys(computedDatas).map(date => {
          return <RecordList date={date} dataList={computedDatas[date]} key={date} />
        })}
        {/* 账单详情弹窗 */}
        <Modal animationType="zoom" className="bill-detail" visible={modal.checkVisible} title="账单" closable
          onCancel={() => this.setState({ modal: { data: {}, checkVisible: false } })}>
          <div className="bill-data">
            <div className="bill-data-item">
              <span>类型</span><span>{modal.data.type}</span>
            </div>
            <div className="bill-data-item">
              <span>金额</span><span>{modal.data.money}</span>
            </div>
            <div className="bill-data-item">
              <span>日期</span><span>{modal.data.formatDate}</span>
            </div>
            <div className="bill-data-item">
              <span>备注</span><span>{modal.data.remark}</span>
            </div>
          </div>
          <div className="za-modal__footer">
            <button onClick={this.handleBillEdit} className="za-confirm__button">编辑</button>
            <button onClick={this.handleBillDelete} className="za-confirm__button za-confirm__button--ok">删除</button>
          </div>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    console.log('componentDidMount')
    bus.on('bill-check', this.handleBillCheck)
    bus.on('bill-delete', this.handleBillDelete)
  }

  componentWillUnmount() {
    bus.off('bill-check', this.handleBillCheck)
    bus.off('bill-delete', this.handleBillDelete)
  }

  state = {
    // 日期选择器
    date: {
      visible: false,
      value: new Date(),
    },
    // 账单数据（ajax数据）
    dataList: [
      { id: 1, money: -9.5, remark: '早餐', type: '餐饮', date: new Date('2021-06-14') },
      { id: 2, money: 25, remark: '餐补', type: '餐饮', date: new Date('2021-06-14') },
      { id: 3, money: -12, remark: '早餐', type: '餐饮', date: new Date('2021-06-13') },
      { id: 4, money: 30, remark: '晚上加班费', type: '工资', date: new Date('2021-06-12') },
    ],
    // 0全部，-1支出，1收入
    dataType: 0,
    modal: {
      data: {},
      checkVisible: false
    }
  }

  get computedDatas() {
    let { dataType, dataList } = this.state
    let ret = {}
    dataList.forEach(item => {
      if (dataType * item.money >= 0) {
        let formatDate = dateFn.formatTime(item.date)[1].slice(0, 10)
        item.formatDate = formatDate
        !ret[formatDate] && (ret[formatDate] = [])
        ret[formatDate].push(item)
      }
    })

    return ret
  }

  get computedDate() {
    return dateFn.formatTime(this.state.date.value)[1].slice(0, 7)
  }

  get computedMonthMoney() {
    let total = 0, expense = 0, income = 0;
    this.state.dataList.forEach(item => {
      let { money } = item
      total += money

      if (money > 0) {
        income += money
      } else {
        expense += money
      }
    })
    return {
      total,
      expense,
      income
    }
  }

  handleShowDatePicker = (visible) => {
    return () => {
      let { date } = this.state
      date.visible = visible
      this.setState(date)
    }
  }

  handleDatePick = (e) => {
    this.setState({ date: { value: e, visible: false } })
  }

  handleClickDataType = e => {
    let text = e.target.innerText
    let dataType = {
      "全部": 0,
      "支出": -1,
      "收入": 1
    }[text]
    this.setState({ dataType })
  }

  // 点击查看账单
  handleBillCheck = (e) => {
    console.log('handleBillCheck', e)
    this.setState({ modal: { data: e, checkVisible: true } })
  }

  // 点击删除账单
  handleBillDelete = (e) => {
    let { data, checkVisible } = this.state.modal

    if (checkVisible) {
      this.setState({ modal: { checkVisible: false, data: {} } })
      e = data
    }

    // if (this.state.modal)
    Modal.confirm({
      className: 'modal',
      title: '提示',
      content: '确认删除这条账单？',
      onOk: () => {
        console.log('调用删除接口', e.id)
      },
      onCancel: () => {
        console.log('close onCancel')
        // modal.hide();
      }
    });
  }

  // 点击编辑账单
  handleBillEdit = e => {

  }
}

export default AccountList