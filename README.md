## 微信每日说

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.32.5-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)

wechatBot是基于node与[wechaty](https://github.com/Chatie/wechaty)的微信小情话工具。最初功能只有每日发送天气和一句情话，后来添加了智能机器人聊天功能，自动加群，自动加好友，定时助手功能等。但由于本项目面向小白用户与刚接触node开发的用户，故拆分了两个项目，一个是功能专一面向小白的[《微信每日说》](https://github.com/gengchen528/wechatBot)（也就是本项目），另一个也在我的仓库下[《智能微秘书》](https://github.com/gengchen528/wechat-assistant-pro)面向有较多编程经验的用户。下面主要介绍微信每日说的使用

### 主要功能

* 定时给女朋友发送每日天气提醒，以及每日一句
* 天行机器人自动陪女朋友聊天（需要自己申请[天行机器人](https://www.tianapi.com/signup.html?source=474284281)api，不过目前开源的机器人api都不要抱太大希望，因为很傻的，如果你有发现好的机器人可以来推荐）
* 垃圾分类功能，使用方法：？垃圾名称
* 最近看到python版支持多女朋友配置，我思考了一下，还是不要加了比较好，我们要做一个专一的人，哈哈
* 想要更多群管理，自动加好友功能，并体验在线配置服务，请移步[《智能微秘书》](https://github.com/gengchen528/wechat-assistant-pro)

### 可选聊天机器人

* 天行机器人: 默认设置为天行机器人(智能化程度一般)，目前提供我个人的key免费给大家使用，不过还是建议大家自行注册自己账号 [天行数据官网](https://www.tianapi.com/signup.html?source=474284281)
* 图灵机器人: 目前比较智能的机器人，但是需要注册后进行身份认证，才可调用，且每天只可免费调用100次（收费标准99元/月，每天1000次）[图灵官网](http://www.tuling123.com)
* 天行对接的图灵机器人: 与图灵机器人智能程度相同，通过天行数据平台调用[详情介绍](https://www.tianapi.com/apiview/98)


## 环境

* node.js (version >= 10  建议10.16.0版本)
* Mac/Linux/Windows

## docker部署（新增）

### 自行构建镜像
需要提前安装docker环境，并且配置好`config/index.js`中内容
```shell script
docker build -t leochen/wechat-bot .
docker run leochen/wechat-bot
```

### 拉取已build镜像（推荐）

首先创建一个`config`目录,里面创建`index.js`文件后，把项目配置内容拷贝到`index.js`文件中，修改对应参数
```shell script
docker push aibotk/wechat-bot
docker run -v config目录的绝对路径:/home/app/config leochen/wechat-bot
```

## 安装配置

视频教程： <a href="https://www.bilibili.com/video/av56077628?pop_share=1" target="_blank">《三步教你用Node做一个微信哄女友神器》</a>

### 下载安装node

访问node官网：[http://nodejs.cn/download/](http://nodejs.cn/download/)，下载系统对应版本的node安装包，并执行安装。

> 1、windows下安装node步骤详细参考 [https://www.cnblogs.com/liuqiyun/p/8133904.html](https://www.cnblogs.com/liuqiyun/p/8133904.html)

> 2、Mac下安装node详细步骤参考 [https://blog.csdn.net/qq_32407233/article/details/83758899](https://blog.csdn.net/qq_32407233/article/details/83758899)


> 3、Linux下安装node详细步骤参考 [https://www.cnblogs.com/liuqi/p/6483317.html](https://www.cnblogs.com/liuqi/p/6483317.html)

### 配置npm源

配置npm源为淘宝源（重要，因为需要安装chromium，不配置的话下载会失败或者速度很慢，因为这个玩意140M左右）

npm

    npm config set registry https://registry.npm.taobao.org
    npm config set disturl https://npm.taobao.org/dist
    npm config set puppeteer_download_host https://npm.taobao.org/mirrors

    
### 下载代码

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fcb3ea7ee507?w=1917&h=937&f=png&s=180655)

    git clone git@github.com:gengchen528/wechatBot.git（如果没有安装git，也可直接下载项目zip包）
    cd wechatBot
    npm install
   
### 项目配置

所有配置项均在 config/index.js文件中

  ```  
    // 配置文件
    module.exports = {
        // 每日说配置项（必填项）
        NAME: 'leo助手', //女朋友备注姓名
        NICKNAME: 'leo助手', //女朋友昵称
        MEMORIAL_DAY: '2015/04/18', //你和女朋友的纪念日
        CITY: '上海', //女朋友所在城市（城市名称，不要带“市”）
        SENDDATE: '0 09 14 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
        TXAPIKEY: '', //此处须填写个人申请的天行apikey,请替换成自己的（自行申请天行天气和土味情话的接口） 申请地址https://www.tianapi.com/signup.html?source=474284281
    
        //高级功能配置项（非必填项）
        AUTOREPLY: false, //自动聊天功能 默认关闭 开启设置为: true
        DEFAULTBOT: '0', //设置默认聊天机器人 0 天行机器人 1 图灵机器人 2 天行对接的图灵机器人，需要到天行机器人官网充值（50元/年，每天1000次）
        AUTOREPLYPERSON: ['好友1备注','好友2备注'], //指定多个好友开启机器人聊天功能   指定好友的备注，最好不要带有特殊字符
        TULINGKEY: '图灵机器人apikey',//图灵机器人apikey,需要自己到图灵机器人官网申请，并且需要认证
    
    }
```
### 执行

当以上步骤都完成后，在命令行界面输入 `node index.js`，第一次执行会下载puppeteer，所以会比较慢，稍等一下，出现二维码后即可拿出微信扫描

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa4678361c14?w=969&h=724&f=png&s=51158)

执行成功后可看到

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa9bc1f5c76e?w=977&h=322&f=png&s=25797)

## 效果展示
![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fbf97805f02e?w=959&h=779&f=png&s=73686)
<div>
    <img style="width:43%;display:inline-block;" src="http://image.bloggeng.com/WechatIMG62069.jpeg">
    <img style="width:43%;display:inline-block" src="http://image.bloggeng.com/WechatIMG62085.jpeg">
</div>

<div>
<img style="width:43%;display:inline-block;margin-right:10%" src="https://user-gold-cdn.xitu.io/2019/6/16/16b5fc09ba9648f6?w=396&h=897&f=png&s=72212"alt="">
<img style="width:43%;display:inline-block;" src="https://user-gold-cdn.xitu.io/2019/6/16/16b5fbdd0d8cf81f?w=401&h=592&f=png&s=55280" >
</div>


## 常见问题处理

问题解决基本方案

* 先检查node版本是否大于10
* 确认npm或yarn已经配置好淘宝源  
* 存在package-lock.json文件先删除
* 删除`node_modules`后重新执行`npm install` 或`cnpm install`
* 使用最新版[《智能微秘书》](https://github.com/gengchen528/wechat-assistant-pro)，摆脱环境问题

1. 我的微信号无法登陆

    从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆。 更多内容详见：

    [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)

    [[谣言] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)

    [新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)
2. 类似Failed to download Chromium rxxx的问题
   ` ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.{ Error: read ETIMEDOUT at _errnoException (util.js:1041:11) at TLSWrap.onread (net.js:606:25) code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'read' } ` 

   解决方案：[https://github.com/GoogleChrome/puppeteer/issues/1597](https://github.com/GoogleChrome/puppeteer/issues/1597)

    `npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`

    `sudo npm install puppeteer --unsafe-perm=true --allow-root`

3. 执行npm run start时无法安装puppet-puppeteer&&Chromium
    

    * Centos7下部署出现以下问题
        ![](http://image.bloggeng.com/14481551970095_.pic_hd.jpg)
        
        问题原因:[https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)
        
        解决方案:
        
            #依赖库
            yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
        
            #字体
            yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
    *  ubuntu下，下载puppeteer失败  
        问题原因：[https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
        解决方案：

            sudo apt-get  gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

    *  windows下，下载puppeteer失败
    
       链接：https://pan.baidu.com/s/1YF09nELpO-4KZh3D2nAOhA 
       提取码：0mrz 
       
       把下载的文件放到如下图路径，并解压到当前文件夹中即可
       ![](http://image.bloggeng.com/14241551970542_.pic_hd.jpg)

    *  下载puppeteer失败,Linux和Mac执行以下命令
       `PUPPETEER_DOWNLOAD_HOST = https://npm.taobao.org/mirrors npm install wechaty-puppet-puppeteer`

    *  下载puppeteer失败,Windows执行以下命令

       `SET PUPPETEER_DOWNLOAD_HOST = https://npm.taobao.org/mirrors npm install wechaty-puppet-puppeteer`
4. 如图所示问题解决办法，关闭win/mac防火墙；如果公司网络有限制的话也可能引起无法启动问题
    ![](http://image.bloggeng.com/WechatIMG7619.png)
5. 支持 红包、转账、朋友圈… 吗

   支付相关 - 红包、转账、收款 等都不支持

6. 更多关于wechaty功能相关接口

     [参考wechaty官网文档](https://docs.chatie.io/v/zh/)

7.  也可添加小助手微信后，发送`'加群'`进入微信每日说技术交流群

## 注意

 本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。
 建议使用小号进行测试，有被微信封禁网页端登录权限的风险（客户端不受影响），请确保自愿使用。因为个人使用不当导致网页端登录权限被封禁，均与作者无关，谢谢理解

## 最后

因为给这个微信加了自动加好友和拉群功能，所以有兴趣的小伙伴可以加我的微信小号，加好友后发送`加群`，会自动发送群的二维码，同时此小号有更多高级功能等待你的发现。

![](https://user-gold-cdn.xitu.io/2019/2/28/1693401c6c3e6b02?w=430&h=430&f=png&s=53609)

赶快亲自试一试吧，相信你会挖掘出更多好玩的功能

github:[https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

另外我的公众号已经接入微软小冰，关注后发语音会有小姐姐的声音陪你聊天，也可以和她文字聊天，有兴趣可以试试看，单身的欢迎来撩

![](https://user-gold-cdn.xitu.io/2019/3/1/169381d277ba6401?w=258&h=258&f=png&s=42373)

## 鸣谢

感谢[天行数据](https://www.tianapi.com/)提供，天气，土味情话，智能机器人api等接口

## 捐助
如果您认为这个项目对你有所帮助，是否可以为它捐助一点资金呢？

不管钱多钱少，您的捐助将会激励我持续开发新的功能！🎉

感谢您的支持！

捐助方法如下：


<div style="display: flex;justify-content: flex-start">
<img width="300" height="350" src="http://image.xkboke.com/web-inn/aibotk-weixin.png" />
<img width="300" height="350" src="http://image.xkboke.com/web-inn/aibotk-alipay.png" />
</div>


## 更新日志
2020-04-02
* 添加docker部署支持
* 更新wechaty版本

2019-07-05
* 添加垃圾分类功能，默认开启，使用方法： ？垃圾名称

2019-07-04
* 添加天行数据的图灵机器人接口支持（）

2019-07-02
* 添加机器人多人回复配置项
* 添加图灵机器人与天行机器人可选配置项

2019-06-27
* 更新天气接口使用天行api
* 每日说添加每日情话
* 依赖中直接加入`wechaty-puppet-puppeteer`安装
* `.npmrc`中设置项目npm源为淘宝源
* 添加错误解决方案

2019-06-16
* 更新wechaty版本，更改图灵机器人为天行机器人，简化操作配置，修改说明文档，更适合小白用户

2019-03-06
* 添加图灵机器人配置项，需要先去注册图灵机器人，[网址](http://www.tuling123.com)

2019-03-04
* 进群后播报欢迎词

2019-03-02：
* 添加自动加好友，自动拉群可配置项
* 重启后可维持登录状态
