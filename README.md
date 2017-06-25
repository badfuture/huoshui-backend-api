# 活水后端

活水后端负责给活水各客户端(Android, iOS & Webapp)提供数据接口支持(API)

## Live Demo
* **production (aliyun)** -  [https://api.huoshui.org](https://api.huoshui.org)
* **development (amazon EC2)** -  [https://api.huoshui.tk](https://api.huoshui.tk)
* **UI** -  [https://webapp.huoshui.org](https://webapp.huoshui.org)

## 准备条件

SailsJs - 基于ExpressJs和NodeJs上的后端框架
```
sudo npm install sails -g
```

PosgreSQL - SQL结构化数据储存 （主数据库）
```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

Redis / Kue - Job Scheduler (任务调度管理)
```
sudo add-apt-repository ppa:chris-lea/redis-server
sudo apt-get update
sudo apt-get install redis-server
```

## 本地安装

git clone repo到本地之后，安装npm组件

```
npm install
```

确认项目数据库设置和本地开发所用的数据库匹配
```
vim config/connections.js
```

启动服务器
```
sails lift
```

## 部署
在dev和local环境安装PM2
```
npm install pm2 -g
```

local生成SSH key，并将public key加入dev服务器
```
ssh-keygen -t rsa
ssh-copy-id -i path/to/my/key user@dev_hostname
```

进行部署配置
```
pm2 deploy pm2.config.js dev setup
```

部署
```
pm2 deploy pm2.config.js dev
```

## 主要功能

- [x] 课程信息 （课名，教师，作业，考试，标签等）
- [x] 点评信息 （点评内容，标签，各项指标等）
- [x] 教授档案 （更全的数据：格言，研究方向，头像，联系方式等）
- [ ] 课程榜单 （综合最佳，院系推荐，选修课排名，不想上的课）
- [ ] 课列系统 （用户自定义列表加简评，参考豆列）
- [x] 评论功能 （对点评进行评论）
- [x] 课程推荐 （选修课板块，通识课等关注度高的课程类别）
- [x] 常规登录 （用户名密码登录）
- [o] 社交登录 （QQ，微博，github）
- [ ] 社交分享 （生成链接给 微信，微博）

## 次要功能
- [ ] 邮件系统（密码重置，群发信息）
- [ ] 权限控制 （基于角色的权限控制）
- [ ] 微服务接入（查分功能，挂科率，课程历史打分记录）
- [x] 多学校支持 （做到如果要加学校，不用改软件，只用加内容）
- [ ] 半自动数据接口文档生成

## 用以下技术制作

### 主要技术

* SailsJs - 基于ExpressJs和NodeJs上的后端框架
* SequalizeJs - ORM对象关系映射
* PosgreSQL - SQL结构化数据储存 （主数据库）
* Redis / Kue - Job Scheduler (任务调度管理)
* Nginx - 负载均衡 / 伺服
* Cloud IaaS 服务
  * 阿里云 ECS (compute)
  * 阿里云 RDS (data)
  * 七牛云 (image)
  * CDN (delivery)

### 其它技术
* PassportJs: 用户鉴别与授权(Basic Auth + JWT)
* swagger: API 文档生成
* Nodemailer: 邮件服务
* python：数据爬虫和自动化
* Bash: 服务器环境自动化

## 维护人员

* **wzbazinga** -  [wzbazinga github](https://github.com/wzbazinga)

* **游侠** -  [paladinze github](https://github.com/paladinze)

## 授权许可

此项目使用 MIT 授权许可 - 更多细节查看 [LICENSE.md](LICENSE.md)
