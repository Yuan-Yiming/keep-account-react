import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import './index.less'

class TabBar extends Component {

  render() {
    let { dataList, active } = this.props
    active = active || dataList[0].key
    return (
      <div className="tab-bar">
        <ul className="tab-bar-list">
          {
            dataList.map(item => {
              return (
                <li onClick={this.handleClilck}
                  className={`tab-bar-item${item.key === active ? ' active' : ''}`}
                  key={item.key}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              )
            })
          }
        </ul>
      </div >
    )
  }
}

export default TabBar