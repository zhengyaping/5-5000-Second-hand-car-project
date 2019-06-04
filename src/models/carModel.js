import axios from 'axios';
import querystring from 'querystring';

function* loadData(put, select) {
    let page = yield select(({ car }) => car.page);
    let pagesize = yield select(({ car }) => car.pagesize);
    let filters = yield select(({ car }) => car.filters);
    let obj = {};
    filters.forEach(item => {
        if (item._type === 'A') {
            obj[item.k] = item.v.join('v');
        } else if (item._type === 'B' || 'C') {
            obj[item.k] = item.v.join('to');
        }
    });

    let { results, total } = yield axios
        .get(
            '/api/cars?' +
                querystring.stringify({
                    page,
                    pagesize,
                    ...obj
                })
        )
        .then(data => data.data);
    yield put({ type: 'changeresults', results });
    yield put({ type: 'changetotal', total });
}
export default {
    namespace: 'car',
    state: {
        results: [],
        total: 0,
        page: 1,
        pagesize: 10,
        filters: [],
        allbs: {}
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
        updatafilters(state, { k, v }) {
            return {
                ...state,
                filters: state.filters.map(item => item.k === k ? { ...item, v } : item)
            };
        },
        addfilters(state, { k, v, _type, chinese }) {
            return {
                ...state,
                filters: [...state.filters, { k, v, _type, chinese }]
            };
        },
        delfilters(state, { k }) {
            return {
                ...state,
                filters: state.filters.filter(item => item.k !== k)
            };
        },
        changeallbs(state, allbs) {
            return {
                ...state,
                allbs
            };
        }
    },
    effects: {
        *changeallbs1(action, { put, select }) {
            const { allbs } = yield axios.get('/api/allbs').then(data => data.data);
            yield put({ type: 'changeallbs', allbs });
        },
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
        *changefilters({ k, v, _type, chinese }, { put, call, select }) {
            let filters = yield select(({ car }) => car.filters);
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
