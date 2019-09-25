import React from "react";
import Table from '../../../components/Table';
import Drawer from '../../../components/Drawer';
import {connect} from "dva";
import {Form, Input, Select} from 'antd';

@Form.create({name: 'menuForm'})
@connect(({menu}) => ({
  menuTree: menu.menuTree,
}))
export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    this.props.dispatch({
      type: 'menu/findMenuAll'
    });
  }

  onRefDrawer = (drawer) => {
    this.onRefDrawer = drawer;
  }

  handleCreateMenu = () => {
  }

  render() {
    const {
      menuTree,
      form: {getFieldDecorator}
    } = this.props;

    const tableProps = {
      scroll: {x: '105%', y: 1500},
      dataSource: menuTree,
      childrenColumnName: 'routerData',
      columns: [
        {
          title: '菜单名称',
          key: 'name',
          width: 450,
          dataIndex: 'name'
        },
        {
          title: '菜单编码',
          key: 'code',
          width: 400,
          dataIndex: 'code'
        },
        {
          title: '菜单路由',
          key: 'path',
          width: 350,
          dataIndex: 'path'
        },
        {
          title: '菜单排序',
          key: 'sort',
          width: 100,
          dataIndex: 'sort'
        },
        {
          title: '菜单icon图标',
          key: 'leftClass',
          dataIndex: 'leftClass',
          render: text => (<i className={text}></i>)
        },
        {
          title: '状态',
          key: 'isActive',
          dataIndex: 'isActive',
          fixed: 'right',
          width: 100,
          render: text => (text ? '启用' : '禁用')
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          dataIndex: 'action',
          fixed: 'right',
          render: (text, row) => (
            <div>
              <a style={{marginLeft: '10px'}} onClick={() => this.onRefDrawer.handleOpenDrawer()}
                 target={'_blank'}>
                新建
              </a>
              <a style={{marginLeft: '10px'}} onClick={() => this.handleDeployProcessDefinition(text)}>
                编辑
              </a>
              <a style={{marginLeft: '10px'}} onClick={() => this.handleDeleteProcessDefinition(text)}>
                {!row.isActive ? '启用' : '禁用'}
              </a>
            </div>
          ),
        }
      ]
    }

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 6},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
      },
    };

    const drawerProps = {
      title: '新建菜单',
      onRefDrawer: this.onRefDrawer,
      onOk: this.handleCreateMenu,
      content: <Form {...formItemLayout}>
        <Form.Item label="菜单类型">
          {getFieldDecorator('type', {
            rules: [
              {
                required: true,
                message: '请选择菜单类型!',
              },
            ],
          })(
            <Select>
              <Select.Option value="directory">目录</Select.Option>
              <Select.Option value="funcMenu">功能菜单</Select.Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="上级菜目录">
          {getFieldDecorator('parentCode')(<Input disabled/>)}
        </Form.Item>
        <Form.Item label="菜单编码">
          {getFieldDecorator('path', {
            rules: [
              {
                required: true,
                message: '请填写菜单编码!',
              }
            ],
          })(
            <Input.Group compact>
              <Input style={{width: '40%'}} disabled/>
              <Input style={{width: '60%'}}/>
            </Input.Group>
          )}
        </Form.Item>
        <Form.Item label="菜单名称">
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                message: '请填写菜单名称!',
              }
            ],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label="菜单路由">
          {getFieldDecorator('path', {
            rules: [
              {
                required: true,
                message: '请填写菜单路由!',
              }
            ],
          })(<Input/>)}
        </Form.Item>
      </Form>
    }

    return (
      <React.Fragment>
        <Table
          {...tableProps}
        />
        <Drawer
          {...drawerProps}
        >
        </Drawer>
      </React.Fragment>
    )
  }
}