import React, { Component } from 'react';
import SideBarLayout from '../../layouts/SideBarLayout';
import { Table, Checkbox } from 'antd';
import { connect } from 'dva';
import Fuxuankuang from './Fuxuankuang';
import Huadongtiao from './Huadongtiao';
import Shaixuantab from './Shaixuantab';

const CheckboxGroup = Checkbox.Group;

@connect(({ car }) => ({
    results: car.results,
    total: car.total,
    page: car.page,
    pagesize: car.pagesize,
    filters: car.filters
}))
class Buy extends Component {
    componentWillMount() {
        this.props.dispatch({ type: 'car/changeresults1' });
    }
    getkv(k) {
        for (let i = 0; i < this.props.filters.length; i++) {
            if (this.props.filters[i].k === k) {
                return this.props.filters[i].v;
            }
        }
        return [];
    }
    showcontorl(item) {
        let aaa = {
            key: item.k,
            item: item,
            dispatch: this.props.dispatch,
            v: this.getkv(item.k)
        };
        if (item.type === 'A') {
            return <Fuxuankuang {...aaa} />;
        } else if (item.type === 'B') {
            return <Huadongtiao {...aaa} />;
        }
    }
    render() {
        const allcontrols = [
            {
                k: 'color',
                alloptions: ['红', '黄', '绿', '橙', '黑', '白', '灰', '银灰', '咖啡', '蓝'],
                type: 'A',
                chinese: '颜色'
            },
            {
                k: 'engine',
                alloptions: ['1.2L', '1.4L', '1.6L', '1.8L', '1.8T', '2.0L', '2.0T', '3.0L', '3.0T', '4.0L', '4.0T'],
                type: 'A',
                chinese: '排量'
            },
            {
                k: 'exhaust',
                alloptions: ['国一', '国二', '国三', '国四', '国五'],
                type: 'A',
                chinese: '环保标准'
            },
            {
                k: 'price',
                min: 10,
                max: 20,
                type: 'B',
                chinese: '价格'
            },
            {
                k: 'km',
                min: 20000,
                max: 30000,
                type: 'B',
                chinese: '公里数'
            }
        ];
        return (
            <SideBarLayout>
                <Shaixuantab />
                {allcontrols.map(item => this.showcontorl(item))}
                <Table
                    rowKey="id"
                    dataSource={this.props.results}
                    columns={[
                        {
                            key: 'img',
                            dataIndex: 'img',
                            title: '车辆图片',
                            render(v) {
                                return <img alt="" src={'http://192.168.2.233' + v} />;
                            }
                        },
                        { key: 'id', dataIndex: 'id', title: '车辆编号' },
                        { key: 'brand', dataIndex: 'brand', title: '品牌' },
                        { key: 'series', dataIndex: 'series', title: '车系' },
                        { key: 'color', dataIndex: 'color', title: '颜色' },
                        { key: 'engine', dataIndex: 'engine', title: '发动机排量' },
                        { key: 'exhaust', dataIndex: 'exhaust', title: '环保标准' }
                    ]}
                    pagination={{
                        current: this.props.page,
                        total: this.props.total,
                        pageSize: this.props.pagesize,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: page => {
                            this.props.dispatch({ type: 'car/changepage1', page });
                        },
                        onShowSizeChange: (page, pageSize) => {
                            this.props.dispatch({ type: 'car/changepagesize1', pagesize: pageSize });
                        }
                    }}
                />
            </SideBarLayout>
        );
    }
}
export default Buy;
