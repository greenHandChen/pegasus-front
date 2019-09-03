import React from 'react';
import {connect} from 'dva';
import {Link} from "react-router-dom";
import {openTabPane} from "../../utils/menuTab";

/**
 * @Author: enHui.Chen
 * @Description: 左侧菜单栏
 * @Data 2019/8/21
 */
@connect(({global}) => ({
  routerData: global.routerData,
  tabPane: global.tabPane,
  activeKey: global.activeKey
}))
export default class DefaultLeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleClick = (e) => {
    e.preventDefault();
  }

  onClickMenu = (router) => {
    openTabPane(router);
  }

  initMenuTree = routerData => {
    return routerData.map((router, index) => {
      if (router.isLeaf) {
        return (
          <li key={router.id} className={index === 0 ? 'active' : ''}>
            <Link to={router.path} onClick={() => this.onClickMenu(router)}>
              <i className={router.leftClass}></i>{router.name}</Link>
          </li>
        );
      } else {
        return (
          <li key={router.id} className={index === 0 ? 'active treeview' : 'treeview'}>
            <a onClick={this.handleClick}>
              <i className={router.leftClass}></i> <span>{router.name}</span>
              <span className="pull-right-container"><i className='fa fa-angle-left pull-right'></i></span>
            </a>
            <ul className="treeview-menu">
              {
                this.initMenuTree(router.routerData)
              }
            </ul>
          </li>
        );
      }
    })
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          {/*用户信息*/}
          <div className="user-panel">
            <div className="pull-left image">
              <img src="admin_lte/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image1"/>
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>
              <a onClick={this.handleClick}><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          {/*搜索框*/}
          <form action="#" method="get" className="sidebar-form">
            <div className="input-group">
              <input type="text" name="q" className="form-control" placeholder="Search..."/>
              <span className="input-group-btn">
                <button type="submit" name="search" id="search-btn" className="btn btn-flat">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
          {/*菜单导航*/}
          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MAIN NAVIGATION</li>
            {this.initMenuTree(this.props.routerData)}
          </ul>
        </section>
      </aside>
    );
  }
}