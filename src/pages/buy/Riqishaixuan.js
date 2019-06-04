import React, { Component } from 'react';
import { DatePicker, Row, Col } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

export default class Riqishaixuan extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { v, k, chinese } = this.props.item;
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>{chinese}</b>
                    </Col>
                    <Col span={22}>
                        <RangePicker
                            showTime
                            format="YYYY/MM/DD"
                            allowClear={false}
                            onChange={v => {
                                this.props.dispatch({
                                    type: 'car/changefilters',
                                    k,
                                    v: v.map(item => item.unix() * 1000),
                                    _type: this.props.item.type
                                });
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
