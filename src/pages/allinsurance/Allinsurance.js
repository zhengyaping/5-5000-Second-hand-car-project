import React, { Component } from 'react';
import SideBarLayout from '../../layouts/SideBarLayout';
import { Table, Popconfirm, Icon, Input, Row, Col } from 'antd';
import { connect } from 'dva';
import Fuxuankuang from './Fuxuankuang';
import Huadongtiao from './Huadongtiao';

@connect(({ student }) => ({
    results: student.results,
    total: student.total,
    page: student.page,
    pagesize: student.pagesize,
    keyword: student.keyword,
    filters: student.filters
}))
class Allinsurance extends Component {
    componentWillMount() {
        this.props.dispatch({ type: 'student/changeresults1' });
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
            value: this.getkv(item.k)
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
                k: 'city',
                alloptions: [
                    '黑龙江省',
                    '吉林省',
                    '辽宁省',
                    '北京',
                    '上海',
                    '重庆',
                    '天津',
                    '河北省',
                    '河南省',
                    '新疆维吾尔族自治区',
                    '青海省',
                    '西藏',
                    '宁夏回族自治区',
                    '内蒙古自治区',
                    '澳门特别行政区',
                    '江苏省',
                    '海南省',
                    '湖南省',
                    '湖北省',
                    '安徽省'
                ],
                type: 'A',
                chinese: '家乡'
            },
            {
                k: 'blood',
                alloptions: ['A', 'B', 'O', 'AB', '熊猫血'],
                type: 'A',
                chinese: '血型'
            },
            {
                k: 'ethnic',
                alloptions: [
                    '汉族',
                    '蒙古族',
                    '回族',
                    '藏族',
                    '维吾尔族',
                    '苗族',
                    '彝族',
                    '壮族',
                    '布依族',
                    '朝鲜族',
                    '满族',
                    '侗族',
                    '瑶族',
                    '白族',
                    '土家族',
                    '哈尼族',
                    '哈萨克族',
                    '傣族',
                    '黎族',
                    '傈僳族',
                    '佤族',
                    '畲族',
                    '高山族',
                    '拉祜族',
                    '水族',
                    '东乡族',
                    '纳西族',
                    '景颇族',
                    '柯尔克孜族',
                    '土族',
                    '达斡尔族',
                    '仫佬族',
                    '羌族',
                    '布朗族',
                    '撒拉族',
                    '毛南族',
                    '仡佬族',
                    '锡伯族',
                    '阿昌族',
                    '普米族',
                    '塔吉克族',
                    '怒族',
                    '乌孜别克族',
                    '俄罗斯族',
                    '鄂温克族',
                    '德昂族',
                    '保安族',
                    '裕固族',
                    '京族',
                    '塔塔尔族',
                    '独龙族',
                    '鄂伦春族',
                    '赫哲族',
                    '门巴族',
                    '珞巴族',
                    '基诺族'
                ],
                type: 'A',
                chinese: '民族'
            },
            {
                k: 'education',
                alloptions: ['小学', '初中', '高中', '专科', '本科', '研究生'],
                type: 'A',
                chinese: '学历'
            },
            {
                k: 'star',
                alloptions: [
                    '天蝎座',
                    '天秤座',
                    '处女座',
                    '水瓶座',
                    '金牛座',
                    '狮子座',
                    '双鱼座',
                    '白羊座',
                    '摩羯座',
                    '双子座',
                    '射手座',
                    '巨蟹座'
                ],
                type: 'A',
                chinese: '星座'
            },
            {
                k: 'age',
                min: 5,
                max: 50,
                type: 'B',
                chinese: '年龄'
            },
            {
                k: 'height',
                min: 100,
                max: 200,
                type: 'B',
                chinese: '身高'
            },
            {
                k: 'weight',
                min: 50,
                max: 250,
                type: 'B',
                chinese: '体重'
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };
        return (
            <SideBarLayout>
                {allcontrols.map(item => this.showcontorl(item))}
                <Row>
                    <Col>
                        搜索：
                        <Input
                            style={{ width: '300px' }}
                            value={this.props.keyword}
                            onChange={e => {
                                e.persist();
                                this.props.dispatch({ type: 'student/changekeyword1', keyword: e.target.value });
                            }}
                        />
                    </Col>
                </Row>
                <Table
                    rowKey="id"
                    rowSelection={rowSelection}
                    dataSource={this.props.results}
                    columns={[
                        { key: 'id', dataIndex: 'id', title: '学号' },
                        { key: 'name', dataIndex: 'name', title: '姓名' },
                        { key: 'age', dataIndex: 'age', title: '年龄' },
                        { key: 'height', dataIndex: 'height', title: '身高' },
                        { key: 'weight', dataIndex: 'weight', title: '体重' },
                        { key: 'city', dataIndex: 'city', title: '城市' },
                        { key: 'sex', dataIndex: 'sex', title: '性别' },
                        { key: 'education', dataIndex: 'education', title: '学历' },
                        { key: 'blood', dataIndex: 'blood', title: '血型' },
                        { key: 'ethnic', dataIndex: 'ethnic', title: '民族' },
                        { key: 'star', dataIndex: 'star', title: '星座' },
                        {
                            title: '操作',
                            render: rowobj => {
                                return (
                                    <Popconfirm
                                        title={'你确定要删除姓名为' + rowobj.name + '的学生吗？'}
                                        onConfirm={() => {
                                            this.props.dispatch({ type: 'student/delstudent', id: rowobj.id });
                                        }}
                                        okText="是"
                                        cancelText="否">
                                        <Icon
                                            type="close-circle"
                                            style={{ fontSize: '26px' }}
                                            theme="twoTone"
                                            twoToneColor="#f38"
                                        />
                                    </Popconfirm>
                                );
                            }
                        }
                    ]}
                    pagination={{
                        current: this.props.page,
                        total: this.props.total,
                        pageSize: this.props.pagesize,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        onChange: page => {
                            this.props.dispatch({ type: 'student/changepage1', page });
                        },
                        onShowSizeChange: (page, pageSize) => {
                            this.props.dispatch({ type: 'student/changepagesize1', pagesize: pageSize });
                        }
                    }}
                />
            </SideBarLayout>
        );
    }
}
export default Allinsurance;
