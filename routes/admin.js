const express = require('express');
const Post = require('../server/models/Post');
const User = require('../server/models/User');
const router = express.Router();
const adminayout = '../views/layouts/admin.ejs';

router.get('/', async (req, res) => {
       try {

        // 网站标题和描述
        const locals = {
            title: 'Admin',
            description: 'A simple blog built with Express and EJS'
        };

        res.render('admin/index', {locals, layout: adminayout}) // 使用 admin 布局
    } catch (error) {
        console.log('查询数据异常:', error);
    }
});

router.post('/', async (req, res) => {
       try {

        const { username, password } = req.body;
        if(username === 'admin' && password === 'password'){
            res.send('admin');
        }else {
            res.send('NO')
        }

        
    } catch (error) {
        console.log('查询数据异常:', error);
    }
});

module.exports = router;
