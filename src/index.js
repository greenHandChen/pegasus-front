import dva from 'dva';

// 1. 初始化 state 的数据
const app = dva();
// 绑定到全局对象
window.dvaApp = app;

// 2. 增加插件
// app.use({});

// 3. 载入model
app.model(require('./models/global').default);
app.model(require('./models/login').default);

// 4. 配置路由
app.router(require('./router').default);

// 5. 挂载dom
app.start('#root');

