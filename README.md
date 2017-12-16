# 活水后端

活水后端负责给活水各客户端(Android, iOS & Webapp)提供数据接口支持(API)

## Live Demo
* **Production Server (aliyun)** -  [https://api.huoshui.org](https://api.huoshui.org)
* **Development Server (amazon EC2)** -  [https://api.huoshui.tk](https://api.huoshui.tk)
* **Webapp UI** -  [https://webapp.huoshui.org](https://webapp.huoshui.org)
* **API Doc** -  [http://doc.huoshui.org](http://doc.huoshui.org/?url=https://api.huoshui.org/swagger/doc)
* **OpenAPI 2.0 Specification** -  [https://api.huoshui.org/swagger/doc](https://api.huoshui.org/swagger/doc)

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
在staging server和production server安装 [Docker](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/)

部署 (包括webapp和后端)
```
docker swarm init
docker stack deploy -c docker-compose.yml huoshui-stack
```

## 主要功能

- [x] 课程信息 （课名，教师，作业，考试，标签等）
- [x] 点评信息 （点评内容，标签，各项指标等）
- [x] 教授档案 （更全的数据：格言，研究方向，头像，联系方式等）
- [x] 课程榜单 （综合最佳，院系推荐，选修课排名，不想上的课）
- [ ] 课列系统 （用户自定义列表加简评，参考豆列）
- [x] 评论功能 （对点评进行评论）
- [x] 课程推荐 （选修课板块，通识课等关注度高的课程类别）
- [x] 常规登录 （用户名密码登录）
- [x] 社交登录 （QQ，微博，github）
- [x] 社交分享 （生成链接给 微信，微博）

## 次要功能
- [ ] 微服务接入（查分，挂科率，课程历史打分记录）
- [ ] 邮件系统（密码重置，群发信息）
- [ ] 权限控制 （基于角色的权限控制）
- [x] 多学校支持 （做到如果要加学校，不用改软件，只用加内容）
- [x] 半自动数据接口文档生成

## 用以下技术制作

### 主要技术

* SailsJs - 基于ExpressJs和NodeJs上的后端框架
* SequalizeJs - ORM对象关系映射
* PosgreSQL - SQL结构化数据储存 （主数据库）
* Redis / Kue - Job Scheduler (任务调度管理)
* Nginx - 负载均衡 / 伺服
* Docker - 虚拟化 / 部署
* Cloud IaaS 服务
  * 阿里云 ECS (Compute + Data Store)
  * 七牛云 (CDN + Object Storage)

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
