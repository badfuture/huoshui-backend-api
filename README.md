# 活水后端

活水后端负责给活水各客户端(Android, iOS & Webapp)提供数据接口支持(API)。主要设计目标如下：

* 多学校支持 （做到如果要加学校，不用改软件，只用加内容）
* 教授档案 （更全的数据：格言，研究方向，头像，联系方式等）
* 经验分享 （校园生活经验分享）
* 查分功能 （挂科率，课程历史打分记录）
* 评论功能 （对评论进行评论）
* 课程推荐 （选修课板块，通识课等关注度高的课程类别）
* 社交分享 （生成链接给 微信，微博）
* 社交登录 （QQ，微博，github）
* 常规登录 （用户名密码登录）
* 邮件系统（密码重置，群发信息）
* 实时通信 （信息推送，实时答疑）
* 对外公开的数据接口API （获取研究数据，别人可以做第三方应用）
* 权限控制 （基于角色的权限控制）
* 后端驱动的数据统计 （客户端只录入数据，后端周期性做数据统计）
* 后端驱动的排名 （客户端只读，不用每个客户端都有一套逻辑。这样前端更快，算法可复杂定制）
* 半自动数据接口文档生成 （对开发团队建设很重要）
* 安全问题应对 (CSRF, XSS, SQL Injection, DDOS)

## 本地安装

git clone repo到本地之后，安装npm组件

```
npm install
```

确认项目数据库设置和本地开发所用的数据库匹配。如果config/connections.js和config/local.js都有设置，local.js里的设置优先。

```
cd huoshui-backend-sailsjs
vim config/connections.js
vim config/local.js
```

启动服务器
```
sails lift
```


## 服务器部署

TBD

## 用以下技术制作

### 主要技术

* SailsJs - 基于ExpressJs和NodeJs上的后端框架
* SequalizeJs - ORM对象关系映射
* PosgreSQL - SQL结构化数据储存 （主数据库）
* MongoDB - NoSQL读取优化（局部优化）
* Socket.io - 实时通讯
* Docker - 轻量级的、可移植的、自给自足的部署用的容器
* Nginx - 负载均衡 / 逆伺服
* Cloud IaaS 服务
  * 阿里云 ECS (compute)
  * 阿里云 RDS (data store) <=买不起
  * 七牛云 (image store)
  * CDN (delivery) <=买不起
* Nodemailer - 邮件服务

### 其它技术
* PassportJs - 用户鉴别与授权(Basic Auth + JWT)
* swagger: API 文档生成
* python: 数据爬虫和自动化
* Bash: 服务器环境自动化

## 维护人员

* **wzbazinga** -  [wzbazinga github](https://github.com/wzbazinga)

* **游侠** -  [paladinze github](https://github.com/paladinze)

## 授权许可

此项目使用 MIT 授权许可 - 更多细节查看 [LICENSE.md](LICENSE.md)
