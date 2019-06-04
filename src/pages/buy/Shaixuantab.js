import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Row, Col } from 'antd';

const { TabPane } = Tabs;

@connect(({ car }) => ({
    allbs: car.allbs,
    filters: car.filters
}))
class Shaixuantab extends Component {
    constructor() {
        super();
        this.state = {
            onchar: 'A',
            activeKey: 'A'
        };
    }
    componentWillMount() {
        this.props.dispatch({ type: 'car/changeallbs1' });
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>品牌:</b>
                    </Col>
                    <Col span={22}>
                        <Tabs
                            activeKey={this.state.activeKey}
                            onChange={k => {
                                // 换nowchar
                                this.setState({
                                    nowChar: k,
                                    activeKey: k
                                });
                            }}>
                            {Object.keys(this.props.allbs).map(char => 
                                <TabPane key={char} tab={char}>
                                    123
                                </TabPane>
                            )}
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default Shaixuantab;
