require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./server/config/mongoDB')

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;

// 连接数据库
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

// 设置静态文件目录
app.use(express.static('public'));

// 设置模板引擎
app.use(expressLayouts);
app.set('layout', 'layouts/layout'); // 主布局
app.set('view engine', 'ejs'); // 模板引擎


app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
