import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history';
import router from './router'
import './index.css';

// 1. Initialize
const app = dva({
  history:createHistory()
});

// 2. Plugins
// app.use({});
 
// 3. Model
// app.model(require('./models/app').default);
// const requireModel = require.context('./models', false, /\.js$/);
// requireModel.keys().forEach((filename) => {
//   const model = requireModel(filename);
//   app.model(model.default);
// });

// 4. Router
app.router(router);

 
// 5. Start
app.start('#root');