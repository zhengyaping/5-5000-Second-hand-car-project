import React, { Component } from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

export default class Fuxuankuang extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <CheckboxGroup
                    options={this.props.item.alloptions}
                    value={this.props.value}
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
            </div>
        );
    }
}
//http://www.baidu.com
