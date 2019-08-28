import React from 'react';
import {Tabs} from 'antd';
import Content from "../../components/Router";
import {connect} from 'dva';
import {routerRedux} from 'dva/router';

const {TabPane} = Tabs;

/**
 * @Author: enHui.Chen
 * @Description: 内容
 * @Data 2019/8/21
 */
@connect(({global}) => ({
  activeKey: global.activeKey,
  tabPane: global.tabPane
}))
export default class DefaultContent extends React.Component {
  constructor(props) {
    super(props);
    this.props.onRefDefaultContent(this);
    this.state = {}
  }

  onClickTab = activeKey => {
    // 点击Tab标签切换Tab
    const {dispatch, tabPane} = this.props;
    for (let i in tabPane) {
      if (tabPane[i].path === activeKey) {
        dispatch({
          type: 'global/updateState',
          payload: {
            activeKey: activeKey
          }
        });
        break;
      }
    }
    // 点击Tab标签修改路由地址
    dispatch(routerRedux.push({
      pathname: activeKey
    }));
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  remove = targetKey => {
    let {dispatch, tabPane, activeKey} = this.props;
    let lastIndex;
    tabPane.forEach((menu, i) => {
      if (menu.path === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newTabPane = tabPane.filter(menu => menu.path !== targetKey);
    if (newTabPane.length && activeKey === targetKey) {
      activeKey = tabPane[lastIndex >= 0 ? lastIndex : 0].path;
    }
    dispatch({
      type: 'global/updateState',
      payload: {
        activeKey,
        tabPane: newTabPane
      }
    });
    dispatch(routerRedux.push({
      pathname: activeKey
    }));
  };

  render() {
    const {
      activeKey,
      tabPane
    } = this.props;

    return (
      <div className="content-wrapper">
        <section className="content">
          <div style={{backgroundColor: '#ffff', padding: '15px', borderRadius: '3px'}}>
            <Tabs
              hideAdd
              onChange={this.onClickTab}
              activeKey={activeKey}
              type="editable-card"
              onEdit={this.onEdit}
            >
              {
                tabPane.map(menu => (
                  <TabPane tab={menu.name} key={menu.path}>
                    <Content
                      menu={menu}
                      activeKey
                    />
                  </TabPane>
                ))
              }
            </Tabs>
          </div>

        </section>
      </div>
    );
  }
}