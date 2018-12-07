import React, { Component } from 'react'
import { Avatar, Icon, Divider, Button } from 'antd'
import marked from 'marked'
import hljs from 'highlight.js'

import './style.scss'
import CommentEditor from '../../components/CommentEditor'
import CommentList from '../../components/CommentsList'
function CustomTag(props){
    return (
        <span>
            {props.children}
            <Divider type="vertical"/>
        </span>
    )
}
export default class Article extends Component {
    constructor(props){
        super(props)
        this.state = {
            content: "![BiaoChenXuYing](https://upload-images.jianshu.io/upload_images/12890819-22d0cb2d40e09612.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n\n# 前言\n\n本文讲解的是：做为前端开发人员，对服务器的了解还是小白的我，是如何一步步将 node+mongodb 项目部署在阿里云 centos 7.3 的服务器上，并进行性能优化，达到页面 1 秒内看到 loading ，3 秒内看到首屏内容的。\n\n搭建的项目是采用了主流的前后端分离思想的，这里只讲 **服务器环境搭建与性能优化。**\n\n效果请看 [http://biaochenxuying.cn/main.html](http://biaochenxuying.cn/main.html)\n\n# 1. 流程\n\n- 开发好前端与后端程序。\n- 购买服务器与域名\n- 服务器上安装所需环境（本项目是 node 和 mongodb ）\n- 服务器上开放端口与设置规则\n- 用 nginx、apache 或者tomcat 来提供HTTP服务或者设置代理\n- 上传项目代码 或者 用码云或者 gihub 来拉取你的代码到服务器上\n- 启动 express 服务器\n- 优化页面加载\n\n\n# 2. 内容细节\n\n## 2.1 开发好前端与后端程序\n\n开发好前端与后端程序，这个没什么好说的，就是开发！开发！开发！再开发！\n\n## 2.2 购买服务器与域名\n\n本人一直觉得程序员应该有一个自己的个人网站，拥有自己的域名与服务器。学知识或者测试项目的时候可以用来测试。\n\n阿里云有个专供学生的云翼计划  [阿里云学生套餐](https://promotion.aliyun.com/ntms/act/campus2018.html)，入门级的云服务器原价1400多，学生认证后只要114一年，非常划算。\n\n还是学生的，直接购买；不是学生了，有弟弟、妹妹的，可以用他们的大学生身份，购买，非常便宜实用（我购买的就是学生优惠套餐）。当然阿里云服务器在每年双 11 时都有很大优惠，也很便宜，选什么配置与价格得看自己的用处。\n\n服务器预装环境可以选择 CentOS 或者 windows server，，为了体验和学习 linux 系统，我选择了CentOS。\n\n![学生优惠套餐](https://upload-images.jianshu.io/upload_images/12890819-97f2516c305d9168.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n再次是购买域名 [阿里域名购买](https://wanwang.aliyun.com/domain/yumingheji)，本人也是在阿里云购买的。域名是分 国际域名与国内域名的，国际域名是不用备案的，但是国内的域名是必须 ICP备案的 [阿里云ICP代备案管理系统](https://beian.aliyun.com/order/index.htm?spm=a3c00.7621333.a3c1z.1.2439nxagnxagjz)，不然不能用，如果是国内域名，如何备案域名，请自己上网查找教程。\n\n\n![域名](https://upload-images.jianshu.io/upload_images/12890819-5f83fe0dc8695b83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n当然如果你的网站只用来自己用的话，可以不用买域名，因为可以通过服务器的公网 ip 来访问网站内容的。\n\n如果购买了域名了，还要设置域名映射到相应的公网 ip ，不然也不能用。\n\n![域名解析](https://upload-images.jianshu.io/upload_images/12890819-759b6269857622d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n\n## 3. 服务器上安装所需环境（本项目是 node 和 mongodb ）\n\n#### 3.1 登录服务器\n\n因本人用的是 MacBook Pro ，所以直接打开 mac 终端，通过下面的命令行连接到服务器。root 是阿里云服务器默认的账号名，连接时候会叫你输入密码，输入你购买时设置的或者后来设置的密码。\n\n```\nssh root@47.106.20.666   //你的服务器公网 ip，比如 47.106.20.666\n```\n如图：\n\n![登录成功效果](https://upload-images.jianshu.io/upload_images/12890819-f4d264504e6fa956.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n> window 系统的，请用 Putty 或 Xshell 来登录，可以参考一下这篇文章  [把 Node.js 项目部署到阿里云服务器（CentOs）](https://segmentfault.com/a/1190000004051670)\n\n一般在新服务器创建后，建议先升级一下 CentOS：\n\n```\nyum -y update\n```\n\n常用的 Linux 命令\n\n```\ncd 进入目录\ncd .. 返回上一个目录\nls -a 查看当前目录\nmkdir abc 创建abc文件夹\nmv 移动或重命名\nrm 删除一个文件或者目录\n```\n\n#### 3.2  安装 node\n\n升级常用库文件, 安装 node.js 需要通过 g++ 进行编译。\n\n```\nyum -y install gcc gcc-c++ autoconf\n```\n\n跳转到目录：/usr/local/src，这个文件夹通常用来存放软件源代码：\n\n```\ncd /usr/local/src\n```\n\n下载 node.js 源码，也可以使用 scp 命令直接上传，因为下载实在太慢了：\n下载地址：[Downloads](https://nodejs.org/en/download/)，请下载最新的相应版本的源码进行下载，本人下载了 v10.13.0 版本的。\n\n![下载 node.js 源码](https://upload-images.jianshu.io/upload_images/12890819-5ec3f42765ca14d7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n```\nhttps://nodejs.org/dist/v10.13.0/node-v10.13.0.tar.gz\n```\n\n下载完成后解压：\n\n```\ntar -xzvf node-v10.13.0.tar.gz\n```\n\n进入解压后的文件夹：\n\n```\ncd node-v10.13.0\n```\n\n执行配置脚本来进行预编译处理：\n\n```\n./configure\n```\n\n编译源代码，这个步骤花的时间会很长，大概需要 5 到 10 分钟：\n\n```\nmake\n```\n\n编译完成后，执行安装命令，使之在系统范围内可用：\n\n```\nmake install\n```\n\n安装 express 推荐 global 安装\n\n```\nnpm -g install express\n```\n\n建立超级链接, 不然 sudo node 时会报 \"command not found\"\n\n```\nsudo ln -s /usr/local/bin/node /usr/bin/node\nsudo ln -s /usr/local/lib/node /usr/lib/node\nsudo ln -s /usr/local/bin/npm /usr/bin/npm\nsudo ln -s /usr/local/bin/node-waf /usr/bin/node-waf\n```\n\n通过指令查看 node 及 npm 版本：\n\n```\nnode -v\n```\n\n```\nnpm -v\n```\n\nnode.js 到这里就基本安装完成了。\n\n#### 3.2  安装 mongodb\n\n下载地址：[mongodb](https://www.mongodb.com/download-center/community)\n下载时，请选对相应的环境与版本，因为本人的服务器是 CentOS ，其实本质就是 linux 系统，所以选择了如下图环境与目前最新的版本。\n\n![mongodb](https://upload-images.jianshu.io/upload_images/12890819-1545bc193d39194b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\nmongodb : \n\n```\n软件安装位置：/usr/local/mongodb\n数据存放位置：/home/mongodb/data\n数据备份位置：/home/mongodb/bak\n日志存放位置：/home/mongodb/logs\n```\n\n下载安装包\n```\n> cd /usr/local\n> wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-4.0.4.tgz\n```\n\n解压安装包，重命名文件夹为 mongodb\n\n```\ntar zxvf mongodb-linux-x86_64-4.0.4.tgz\nmv mongodb-linux-x86_64-4.0.4 mongodb\n```\n\n在 var 文件夹里建立 mongodb 文件夹，并分别建立文件夹 data 用于存放数据，logs 用于存放日志\n\n```\nmkdir /var/mongodb\nmkdir /var/mongodb/data\nmkdir /var/mongodb/logs\n```\n\n打开 rc.local 文件，添加 CentOS 开机启动项：\n\n```\nvim /etc/rc.d/rc.local\n// 不懂 vim 操作的请自行查看相应的文档教程，比如： vim 模式下，要 按了 i 才能插入内容，输入完之后，要按 shift 加 :wq 才能保存退出。\n```\n\n将 mongodb 启动命令追加到本文件中，让 mongodb 开机自启动：\n\n```\n/usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork\n```\n\n启动 mongodb\n\n```\n/usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log -fork\n```\n\n看到如下信息说明已经安装完成并成功启动:\n\n```\nforked process: 18394\nall output going to: /var/mongodb/logs/log.log\n```\nmongodb 默认的端口号是 27017。\n\n如果你数据库的连接要账号和密码的，要创建数据库管理员，不然直接连接即可。\n在 mongo shell 中创建管理员及数据库。\n\n切换到 admin 数据库，创建超级管理员帐号\n\n```\nuse admin\ndb.createUser({ user: \"用户名\", pwd:\"登陆密码\", roles:[{ role: \"userAdminAnyDatabase\", db: \"admin\" }] })\n```\n\n切换到要使用的数据库，如 taodb 数据库，创建这个数据库的管理员帐号\n```\nuse taodb\n```\n```\ndb.createUser({ user: \"用户名\", pwd:\"登陆密码\", roles:[ { role: \"readWrite\", db: \"taodb\" }] //读写权限 })\n```\n重复按两下 control+c ，退出 mongo shell。\n到这里 mongodb 基本已经安装设置完成了。\n\n\n备份与恢复 请看这篇文章：[MongoDB 备份(mongodump)与恢复(mongorestore)](http://www.runoob.com/mongodb/mongodb-mongodump-mongorestore.html)\n安装 node 与 mongodb 也可以参考这篇文章：[CentOs搭建NodeJs服务器—Mongodb安装](https://www.jianshu.com/p/5a104184e010)\n\n\n## 3.3 服务器上开放端口与设置安全组规则\n\n> 如果你只放静态的网页，可以参考这个篇文章 [通过云虚拟主机控制台设置默认首页](https://help.aliyun.com/knowledge_detail/36154.html)\n\n但是我们是要部署后台程序的，所以要看以下的内容：\n\n**安全组规则是什么鬼**\n\n> 授权安全组规则可以允许或者禁止与安全组相关联的 ECS 实例的公网和内网的入方向和出方向的访问。 \n> [阿里云安全组应用案例文档](https://help.aliyun.com/document_detail/25475.html)\n\n> 80 端口是为 HTTP(HyperText Transport Protocol) 即超文本传输协议开放的,浏览器 HTTP 访问 IP 或域名的 80 端口时,可以省略 80 端口号\n\n如果我们没有开放相应的端口，\n\n比如我们的服务要用到 3000 ，就要开放 3000 的端口，不然是访问不了的；其他端口同理。\n\n![配置安全组规则 1](https://upload-images.jianshu.io/upload_images/12890819-94af47ba08cb3959.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n![配置安全组规则 2](https://upload-images.jianshu.io/upload_images/12890819-6f2f85dacf0e1cc8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n![配置安全组规则 3](https://upload-images.jianshu.io/upload_images/12890819-bc43b00a24ba2d3c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n\n端口都配置对了，以为能用公网 IP 进行访问了么 ?  **小兄弟你太天真了 ...**\n![ 太天真了 ](https://upload-images.jianshu.io/upload_images/12890819-2b38d438f4861377.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)\n\n还有 **防火墙** 这一关呢，如果防火墙没有关闭或者相关的端口没有开放，也是不能用公网 IP 进行访问网站内容的。\n\n和安全组端口同理，比如我们的服务要用到的是 3000 端口，就要开放 3000 的端口，不然是访问不了的；其他端口同理。\n\n出于安全考虑还是把防火墙开上，只开放相应的端口最好。\n\n**怎么开放相应的端口 ？** 看下面两篇文章足矣，这里就不展开了。\n\n> [1. 将nodejs项目部署到阿里云ESC服务器,linux系统配置80端口,实现公网IP访问](https://blog.csdn.net/putao2062/article/details/79688020)\n\n> [2. centos出现“FirewallD is not running”怎么办](https://www.cnblogs.com/kccdzz/p/8110143.html)\n\n\n\n## 3.4 用 nginx、apache 或者 tomcat 来提供 HTTP 服务或者设置代理\n\n我是用了 nginx 的，所以这里只介绍 nginx 。\n安装 nginx 请看这两篇文章：\n\n> [1. Centos7安装Nginx实战](https://cloud.tencent.com/developer/news/119838)\n\n> [2. 阿里云Centos7安装Nginx服务器实现反向代理](https://blog.csdn.net/qq_21508727/article/details/80071174)\n\n**开启 ngnx 代理**\n\n- 进入到目录位置\n\n```\ncd /usr/local/nginx\n```\n\n- 在 nginx 目录下有一个 sbin 目录，sbin 目录下有一个 nginx 可执行程序。\n\n```\n./nginx\n```\n\n- 关闭 nginx\n\n```\n./nginx -s stop\n```\n\n- 重启\n\n```\n./nginx -s reload\n```\n基本的使用就是这样子了。\n\n**如下给出我的 nginx 代理的设置：**\n\n我的两个项目是放在 /home/blog/blog-react/build/; 和  /home/blog/blog-react-admin/dist/; 下的，如果你们的路径不是这个，请修改成你们的路径。\n\n```\n#user  nobody;\nworker_processes  1;\n#error_log  logs/error.log;\n#error_log  logs/error.log  notice;\n#error_log  logs/error.log  info;\n#pid        logs/nginx.pid;\n\nevents {\n    worker_connections  1024;\n}\n\nhttp {\n    include       mime.types;\n    default_type  application/octet-stream;\n\n    #log_format  main  '$remote_addr - $remote_user [$time_local] \"$request\" '\n    #                  '$status $body_bytes_sent \"$http_referer\" '\n    #                  '\"$http_user_agent\" \"$http_x_forwarded_for\"';\n\n    #access_log  logs/access.log  main;\n\n    sendfile        on;\n    #tcp_nopush     on;\n\n    #keepalive_timeout  0;\n    keepalive_timeout  65;\n\n    #gzip  on;\n\n    # 如果port_in_redirect为off时，那么始终按照默认的80端口；如果该指令打开，那么将会返回当前正在监听的端口。\n    port_in_redirect off;\n\n    # 前台展示打开的服务代理\n    server {\n        listen       80;\n        server_name  localhost;\n\n        #charset koi8-r;\n\n        #access_log  logs/host.access.log  main;\n        #root /home/blog;\n\n        location  / {\n            root   /home/blog/blog-react/build/;\n            index  index.html;\n            try_files $uri $uri/ @router;\n            autoindex on;\n        }\n\n        location @router{\n            rewrite ^.*$ /index.html last;\n        }\n\n        location /api/ {\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_pass http://47.106.136.114:3000/ ;\n        }\n        gzip on;\n\n        gzip_buffers 32 4k;\n\n        gzip_comp_level 6;\n\n        gzip_min_length 200;\n\n        gzip_types text/css text/xml application/javascript;\n\n        gzip_vary on;\n\n        #error_page  404              /404.html;\n        # redirect server error pages to the static page /50x.html\n        #\n        error_page   500 502 503 504  /50x.html;\n        location = /50x.html {\n            root   html;\n        }\n    }\n\n\n    # HTTPS server\n    # 管理后台打开的服务代理\n    server {\n        listen       4444;\n        server_name  localhost;\n        #   charset koi8-r;\n        #   ssl_certificate      cert.pem;\n        #   ssl_certificate_key  cert.key;\n\n        #   ssl_session_cache    shared:SSL:1m;\n        #    ssl_session_timeout  5m;\n\n        #    ssl_ciphers  HIGH:!aNULL:!MD5;\n        #    ssl_prefer_server_ciphers  on;\n\n        location / {\n            root   /home/blog/blog-react-admin/dist/;\n            index  index.html index.htm;\n            try_files $uri $uri/ @router;\n            autoindex on;\n        }\n        location @router{\n            rewrite ^.*$ /index.html last;\n        }\n\n        location /api/ {\n            proxy_set_header X-Real-IP $remote_addr;\n            proxy_pass http://47.106.136.114:3000/ ;\n        }\n        gzip on;\n\n        gzip_buffers 32 4k;\n\n        gzip_comp_level 6;\n\n        gzip_min_length 200;\n\n        gzip_types text/css text/xml application/javascript;\n\n        gzip_vary on;\n\n        error_page   500 502 503 504  /50x.html;\n    }\n}\n```\n我是开了两个代理的：前台展示打开的服务代理和管理后台打开的服务代理，这个项目是分开端口访问的。\n比如：我的公网 ip 是 47.106.20.666，那么可以通过 http://47.106.20.666 即可访问前台展示，http://47.106.20.666:4444 即可访问管理后台的登录界面。\n\n\n 至于为什么要写这样的配置:\n\n```\ntry_files $uri $uri/ @router;\n\nlocation @router{\n        rewrite ^.*$ /index.html last;\n    }\n```\n\n因为进入到文章详情时或者前端路由变化了，再刷新浏览器，发现浏览器出现 404 。刷新页面时访问的资源在服务端找不到，因为 react-router 设置的路径不是真实存在的路径。\n所以那样设置是为了可以刷新还可以打到对应的路径的。\n\n> 刷新出现 404 问题，可以看下这篇文章 [react,vue等部署单页面项目时,访问刷新出现404问题](https://www.jianshu.com/p/b4f004bb8b66)\n\n## 3.5 上传项目代码，或者用码云、 gihub 来拉取你的代码到服务器上\n\n我是创建了码云的账号来管理项目代码的，因为码云上可以创建免费的私有仓库，我在本地把码上传到 Gitee.com 上，再进入服务器用 git 把代码拉取下来就可以了，非常方便。\n\n具体请看：[码云（Gitee.com）帮助文档 V1.2](http://git.mydoc.io/?t=180676)\n\ngit 的安装请看： [CentOS 7.4 系统安装 git](https://www.cnblogs.com/hglibin/p/8627975.html)\n\n如果不想用 git 进行代码管理，请用其他可以连接服务器上传文件的软件，比如 FileZilla。 \n\n\n## 3.6 启动 express 服务\n\n启动 express 服务，我用了 pm2， 可以永久运行在服务器上，且不会一报错 express 服务就挂了，而且运行中还可以进行其他操作。\n\n安装：\n```\nnpm install -g pm2\n```\n\n切换当前工作目录到 express 应用文件夹下,执行 pm2 命令启动 express 服务：\n\n```\npm2 start ./bin/www\n```\n\n比如我操作项目时的基本操作：\n\n```\ncd /home/blog/blog-node\npm2 start ./bin/www // 开启\npm2 stop ./bin/www // 关闭\npm2 list //查看所用已启动项目：\n```\n\n## 3.7 页面加载优化\n\n再看刚刚的 nginx 的一些配置：\n\n```\nserver {\n        gzip on;\n        gzip_buffers 32 4k;\n        gzip_comp_level 6;\n        gzip_min_length 200;\n        gzip_types text/css text/xml application/javascript;\n        gzip_vary on;\n    }\n```\n\n这个就是利用 ngonx 开启 gzip，亲测开启之后,压缩了接近 2/3 的文件大小，本来要 1M 多的文件，开启压缩之后，变成了 300k 左右。\n\n还有其他的优化请看这篇文章 [React 16 加载性能优化指南](https://blog.csdn.net/xiaoguang44/article/details/80436952)，写的很不错，我的一些优化都是参考了这个篇文章的。\n\n做完一系列的优化处理之后，在网络正常的情况下，页面首屏渲染由本来是接近 5 秒，变成了 3 秒内，首屏渲染之前的 loading 在 1 秒内可见了。\n\n# 4. 项目地址\n\n**本人的个人博客项目地址：**\n> [前台展示: https://github.com/biaochenxuying/blog-react](https://github.com/biaochenxuying/blog-react)\n\n> [管理后台：https://github.com/biaochenxuying/blog-react-admin](https://github.com/biaochenxuying/blog-react-admin)\n\n> [后端：https://github.com/biaochenxuying/blog-node](https://github.com/biaochenxuying/blog-node)\n\n> [blog：https://github.com/biaochenxuying/blog](https://github.com/biaochenxuying/blog)\n\n**本博客系统的系列文章：**\n\n- 1. [react + node + express + ant + mongodb 的简洁兼时尚的博客网站](http://biaochenxuying.cn/articleDetail?article_id=5bf57a8f85e0f13af26e579b)\n- 2. [react + Ant Design + 支持 markdown 的 blog-react 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf6bb5e85e0f13af26e57b7)\n- 3. [基于 node + express + mongodb 的 blog-node 项目文档说明](http://biaochenxuying.cn/articleDetail?article_id=5bf8c57185e0f13af26e7d0d)\n- 4. [服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的](http://biaochenxuying.cn/articleDetail?article_id=5bfa728bb54f044b4f9da240)\n\n# 最后\n\n对 **全栈开发** 有兴趣的朋友，可以扫下方二维码，关注我的公众号，我会不定期更新有价值的内容。\n\n> 微信公众号：**BiaoChenXuYing**\n> 分享 前端、后端开发 等相关的技术文章，热点资源，全栈程序员的成长之路。\n\n关注公众号并回复 **福利** 便免费送你视频资源，绝对干货。\n\n福利详情请点击：  [免费资源分享--Python、Java、Linux、Go、node、vue、react、javaScript](https://mp.weixin.qq.com/s?__biz=MzA4MDU1MDExMg==&mid=2247483711&idx=1&sn=1ffb576159805e92fc57f5f1120fce3a&chksm=9fa3c0b0a8d449a664f36f6fdd017ac7da71b6a71c90261b06b4ea69b42359255f02d0ffe7b3&token=1560489745&lang=zh_CN#rd)\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

        }
    }
    getArticleId = () => {
        return this.props.match.params.articleId
    }
    handleGetDetailByArticleId = () => {
        
    }
    componentWillMount() {
		if (this.props.location.pathname === '/about') {

		} else {
			let article_id = this.getArticleId();
			this.handleGetDetailByArticleId(article_id);
		}
		// marked相关配置
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: true,
			pedantic: false,
			sanitize: true,
			smartLists: true,
			smartypants: false,
			highlight: function(code) {
				return hljs.highlightAuto(code).value;
			},
		});
	}
    render() {
        return (
            <article className="article-detail">
                <div className="article-detail-title">
                    服务器小白的我,是如何将node+mongodb项目部署在服务器上并进行性能优化的
                </div>
                <div className="article-detail-meta clearfix">
                    <dl className="clearfix">
                        <dt className="article-detail-meta_avatar">
                            <Avatar size={48} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"></Avatar>
                        </dt>
                        <dd className="article-detail-meta_author clearfix">
                            <div className="author-article-info">
                                <p className="author-name">Artorias</p>
                                <p className="article-info">2018-11-25 17:59:39 字数 13567 阅读 303 评论 3 喜欢 6</p>
                            </div>
                            <div className="tags">
                                <Icon type="tags" />
                                <div className="tags-name">
                                    <CustomTag>Express</CustomTag>
                                    <CustomTag>Node</CustomTag>
                                </div>
                            </div>
                        </dd>
                    </dl>
                </div>
                <div
                    id="content"
                    className="article-detail"
                    dangerouslySetInnerHTML={{
                        __html: this.state.content ? marked(this.state.content) : null,
                    }}
                >
                </div>
                <div className="like-btn">
                    <Button icon="heart" >喜欢</Button>
                </div>
                {/* <Divider>文章评论</Divider>
                <CommentEditor></CommentEditor>
                <div className="article-comments">
                    <Divider orientation="left">全部评论</Divider>
                    <CommentList></CommentList>
                </div> */}
            </article>
        )
    }
}
