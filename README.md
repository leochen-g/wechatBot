## 微信每日说

### 详细介绍 
参见[微信每日说，每日自动发暖心话给男（女）朋友](detail.md)

### 主要功能

* 定时给朋友发送每日天气提醒以及每日一句
* 根据关键词自动加好友
* 根据关键词自动拉群功能(需要群二维码图片，群人数超过100人，只能手动邀请)
* 图灵机器人自动聊天（需要自己申请图灵api）
* 还在不断增加中..

## 环境

* node.js (version >= 10  作者使用node 10.15.1)
* Mac/Linux/Windows

## 安装配置

### 配置源

npm或yarn配置淘宝源（重要，因为需要安装chromium，不配置的话下载会失败或者速度很慢，因为这个玩意140M左右）

npm

    npm config set registry https://registry.npm.taobao.org
    npm config set disturl https://npm.taobao.org/dist
    npm config set puppeteer_download_host https://npm.taobao.org/mirrors
yarn

    yarn config set registry https://registry.npm.taobao.org
    yarn config set disturl https://npm.taobao.org/dist
    yarn config set puppeteer_download_host https://npm.taobao.org/mirrors
    
### 安装
    git clone git@github.com:gengchen528/wechatBot.git
    cd wechatBot
    npm install
    npm run start
    
## 项目相关配置
    config/index.js
    
    // 配置文件
    module.exports ={
      AUTOADDFRIEND:false,//自动加好友功能  默认关闭
      AUTOADDROOM:false,//自动拉群功能 默认关闭
      AUTOREPLY:false,//自动聊天功能 默认关闭
      ONE:'http://wufazhuce.com/',////ONE的web版网站
      MOJI_HOST:'https://tianqi.moji.com/weather/china/', //中国墨迹天气url
      CITY:'shanghai',//收信者所在城市
      LOCATION:'pudong-new-district',//收信者所在区 （可以访问墨迹天气网站后，查询区的英文拼写）
      AIBOTAPI:'http://www.tuling123.com/openapi/api',//图灵机器人API 注册地址http://www.turingapi.com/
      APIKEY:'你的图灵机器人apikey',//图灵机器人apikey
      MEMORIAL_DAY:'2015/04/18', //你和收信者的纪念日
      NAME:'A兔子',//备注姓名
      NICKNAME:'嗯哼', //昵称
      SENDDATE:'0 0 8 * * *',//定时发送时间 每天8点15分30秒发送，规则见 /schedule/index.js
      ROOMNAME:'/^你的群名/i', //群名(请只修改中文，不要删除符号，这是正则)
      ADDFRIENDWORD:'/你要触发的关键词/i',//自动加好友触发的关键词(请只修改中文，不要删除符号，这是正则)
      ADDROOMWORD:'/加群/',//自动发送群图片触发关键词(请只修改中文，不要删除符号，这是正则)
      ROOMCODEURL:'http://image.bloggeng.com/qun.png',//群二维码url链接(与本地群二维码路径选填一个)
      ROOMLOCALPATH:'./static/qun.png',//本地群二维码图片路径（与群url选填一个）
    }

   
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

## 注意

 本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。
 建议使用小号进行测试，有被微信封禁网页端登录权限的风险（客户端不受影响），请确保自愿使用。因为个人使用不当导致网页端登录权限被封禁，均与作者无关，谢谢理解

## 最后

因为给这个微信加了自动加好友和拉群功能，所以有兴趣的小伙伴可以加我的微信进行测试，记得在加好友的时候带上暗号：`微信每日说`，加好友后发送`加群`，会自动发送群的二维码；

**注意** 加好友请在验证中填写 `微信每日说`  才可以自动加好友

![](https://user-gold-cdn.xitu.io/2019/2/28/1693401c6c3e6b02?w=430&h=430&f=png&s=53609)

赶快亲自试一试吧，相信你会挖掘出更多好玩的功能

github:[https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)

另外我的公众号已经接入微软小冰，关注后发语音会有小姐姐的声音陪你聊天，也可以和她文字聊天，有兴趣可以试试看，单身的欢迎来撩

![](https://user-gold-cdn.xitu.io/2019/3/1/169381d277ba6401?w=258&h=258&f=png&s=42373)

## 更新日志

2019-03-06
* 添加图灵机器人配置项，需要先去注册图灵机器人，[网址](http://www.tuling123.com)
2019-03-04
* 进群后播报欢迎词

2019-03-02：
* 添加自动加好友，自动拉群可配置项
* 重启后可维持登录状态
