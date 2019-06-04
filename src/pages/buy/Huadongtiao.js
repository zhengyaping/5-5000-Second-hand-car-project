import React, { Component } from 'react';
import { Row, Col, Slider, Input } from 'antd';

export default class Huadongtiao extends Component {
    constructor(props) {
        super(props);
        this.state = {
            v0: 0,
            v1: 0
        };
    }
    componentWillReceiveProps(nextprops) {
        this.setState({
            v0: nextprops.v[0],
            v1: nextprops.v[1]
        });
    }
    render() {
        const { min, max } = this.props.item;
        return (
            <div>
                <Row>
                    <Col span={2}>
                        <b>{this.props.item.chinese}:</b>
                    </Col>
                    <Col span={6}>
                        <Slider
                            range
                            style={{ width: '300px' }}
                            min={min}
                            max={max}
                            value={[this.state.v0, this.state.v1]}
                            onChange={v => {
                                this.setState({
                                    v0: v[0],
                                    v1: v[1]
                                });
                            }}
                            onAfterChange={v => {
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
                    <Input
                        style={{ width: 100, textAlign: 'center' }}
                        value={this.state.v0}
                        onChange={e => {
                            this.props.dispatch({
                                type: 'car/changefilters',
                                k: this.props.item.k,
                                v: [Number(e.target.value), this.state.v1],
                                _type: this.props.item.type,
                                chinese: this.props.item.chinese
                            });
                            console.log(e.target.value);
                        }}
                    />
                    <Input
                        style={{
                            width: 30,
                            borderLeft: 0,
                            pointerEvents: 'none',
                            backgroundColor: '#fff'
                        }}
                        placeholder="~"
                        disabled
                    />
                    <Input
                        style={{ width: 100, textAlign: 'center', borderLeft: 0 }}
                        value={this.state.v1}
                        onChange={e => {
                            this.props.dispatch({
                                type: 'car/changefilters',
                                k: this.props.item.k,
                                v: [this.state.v0, Number(e.target.value)],
                                _type: this.props.item.type,
                                chinese: this.props.item.chinese
                            });
                        }}
                    />
                </Row>
            </div>
        );
    }
}
