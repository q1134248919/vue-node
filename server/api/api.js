"use strict";
const models = require("../db");
const express = require("express");
const jsonData = require("../data");
const router = express.Router();

/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

// 创建账号接口
router.post("/api/login/createAccount", (req, res) => {
  // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
  let newAccount = new models.Login(
    {
      account: req.body.account,
      password: req.body.password,
      time: new Date(),
      name: "用户" + parseInt(Math.random() * 10000000)
    },
    false
  );
  // 保存数据newAccount数据进mongoDB
  newAccount.save().then(
    data => {
      res.send(data);
      res.end();
    },
    err => {
      console.log(1);
    }
  );
});

// 获取已有账号接口
router.get("/api/login/getAccount", (req, res) => {
  //查找数据库
  console.log(req, res);
  models.Login.find((err, data) => {
    if (err) {
      res.send(jsonData.errData(err));
    } else {
      res.send(jsonData.successData(data));
    }
    res.end();
  });
});

// 判断用户名是否注册过
router.post("/api/login/checkAccount", (req, res) => {
  models.Login.find({ account: req.body.account }).then(data => {
    res.send(data);
    res.end();
  });
});

// 判断用户名是否注册过
router.post("/api/account/get_menu", (req, res) => {
  models.Login.find().then(data => {
    res.send(
      jsonData.successData(
        [
          {
            path: "/admin",
            name: "admin",
            icon: "crown",
            component: "./Admin",
            routes: [
              {
                path: "/admin/sub-page",
                name: "sub-page",
                icon: "smile",
                component: "./Welcome"
              }
            ]
          },
          {
            name: "list.table-list",
            icon: "table",
            path: "/list",
            component: "./TableList"
          }
        ]
        // {
        //   path: '/admin',
        //   name: '专栏回复',
        //   label: '专栏回复',
        //   icon: 'crown',
        //   component: './Admin',
        //   children: [
        //     {
        //       path: '/admin/sub-page',
        //       name: 'sub-page',
        //       icon: 'smile',
        //       component: './Welcome',
        //     },
        //   ],
        // },
        // {
        //   name: 'list.table-list',
        //   icon: 'table',
        //   path: '/list',
        //   component: './TableList',
        // },
      )
    );

    res.end();
  });
});

router.post("/api/login/loginin", (req, res) => {
  models.Login.find({
    account: req.body.account,
    password: req.body.password
  }).then(
    data => {
      //是否存在
      if (data.length >= 1) {
        res.send(jsonData.successData(data));
      } else {
        res.send(jsonData.errData("账号或密码错误!"));
      }
    },
    err => {
      res.send(jsonData.errData(err));
    }
  );
});

module.exports = router;
