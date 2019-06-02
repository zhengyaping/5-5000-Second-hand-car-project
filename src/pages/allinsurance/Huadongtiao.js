import React, { Component } from 'react';
import { Slider, Row, Col } from 'antd';

export default class Huadongtiao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            v0: 0,
            v1: 0
        };
    }
    render() {
        let { min, max } = this.props.item;
        return (
            <div>
                <Row>
                    <Col>
                        <b>{this.props.item.chinese}</b>
                    </Col>
                    <Col>
                        <Slider
                            range
                            min={min}
                            max={max}
                            style={{ width: '300px' }}
                            value={[this.state.v0, this.state.v1]}
                            onChange={v => {
                                this.props.dispatch({
                                    type: 'student/changefilters',
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
