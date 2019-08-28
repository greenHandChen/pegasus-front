import React from "react";
import {List, Avatar, Pagination} from 'antd';
import {connect} from 'dva';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
@connect(({activiti}) => ({
  processDefinitionList: activiti.processDefinitionList
}))
export default class ProcessDefinition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    const {dispatch} = this.props;
    dispatch({
      type: 'activiti/getProcessDefinitionList'
    });
  }

  componentDidMount() {

  }

  render() {
    console.log(this.props.processDefinitionList);
    return (
      <React.Fragment>
        <div style={{border: '1px solid #E8E8E8', padding: '15px'}}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src=""/>}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <Pagination defaultCurrent={6} total={500}/>
        </div>
      </React.Fragment>

    )
  }
}