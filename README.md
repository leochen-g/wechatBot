## 微信每日说

[![node version](https://img.shields.io/badge/node-%3E%3D10-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D0.27-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)

wechatBot是基于node与[wechaty](https://github.com/Chatie/wechaty)的微信小情话工具。最初功能只有每日发送天气和一句情话，后来添加了智能机器人聊天功能，自动加群，自动加好友，定时助手功能等。但由于本项目面向小白用户与刚接触node开发的用户，故拆分了两个项目，一个是功能专一面向小白的[《微信每日说》](https://github.com/gengchen528/wechatBot)（也就是本项目），另一个也在我的仓库下[《微信个人秘书》](https://github.com/gengchen528/wechat-assistant)面向有较多编程经验的用户。下面主要介绍微信每日说的使用

### 主要功能

* 定时给女朋友发送每日天气提醒，以及每日一句
* 天行机器人自动陪女朋友聊天（需要自己申请[天行机器人](https://www.tianapi.com/signup.html?source=474284281)api，不过目前开源的机器人api都不要抱太大希望，因为很傻的，如果你有发现好的机器人可以来推荐）
* 最近看到python版支持多女朋友配置，我思考了一下，还是不要加了比较好，我们要做一个专一的人，哈哈
* 想要更多功能，请移步[《微信个人秘书》](https://github.com/gengchen528/wechat-assistant)

## 环境

* node.js (version >= 10  建议10.16.0版本)
* Mac/Linux/Windows

## 安装配置

视频教程：录制中...(稍后发布)

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

    git clone git@github.com:gengchen528/wechatBot.git（如果没有安装git，也可直接下载项目zip包）
    cd wechatBot
    npm install
   
### 项目配置

所有配置项均在 config/index.js文件中

  ```  
    // 配置文件
    module.exports = {
        // 基础定时发送功能配置项（必填项）
        NAME: 'A兔子', //女朋友备注姓名
        NICKNAME: '嗯哼', //女朋友昵称
        MEMORIAL_DAY: '2015/04/18', //你和女朋友的纪念日
        CITY: 'shanghai', //女朋友所在城市
        LOCATION: 'pudong-new-district', //女朋友所在区（可以访问墨迹天气网站后，查询区的英文拼写）
        SENDDATE: '0 0 8 * * *', //定时发送时间 每天8点0分0秒发送，规则见 /schedule/index.js
        ONE: 'http://wufazhuce.com/', ////ONE的web版网站
        MOJI_HOST: 'https://tianqi.moji.com/weather/china/', //中国墨迹天气url

        //高级功能配置项（非必填项）
        AUTOREPLY: false, //自动聊天功能 默认关闭
        AIBOTAPI: 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
        APIKEY: '天行机器人apikey', //天行机器人apikey
    }
```
### 执行

当以上步骤都完成后，在命令行界面输入 `node index.js`，第一次执行会下载puppeteer，所以会比较慢，稍等一下，出现二维码后即可拿出微信扫描

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa4678361c14?w=969&h=724&f=png&s=51158)

执行成功后可看到

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa9bc1f5c76e?w=977&h=322&f=png&s=25797)

## 效果展示
![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fbf97805f02e?w=959&h=779&f=png&s=73686)

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fbdd0d8cf81f?w=401&h=592&f=png&s=55280)

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fc09ba9648f6?w=396&h=897&f=png&s=72212)

## 常见问题处理

1. 我的微信号无法登陆

    从2017年6月下旬开始，使用基于web版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆。 更多内容详见：

    [Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录web微信。](https://github.com/Chatie/wechaty/issues/603)

    [[谣言] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)

    [新注册的微信号无法登陆](https://github.com/Chatie/wechaty/issues/872)

2. 执行npm run start时无法安装puppet-puppeteer&&Chromium

    * Centos7下部署出现以下问题
        ![](http://image.bloggeng.com/14481551970095_.pic_hd.jpg)
        
        问题原因:[https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)
        
        解决方案:
        
            #依赖库
            yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y
        
            #字体
            yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
    *  windows下，下载puppeteer失败
    
       链接：https://pan.baidu.com/s/1YF09nELpO-4KZh3D2nAOhA 
       提取码：0mrz 
       
       把下载的文件放到如下图路径，并解压到当前文件夹中即可
       ![](http://image.bloggeng.com/14241551970542_.pic_hd.jpg)
3. 支持 红包、转账、朋友圈… 吗

   支付相关 - 红包、转账、收款 等都不支持

4. 更多关于wechaty功能相关接口

     [参考wechaty官网文档](https://docs.chatie.io/v/zh/)

5. 其他问题解决方案

    * 先检查node版本是否大于10
    * 确认npm或yarn已经配置好淘宝源  
    * 存在package-lock.json文件先删除
    * 删除`node_modules`后重新执行`npm install` 或`cnpm install`
    * 也可添加小助手微信后，发送`'加群'`进入微信每日说技术交流群

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

## 更新日志
2019-06-16
* 更新wechaty版本，更改图灵机器人为天行机器人，简化操作配置，修改说明文档，更适合小白用户

2019-03-06
* 添加图灵机器人配置项，需要先去注册图灵机器人，[网址](http://www.tuling123.com)
2019-03-04
* 进群后播报欢迎词

2019-03-02：
* 添加自动加好友，自动拉群可配置项
* 重启后可维持登录状态
