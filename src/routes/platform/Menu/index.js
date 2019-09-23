import React from "react";
import {Divider, Tag} from 'antd';
import Table from '../../../components/Table';
import {connect} from "dva";
import BreathTag from "../../../components/BreathTag";

@connect(({menu}) => ({
  menuTree: menu.menuTree,
}))
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.props.dispatch({
      type: 'menu/findMenuAll'
    });
  }

  render() {
    const {
      menuTree
    } = this.props;

    const tableProps = {
      dataSource: menuTree,
      childrenColumnName: 'routerData',
      columns: [
        {
          title: '菜单名称',
          key: 'name',
          width: '25%',
          dataIndex: 'name'
        },
        {
          title: '菜单编码',
          key: 'code',
          width: '20%',
          dataIndex: 'code'
        },
        {
          title: '菜单路由',
          key: 'path',
          width: '20%',
          dataIndex: 'path'
        },
        {
          title: '菜单排序',
          key: 'sort',
          width: '10%',
          dataIndex: 'sort'
        },
        {
          title: '菜单icon图标',
          key: 'leftClass',
          width: '10%',
          dataIndex: 'leftClass',
          render: text => (<i className={text}></i>)
        },
        {
          title: '操作',
          key: 'action',
          width: '15%',
          dataIndex: 'action',
          render: text => (
            <div style={{textAlign: 'center'}}>
              <a href={`http://localhost:8079/activiti/modeler.html?modelId=${text}`} target={'_blank'}>
                <Tag color="blue">编辑</Tag>
              </a>
              <Divider type="vertical"/>
              <a onClick={() => this.handleDeployProcessDefinition(text)}>
                <BreathTag color='green' content='可发布'/>
              </a>
              <Divider type="vertical"/>
              <a onClick={() => this.handleDeleteProcessDefinition(text)}>
                <Tag color="red">删除</Tag>
              </a>
            </div>
          ),
        }
      ]
    }


    return (
      <Table
        {...tableProps}
      />
    )
  }
}