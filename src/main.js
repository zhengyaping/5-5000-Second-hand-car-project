import Dva from 'dva';

import route from './route';
import './less/layouts.less';
import reduxlogger from 'redux-logger';
import studentModel from './models/studentModel';

const app = Dva({
    // onAction: reduxlogger
});
app.model(studentModel);

app.router(route);

app.start('#root');
