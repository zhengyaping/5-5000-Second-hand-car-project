import axios from 'axios';
import querystring from 'querystring';
import { message } from 'antd';

function* loadData(put, select) {
    let page = yield select(({ student }) => student.page);
    let pagesize = yield select(({ student }) => student.pagesize);
    let keyword = yield select(({ student }) => student.keyword);
    let filters = yield select(({ student }) => student.filters);
    let obj = {};
    filters.forEach(item => {
        obj[item.k] = item.v.join('v');
    });
    let { results, total } = yield axios
        .get(
            '/api/students?' +
                querystring.stringify({
                    page,
                    pagesize,
                    keyword,
                    ...obj
                })
        )
        .then(data => data.data);
    yield put({ type: 'changeresults', results });
    yield put({ type: 'changetotal', total });
}

export default {
    namespace: 'student',
    state: {
        results: [],
        total: 0,
        page: 1,
        pagesize: 10,
        keyword: '',
        filters: []
    },
    reducers: {
        changeresults(state, action) {
            return {
                ...state,
                results: action.results
            };
        },
        changetotal(state, action) {
            return {
                ...state,
                total: action.total
            };
        },
        changepage(state, action) {
            return {
                ...state,
                page: action.page
            };
        },
        changepagesize(state, action) {
            return {
                ...state,
                pagesize: action.pagesize
            };
        },
        changekeyword(state, action) {
            return {
                ...state,
                keyword: action.keyword
            };
        },
        updatafilters(state, { k, v }) {
            return {
                ...state,
                filters: state.filters.map(item => item.k === k ? { ...item, v } : item)
            };
        },
        addfilters(state, { k, v, _type, chinese }) {
            return {
                ...state,
                filters: [...state.filters, { k, v, type: _type, chinese }]
            };
        },
        delfilters(state, { k }) {
            return {
                ...state,
                filters: state.filters.filter(item => item.k !== k)
            };
        }
    },
    effects: {
        *changeresults1(action, { put, call, select }) {
            yield call(loadData, put, select);
        },
        *changepage1(action, { put, call, select }) {
            yield put({ type: 'changepage', page: action.page });
            yield call(loadData, put, select);
        },
        *changepagesize1(action, { put, call, select }) {
            yield put({ type: 'changepage', page: 1 });
            yield put({ type: 'changepagesize', pagesize: action.pagesize });
            yield call(loadData, put, select);
        },
        *changekeyword1(action, { put, call, select }) {
            yield put({ type: 'changekeyword', keyword: action.keyword });
            yield call(loadData, put, select);
        },
        *delstudent(action, { put, call, select }) {
            let { result, msg } = yield axios.get('/api/delstudent?id=' + action.id).then(data => data.data);
            if (result === 1) {
                message.success('成功删除');
            } else if (result === -1) {
                message.error(msg);
            } else if (result === -3) {
                message.error(msg);
            }
            yield loadData(put, select);
        },
        *changefilters({ k, v, _type, chinese }, { put, select, call }) {
            let filters = yield select(({ student }) => student.filters);
            let isCunzai = false;

            filters.forEach(item => {
                if (item.k === k) {
                    isCunzai = true;
                }
            });
            if (!isCunzai) {
                yield put({ type: 'addfilters', k, v, _type, chinese });
            } else {
                if (v.length === 0) {
                    yield put({ type: 'delfilters', k });
                } else {
                    yield put({ type: 'updatafilters', k, v });
                }
            }
            yield put({ type: 'changepage', page: 1 });
            yield call(loadData, put, select);
        }
    }
};
