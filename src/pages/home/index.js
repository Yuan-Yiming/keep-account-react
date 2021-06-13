import React from 'react'
// 路由相关的
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { ConfigProvider, NavBar, Icon } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import 'zarm/dist/zarm.css';

import './index.less'
import AccountList from '../account-list'
import Statistics from '../statistics'
import Community from '../community'
import UserCenter from '../user-center'
import TabBar from '../../components/TabBar'

class Home extends React.Component {
  constructor() {
    super()
    this.state = { activeKey: 'bill_list' }
    this.setActiveKey = function (e) {
      console.log(e, this)
      this.setState({ activeKey: e })
    }
  }
  render() {
    const tabBarItemList = [
      { key: 'bill_list', title: '账单', path: '/account-list' },
      { key: 'statistics', title: '统计', path: '/statistics' },
      { key: 'community', title: '社区', path: '/community' },
      { key: 'user_center', title: '个人', path: '/user-center' }]
    return (
      <BrowserRouter>
        <ConfigProvider locale={zhCN} primaryColor="#41C5AD">
          <div className="home">
            <NavBar title="斑马记账"
              left={<Icon type="arrow-left"></Icon>}>
            </NavBar>

            <TabBar dataList={tabBarItemList} />
            <Switch>
              <Route path="/account-list" component={AccountList} />
              <Route path="/statistics" component={Statistics} />
              <Route path="/community" component={Community} />
              <Route path="/user-center" component={UserCenter} />
              <Route exact path="/" component={AccountList} />
              <Redirect to={"/account-list"} />
            </Switch>
          </div>
        </ConfigProvider >
      </BrowserRouter>
    )
  }
}

export default Home;
