import React from "react";
import {Button, Divider, Table, Tag} from 'antd';
import {connect} from 'dva';
import moment from 'moment';

const columns = [
  {
    title: '流程名',
    dataIndex: 'name',
    width: '30%',

  },
  {
    title: '版本号',
    dataIndex: 'revision',
    width: '10%',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: '25%',
    render: text => (moment(text).format('YYYY-MM-DD HH:mm:ss'))
  },
  {
    title: '最后修改时间',
    dataIndex: 'lastUpdateTime',
    width: '25%',
    render: text => (moment(text).format('YYYY-MM-DD HH:mm:ss'))
  },
  {
    title: '操作',
    dataIndex: 'id',
    width: '10%',
    render: text => (
      <span>
        <a href={`http://localhost:8079/modeler.html?modelId=${text}`} target={'_blank'}>
          <Tag color="green">编辑</Tag>
        </a>
        <Divider type="vertical"/>
        <a>
          <Tag color="red">删除</Tag>
        </a>
      </span>
    ),
  },
];

@connect(({activiti}) => ({
  processDefinitionList: activiti.processDefinitionList
}))
export default class ProcessDefinition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'activiti/getProcessDefinitionList'
    });
  }

  createProcessDefinition = () => {
    window.open(`http://localhost:8079/modeler.html?modelId=1`);
  }

  render() {
    const {processDefinitionList} = this.props;
    return (
      <React.Fragment>
        <div style={{margin: '0 10px 20px 10px'}}>
          <Button onClick={this.createProcessDefinition}>创建流程</Button>
        </div>
        <div style={{border: '1px solid #E8E8E8', padding: '15px'}}>
          <Table
            columns={columns}
            bordered
            dataSource={processDefinitionList}
          />
        </div>
      </React.Fragment>

    )
  }
}