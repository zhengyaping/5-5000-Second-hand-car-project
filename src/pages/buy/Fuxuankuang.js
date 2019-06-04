import React, { Component } from 'react';
import { Checkbox, Row, Col } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class Fuxuankuang extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>{this.props.item.chinese}:</b>
                    </Col>
                    <Col span={22}>
                        <CheckboxGroup
                            options={this.props.item.alloptions}
                            value={this.props.v}
                            onChange={v => {
                                this.props.dispatch({
                                    type: 'car/changefilters',
                                    k: this.props.item.k,
                                    v: v,
                                    _type: this.props.item.type,
                                    chinese: this.props.item.chinese
                                });
                            }}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
