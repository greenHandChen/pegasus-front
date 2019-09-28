import React from "react";
import {connect} from 'dva';
import {Form} from 'antd';
import Table from '../../../components/Table';
import AuthorizationDispatchDrawer from "./AuthorizationDispatchDrawer";
import RoleDrawer from "./RoleDrawer";

@Form.create({name: 'roleForm'})
@connect(({loading, role}) => ({
  roleList: role.roleList,
  roleListLoading: loading.effects['role/findRoleAll']
}))
export default class RoleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'role/findRoleAll'
    });
  }

  onAuthorizationDispatchDrawer = drawer => {
    this.authorizationDispatchDrawer = drawer;
  }

  onRoleDrawer = drawer => {
    this.roleDrawer = drawer;
  }

  handleCreateRole = row => {
    this.roleDrawer.handleOpenDrawer({
      title: '创建角色'
    });
  }

  handleUpdateRole = row => {
    this.roleDrawer.handleOpenDrawer({
      title: '编辑角色'
    });
  }

  handleCopyRole = row => {
    this.roleDrawer.handleOpenDrawer({
      title: '复制角色'
    });
  }

  handleExtendRole = row => {
    this.roleDrawer.handleOpenDrawer({
      title: '继承角色'
    });
  }

  handleAuthorizationDispatch = row => {
    this.authorizationDispatchDrawer.handleOpenDrawer({
      ...row,
      title: '权限分配',
    });
  }

  handleActiveRole = row => {
  }

  render() {
    const {
      dispatch,
      roleList,
      roleListLoading,
      form: {getFieldDecorator}
    } = this.props;


    const columns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '角色编码',
        dataIndex: 'roleCode',
        key: 'roleCode',
        width: 300
      },
      {
        title: '父级角色',
        dataIndex: 'parentRoleName',
        key: 'parentRoleName',
        width: 400
      },
      {
        title: '继承上级角色',
        dataIndex: 'extendRoleName',
        key: 'extendRoleName',
        width: 400
      },
      {
        title: '状态',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 100,
        fixed: 'right',
        render: text => text ? '启用中' : '禁用中'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 300,
        fixed: 'right',
        render: (text, row) => {
          return (<div>
            <a style={{marginLeft: '15'}} onClick={() => this.handleCreateRole(row)} target={'_blank'}>
              创建
            </a>
            {row.roleCode === 'ROLE_SUB_ADMIN' ? null :
              <a style={{marginLeft: '15px'}} onClick={() => this.handleUpdateRole(row)} target={'_blank'}>
                编辑
              </a>
            }
            <a style={{marginLeft: '15px'}} onClick={() => this.handleCopyRole(row)} target={'_blank'}>
              复制
            </a>
            <a style={{marginLeft: '15px'}} onClick={() => this.handleExtendRole(row)} target={'_blank'}>
              继承
            </a>
            <a style={{marginLeft: '15px'}} onClick={() => this.handleAuthorizationDispatch(row)} target={'_blank'}>
              权限分配
            </a>
            {row.roleCode === 'ROLE_SUB_ADMIN' ? null :
              <a style={{marginLeft: '15px'}} onClick={() => this.handleActiveRole(row)} target={'_blank'}>
                {!row.isActive ? '启用' : '禁用'}
              </a>
            }
          </div>);
        }
      }
    ];
    return (
      <React.Fragment>
        <Table
          scroll={{x: '105%'}}
          loading={roleListLoading}
          columns={columns}
          dataSource={roleList}
        />
        <AuthorizationDispatchDrawer
          onAuthorizationDispatchDrawer={(drawer) => this.onAuthorizationDispatchDrawer(drawer)}
        />
        <RoleDrawer
          onRoleDrawer={(drawer) => this.onRoleDrawer(drawer)}
        />
      </React.Fragment>
    )
  }
}