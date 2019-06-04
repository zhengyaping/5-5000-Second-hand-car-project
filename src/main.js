import Dva from 'dva';

import route from './route';
import './less/layouts.less';
// import reduxlogger from 'redux-logger';
import carModel from './models/carModel';

const app = Dva({
    // onAction: reduxlogger
});
app.model(carModel);

app.router(route);

app.start('#root');
