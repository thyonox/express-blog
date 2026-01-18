const express = require('express');
const Post = require('../server/models/Post');
const router = express.Router();

router.get('/', async (req, res) => {
       try {

        // 网站标题和描述
        const locals = {
            title: 'Express Blog',
            description: 'A simple blog built with Express and EJS'
        };

        // 每页显示数
        let pageSize = 5;
        // 当前页数
        let currentPage = req.query.page || 1;

        // 每个请求必须使用 await ，否则拿不到数据
        const postData = await Post.aggregate([ 
            { $sort: {createTime: -1} } // 排序
        ])
        .skip(pageSize * (currentPage - 1))// 跳过数据
        .limit(pageSize) // 分页
        .exec();

        const postCount = await Post.countDocuments();
        const hasNextpage = currentPage + 1 <= Math.ceil(postCount / pageSize);

        res.render('index', { 
            locals, 
            postData, 
            currentPage, 
            nextPage: hasNextpage ? currentPage + 1 : null
        });
    } catch (error) {
        console.log('查询数据异常:', error);
    }
});

router.get('/post/:id', async (req, res) => {
       try {

        let postId = req.params.id;
        const data = await Post.findById({ _id: postId });

        // 网站标题和描述
        const locals = {
            title: data.title,
            description: 'A simple blog built with Express and EJS'
        };

        res.render('post', {locals, data})
    } catch (error) {
        console.log('查询数据异常:', error);
    }
});

router.post('/search', async (req, res) => {
       try {

        // 网站标题和描述
        const locals = {
            title: 'Search',
            description: 'A simple blog built with Express and EJS'
        };

        let searchTerm = req.body.searchTerm;        
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

        const data = await Post.find({
            $or: [
                { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
                { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
            ]
        });

        res.render('search', { locals, data});
    } catch (error) {
        console.log('查询数据异常:', error);
    }
});

router.get('/about', (req, res) => {
    res.render('about');
});


// 插入数据 
// function insertPostData() {
//     Post.insertMany([
//         {
//             "title": "Getting Started with Express",
//             "body": "This post explains how to set up a basic Express server and handle routes."
//         },
//         {
//             "title": "Understanding Middleware",
//             "body": "Middleware functions are functions that have access to the request and response objects in Express."
//         },
//         {
//             "title": "Working with EJS Templates",
//             "body": "Learn how to use EJS as a templating engine to render dynamic HTML in Express."
//         },
//         {
//             "title": "Connecting to MongoDB with Mongoose",
//             "body": "This post demonstrates how to connect your Express app to MongoDB using Mongoose."
//         },
//         {
//             "title": "Implementing User Authentication",
//             "body": "A basic guide to adding user login and session handling in an Express app."
//         },
//         {
//             "title": "Serving Static Files",
//             "body": "How to serve static assets like CSS and images in an Express application."
//         },
//         {
//             "title": "Creating RESTful APIs",
//             "body": "Understand how to structure and build RESTful APIs with Express."
//         },
//         {
//             "title": "Using Environment Variables",
//             "body": "Learn how to manage sensitive data like API keys using dotenv in your Express project."
//         },
//         {
//             "title": "Deploying to Heroku",
//             "body": "A quick tutorial on how to deploy an Express app to Heroku."
//         },
//         {
//             "title": "Error Handling in Express",
//             "body": "How to catch and handle errors properly in your Express routes and middleware."
//         }
//     ])
// }
// insertPostData();

module.exports = router;
