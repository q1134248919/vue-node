"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password,
        time:new Date(),
        name:"用户"+parseInt(Math.random()*10000000)
    },false);
    // 保存数据newAccount数据进mongoDB
    newAccount.save().then((data)=>{
        res.send(data);
        res.end();
    },(err)=>{
       console.log(1);
        
    });
     
});

// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
    console.log(req)
    //查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    res.end();
    });
});

// 判断用户名是否注册过
 router.post('/api/login/checkAccount', (req,res)=>{
     models.Login.find({account:req.body.account}).then((data)=>{
          res.send(data);
          res.end();
     })
 })

router.post('/api/login/loginin',(req,res)=>{
     models.Login.find({account:req.body.account,password:req.body.password}).then((data)=>{
         res.send(data);
         res.end();
     },(err)=>{
         res.send(err);
         
     })
})

 


module.exports = router;