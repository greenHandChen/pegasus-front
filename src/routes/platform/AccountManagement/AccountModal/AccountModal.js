import React from "react";
import Modal from '../../../../components/Modal';
import Table from '../../../../components/Table';
import Switch from '../../../../components/Switch';
import DatePicker from '../../../../components/DatePicker';
import {Button, Col, Form, Input, Row, Select,} from 'antd';
import moment from 'moment';
import {connect} from 'dva';
import DispatchRoleModal from "./DispatchRoleModal";

@Form.create({name: 'accountForm'})
@connect(({loading}) => ({
  userRoleListLoading: loading.effects['account/findRoleListByUserId']
}))
export default class AccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.props.onAccountModal(this);
    this.state = {
      id: null,// 主键
      title: null,// 标题
      switchValue: null,// 是否启用
      userRoleList: []// 帐号的角色信息
    };
  }

  onRefModal = modal => {
    this.onRefModal = modal;
  }


  handleOpenModal = options => {
    this.onRefModal.handleOpenModal();
    if (options && options.id) {
      const {dispatch} = this.props;

      dispatch({
        type: 'account/findRoleListByUserId',
        payload: {
          userId: options.id
        }
      }).then(res => {
        if (res) {
          this.setState({
            ...this.state,
            ...options,
            userRoleList: res
          });
        }
      });

      dispatch({
        type: 'account/findAccountByUserId',
        payload: {
          id: options.id
        }
      }).then(res => {
        if (res) {
          this.setState({
            ...this.state,
            ...options,
            accountForm: res
          });
        }
      });
      return;
    }
    this.setState({
      ...this.state,
      ...options
    });

  }

  handleCancelModal = () => {
    this.setState({
      id: null,
      switchValue: null,
      accountForm: {},
      userRoleList: []
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description:
   * @Data 2019/10/18
   */
  onDispatchRoleModal = modal => {
    this.dispatchRoleModal = modal;
  }

  handleOpenDispatchRoleModal = () => {
    this.dispatchRoleModal.handleOpenModal({
      id: this.state.id
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: 二次密码校验
   * @Data 2019/10/18
   */
  handleValidatorAgainPassword = (rule, val, callback) => {
    const {form} = this.props;
    const password = form.getFieldValue('password');
    if (password && password !== val) {
      callback("两次输入的密码不一致!");
    } else {
      callback();
    }
  }

  /**
   * @Author: enHui.Chen
   * @Description: 密码校验
   * @Data 2019/10/18
   */
  handleValidatorPassword = (rule, val, callback) => {
    const {form} = this.props;
    const againPassword = form.getFieldValue('againPassword');
    if (againPassword) {
      form.validateFields(['againPassword'], {force: true});
    }
    callback();
  }

  handleConfirmModal = () => {
    let vRst;
    const {
      form,
      dispatch
    } = this.props;
    form.validateFieldsAndScroll(rst => {
      if (!(vRst = rst)) {
        const roleForm = form.getFieldsValue();
        roleForm.id = this.state.id;
        roleForm.isActive = this.state.switchValue;
        dispatch({
          type: 'account/createOrUpdateAccount',
          payload: roleForm
        });
      }
    })
    return vRst;
  }

  getSwitchValue = (value) => {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.switchValue = value;
  }

  render() {
    const {
      id,
      userRoleList,
      accountForm = {}
    } = this.state;
    const {
      userRoleListLoading,
      form: {getFieldDecorator}
    } = this.props;

    const formLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 16}
    }


    const tableColumns = [
      {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: '角色编码',
        dataIndex: 'roleCode',
        key: 'roleCode',
        width: 160
      },
      {
        title: '父级角色',
        dataIndex: 'parentRoleName',
        key: 'parentRoleName',
        width: 160
      },
      {
        title: '继承角色',
        dataIndex: 'extendRoleName',
        key: 'extendRoleName',
        width: 160
      },
      {
        title: '是否启用',
        dataIndex: 'isActive',
        key: 'isActive',
        width: 100,
        render: text => text ? '启用' : '禁用'
      }
    ]

    const content = (
      <React.Fragment>
        <Form className='ant-advanced-search-form' {...formLayout}>
          <Row>
            <Col span={11}>
              <Form.Item label="帐号">
                {getFieldDecorator('username', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.username : null
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="名称">
                {getFieldDecorator('realName', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.realName : null
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          {
            id === null ? (
              <Row>
                <Col span={11}>
                  <Form.Item label="密码" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          validator: this.handleValidatorPassword

                        },
                        {
                          required: true
                        }
                      ],
                    })(<Input.Password/>)}
                  </Form.Item>
                </Col>
                <Col span={11}>
                  <Form.Item label="确认密码" hasFeedback>
                    {getFieldDecorator('againPassword', {
                      rules: [
                        {
                          validator: this.handleValidatorAgainPassword
                        }
                      ],
                    })(<Input.Password/>)}
                  </Form.Item>
                </Col>
              </Row>
            ) : null
          }
          <Row>
            <Col span={11}>
              <Form.Item label="昵称">
                {getFieldDecorator('nickName', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.nickName : null
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="性别">
                {getFieldDecorator('sex', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.sex : null
                })(
                  <Select>
                    <Select.Option value={'Male'}>男</Select.Option>
                    <Select.Option value={'FeMale'}>女</Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="手机号">
                {getFieldDecorator('phone', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.phone : null
                })(<Input/>)}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: '邮箱格式无效!',
                    },
                    {
                      required: true
                    }
                  ],
                  initialValue: id !== null ? accountForm.email : null
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="出生日期">
                {getFieldDecorator('birthday', {
                  rules: [
                    {
                      required: true
                    }
                  ],
                  initialValue: accountForm.birthday && id !== null ? moment(accountForm.birthday, 'YYYY-MM-DD') : null
                })(<DatePicker placeholder={''}/>)}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item label="住址">
                {getFieldDecorator('address', {
                  initialValue: id !== null ? accountForm.address : null
                })(<Input/>)}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={11}>
              <Form.Item label="激活">
                {getFieldDecorator('isActive')(
                  <Switch
                    getSwitchValue={this.getSwitchValue}
                    defaultChecked={accountForm.isActive !== null && id !== null ? accountForm.isActive : false}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item wrapperCol={{offset: 10}}>
                <Button onClick={() => this.handleCreateAccount()}>删除角色</Button>
                <Button type="primary" style={{marginLeft: '25px'}}
                        onClick={() => this.handleOpenDispatchRoleModal()}>分配角色</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          columns={tableColumns}
          dataSource={userRoleList}
          loading={userRoleListLoading}
        />
        <DispatchRoleModal
          onDispatchRoleModal={this.onDispatchRoleModal}
        />
      </React.Fragment>
    );

    return (
      <Modal
        width={'800px'}
        title={this.state.title}
        onRefModal={this.onRefModal}
        onCancel={this.handleCancelModal}
        onOk={this.handleConfirmModal}
        modalContent={content}
      />
    )
  }

}

