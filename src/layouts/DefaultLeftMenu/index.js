import React from 'react';
import {Link} from "react-router-dom";
import {connect} from 'dva';

/**
 * @Author: enHui.Chen
 * @Description: 左侧菜单栏
 * @Data 2019/8/21
 */
@connect(({global}) => ({
  menuTree: global.menuTree,
  tabPane: global.tabPane,
  activeKey: global.activeKey
}))
export default class DefaultLeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  onClickMenu = (e, menu) => {
    const {dispatch, tabPane, activeKey} = this.props;

    if (!menu || typeof (menu) === 'undefined' ||
      !menu.component || typeof (menu.component) === 'undefined') {
      return;
    }

    // 点击菜单切换Tab
    for (let i in tabPane) {
      if (tabPane[i].path === menu.path) {
        dispatch({
          type: 'global/updateState',
          payload: {
            activeKey: menu.path
          }
        });
        return;
      }
    }

    // 点击菜单新增Tab
    dispatch({
      type: 'global/addTabPane',
      payload: {
        menu
      }
    });
  }

  initMenuTree = menuTree => {
    return menuTree.map((menu, index) => {
      if (menu.isLeaf) {
        return (
          <li className={index === 0 ? 'active' : ''}>
            <Link to={menu.path} onClick={(e) => this.onClickMenu(e, menu)}><i
              className={menu.leftClass}></i>{menu.name}</Link>
          </li>
        );
      } else {
        return (
          <li className={index === 0 ? 'active treeview' : 'treeview'}>
            <a href="#">
              <i className={menu.leftClass}></i> <span>{menu.name}</span>
              <span className="pull-right-container"><i className='fa fa-angle-left pull-right'></i></span>
            </a>
            <ul className="treeview-menu">
              {
                this.initMenuTree(menu.menuTree)
              }
            </ul>
          </li>
        );
      }
    })
  }

  render() {
    const {
      menuTree,
    } = this.props;

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          {/*用户信息*/}
          <div className="user-panel">
            <div className="pull-left image">
              <img src="admin_lte/dist/img/user2-160x160.jpg" className="img-circle" alt="User Image"/>
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
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
            {this.initMenuTree(menuTree)}
          </ul>
        </section>
      </aside>
    );
  }
}