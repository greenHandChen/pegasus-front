import React from "react";
import {connect} from 'dva';
import Table from '../../../components/Table';
import Modal from '../../../components/Modal';
import Notification from '../../../components/Notification';
import DeliverModal from "./DeliverModal";


@connect(({loading, processMonitor}) => ({
  processMonitorList: processMonitor.processMonitorList,
  processNodeList: processMonitor.processNodeList,
  processMonitorListLoading: loading.effects['processMonitor/findProcessInstanceMonitor'],
  processNodeListLoading: loading.effects['processMonitor/findProcessJumpNode']
}))
export default class ProcessMonitor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: null,
      selectedRowKeys: []
    }
  }

  componentDidMount() {
    this.handleFindProcessInstanceMonitor();
  }

  onJumpTaskModal = modal => {
    this.jumpTaskModal = modal;
  }

  onFinishTaskModal = modal => {
    this.finishTaskModal = modal;
  }

  onRefDeliverModal = modal => {
    this.deliverModal = modal;
  }

  /**
   * @Author: enHui.Chen
   * @Description: 初始化流程监控数据
   * @Data 2019/10/29
   */
  handleFindProcessInstanceMonitor = () => {
    const {dispatch} = this.props;
    dispatch({
      type: 'processMonitor/findProcessInstanceMonitor',
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: 打开任务跳转modal
   * @Data 2019/10/29
   */
  handleOpenJumpModal = (row) => {
    this.jumpTaskModal.handleOpenModal();
    this.props.dispatch({
      type: 'processMonitor/findProcessJumpNode',
      payload: {
        processDefinitionId: row.procDefId
      }
    });
    this.setState({
      ...this.state,
      taskId: row.taskVOS[0].id
    })
  }

  /**
   * @Author: enHui.Chen
   * @Description: 任务跳转modal的确认
   * @Data 2019/10/29
   */
  handleJumpNodeConfirmModal = () => {
    const {
      taskId,
      selectedRowKeys
    } = this.state;
    if (!taskId || !selectedRowKeys) {
      Notification.warning({
        message: '操作失败',
        description: '请选择需要跳转的节点'
      });
    }
    this.props.dispatch({
      type: 'processMonitor/jumpTask',
      payload: {
        taskId,
        destinationActivitiId: selectedRowKeys[0]
      }
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: 打开任务终止modal
   * @Data 2019/10/29
   */
  handleOpenFinishModal = (row) => {
    this.finishTaskModal.handleOpenModal();
    this.setState({
      ...this.state,
      id: row.id
    })
  }

  /**
   * @Author: enHui.Chen
   * @Description: 任务终止modal的确认
   * @Data 2019/10/29
   */
  handleFinishNodeConfirmModal = () => {
    const {
      id
    } = this.state;
    this.props.dispatch({
      type: 'processMonitor/finishTask',
      payload: {id}
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: 节点任务挂起/激活
   * @Data 2019/10/29
   */
  handleTaskSuspendOrActive = (row) => {
    this.props.dispatch({
      type: 'processMonitor/suspendOrActiveTask',
      payload: {
        id: row.id
      }
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: 节点任务转交
   * @Data 2019/10/31
   */
  handleOpenTaskDeliverModal = (row) => {
    this.deliverModal.handleOpenModal({
      processInstanceId: row.id
    });
  }

  /**
   * @Author: enHui.Chen
   * @Description: modal的取消
   * @Data 2019/10/29
   */
  handleNodeCloseModal = () => {
    this.setState({
      id: null,
      taskId: null,
      selectedRowKeys: []
    })
  }

  /**
   * @Author: enHui.Chen
   * @Description: table的单行点击事件
   * @Data 2019/10/29
   */
  handleTableRowClick = (row, event) => {
    this.setState({
      ...this.state,
      selectedRowKeys: Array.isArray(row) ? row : [row.nodeId]
    })
  }

  render() {
    const {
      processMonitorList,
      processNodeList,
      processMonitorListLoading,
      processNodeListLoading
    } = this.props;


    const {
      selectedRowKeys
    } = this.state;

    const columns = [
      {
        title: '流程实例Id',
        dataIndex: 'id',
        width: 150
      },
      {
        title: '流程名称',
        dataIndex: 'processName',
        width: 200
      },
      {
        title: '审批环节',
        key: 'name',
        dataIndex: 'taskVOS',
        width: 200,
        render: taskVOS => {
          if (taskVOS) {
            return taskVOS[0].name;
          }
        }
      },
      {
        title: '任务持有人',
        key: 'assigneeName',
        dataIndex: 'taskVOS',
        render: taskVOS => {
          if (taskVOS) {
            let name;
            taskVOS.forEach(taskVO => name = name ? `${name} , ${taskVO.assigneeName}` : taskVO.assigneeName);
            return name;
          }
        }
      },
      {
        title: '任务申请人',
        dataIndex: 'startUserName',
        width: 200
      },
      {
        title: '开始日期',
        dataIndex: 'startTime',
        width: 200
      },
      {
        title: '结束日期',
        dataIndex: 'endTime',
        width: 200
      },
      {
        title: '流程状态',
        dataIndex: 'suspensionState',
        width: 100,
        fixed: 'right',
        render: text => !text ? '已结束' : text === 1 ? '运行中' : '挂起'
      },
      {
        title: '操作',
        key: 'taskId',
        width: 200,
        fixed: 'right',
        render: (text, row) => {
          if (row.taskVOS) {
            return (<div>
              <a style={{marginLeft: '15px'}} onClick={() => this.handleOpenTaskDeliverModal(row)} target={'_blank'}>
                转交
              </a>
              <a style={{marginLeft: '15px'}} onClick={() => this.handleOpenJumpModal(row)} target={'_blank'}>
                跳转
              </a>
              <a style={{marginLeft: '15px'}} onClick={() => this.handleTaskSuspendOrActive(row)} target={'_blank'}>
                {row.suspensionState === 1 ? '挂起' : '激活'}
              </a>
              <a style={{marginLeft: '15px'}} onClick={() => this.handleOpenFinishModal(row)} target={'_blank'}>
                终止
              </a>
            </div>);
          }
        }
      },
    ];

    // 定义modal的table-start
    const modalContentColumns = [
      {
        title: '节点id',
        dataIndex: 'nodeId',
        width: 300
      },
      {
        title: '节点名称',
        dataIndex: 'nodeName',
        width: 150
      }
    ];

    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: row => this.handleTableRowClick(row)
    };

    const modalContent = (
      <Table
        rowKey={row => row.nodeId}
        rowSelection={rowSelection}
        loading={processNodeListLoading}
        columns={modalContentColumns}
        dataSource={processNodeList}
        onRow={row => {
          return {
            onClick: event => this.handleTableRowClick(row, event)
          }
        }}
      />
    );
    // 定义modal的table-end

    return (
      <React.Fragment>
        <Table
          rowKey={row => `${row.id}/${row.taskId}`}
          scroll={{x: '105%'}}
          loading={processMonitorListLoading}
          columns={columns}
          dataSource={processMonitorList}
        />
        <Modal
          width={'600px'}
          title={'选择跳转节点'}
          onRefModal={this.onJumpTaskModal}
          onOk={this.handleJumpNodeConfirmModal}
          onCancel={this.handleNodeCloseModal}
          modalContent={modalContent}
        />
        <Modal
          title={'提示'}
          width={'300px'}
          onRefModal={this.onFinishTaskModal}
          onOk={this.handleFinishNodeConfirmModal}
          onCancel={this.handleNodeCloseModal}
          modalContent={'确定要终止流程吗?'}
        />

        <DeliverModal
          title={'请选择转交节点'}
          onRefDeliverModal={this.onRefDeliverModal}
        />
      </React.Fragment>
    )
  }
}