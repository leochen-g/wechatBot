## wechatBot
微信每日说，每日自动发送微信消息给爱人

## 项目介绍

### 灵感来源
在掘金看到了一篇[《用Node + EJS写一个爬虫脚本每天定时女朋友发一封暖心邮件》](https://juejin.im/post/5c75fa4af265da2d84109219)后，
在评论区偶然看到一位读者说可不可以用微信实现一下。然后最近刚好在做微信机器人的小项目，那就把这个定时任务放到微信上去做吧，说干就干，撸了一下午终于撸出来了。
## 项目地址
github:[https://github.com/gengchen528/wechatBot](https://github.com/gengchen528/wechatBot)
### 使用库
* [wechaty](https://github.com/Chatie/wechaty) - 微信操作
* [node-schedule](https://github.com/node-schedule/node-schedule) - 定时任务
* [superagent](https://github.com/visionmedia/superagent) - 爬取页面信息
* [cheerio](https://github.com/cheeriojs/cheerio#readme) - 抓取页面
* [qrcode-terminal](https://github.com/gtanner/qrcode-terminal) - 终端显示二维码
### 功能
* 定时给朋友发送每日天气提醒以及每日一句
* 根据关键词自动加好友和自动拉群功能
* 后续继续扩展吧...(你有好的想法也可以提pr)

### 数据来源
* 每日一句和上面的大佬一样也是来自[one](http://wufazhuce.com/)
* 天气信息来自[墨迹天气](https://tianqi.moji.com/weather)

### 定时任务
[node-schedule](https://github.com/node-schedule/node-schedule)非你莫属了，
可以定时每个月、每个礼拜、每天具体什么时候执行什么任务

### 实现效果
由于是微信定时发送消息，较邮件来说，微信无法把图片和文字放在同一消息框中，所以美观度来说可能没有邮件好，不过文字进行排版后还是可以的，由于时间仓促，所以文字比较少，后续会继续增加内容；

![](https://user-gold-cdn.xitu.io/2019/2/28/16933e1817ce89f7?w=1136&h=702&f=png&s=157566)

![](https://user-gold-cdn.xitu.io/2019/2/28/16933e04e55a70c3?w=982&h=432&f=png&s=79574)
   
## 代码说明

### 目录结构

![](https://user-gold-cdn.xitu.io/2019/2/28/16933e8244c7d39a?w=628&h=650&f=png&s=77229)

* config: 存放公共变量和superagent的配置
* schedule: 任务调度的配置
* superagent: 获取每日一句和天气信息
* untils: 抽取的共用方法

### 核心代码

index.js

关于微信的登录，定时任务的创建，发送信息的获取都在这个文件里
    
    /**
     * WechatBot
     *  - https://github.com/gengchen528/wechatBot
     */
    const {Wechaty,Friendship} = require('wechaty')
    const schedule = require('./schedule/index')
    const config = require('./config/index')
    const untils = require('./untils/index')
    const superagent = require('./superagent/index')
    const {FileBox} = require('file-box') //文件读取模块
    //  二维码生成
    function onScan (qrcode, status) {
      require('qrcode-terminal').generate(qrcode)  // 在console端显示二维码
      const qrcodeImageUrl = [
    	'https://api.qrserver.com/v1/create-qr-code/?data=',
    	encodeURIComponent(qrcode),
      ].join('')
      console.log(qrcodeImageUrl)
    }
    
    // 登录
    async function onLogin (user) {
      console.log(`贴心小助理${user}登录了`)
      // 登陆后创建定时任务
      schedule.setSchedule(config.SENDDATE,()=>{
    	console.log('你的贴心小助理开始工作啦！')
        main()
      })
    }
    
    //登出
    function onLogout(user) {
      console.log(`${user} 登出`)
    }
    // 监听对话 根据关键词自动加群
    async function onMessage (msg) {
      const contact = msg.from() // 发消息人
      const content = msg.text() //消息内容
      const room = msg.room() //是否是群消息
      const roomCodeUrl = FileBox.fromUrl(config.ROOMCODEURL) //来自url的文件
      const roomCodeLocal = FileBox.fromFile(config.ROOMLOCALPATH) //添加本地文件
      if (msg.self()) {
    	return
      }
      if(room){ // 如果是群消息
    	const topic = await room.topic()
        console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`)
      }else { // 如果非群消息
    	console.log(`发消息人: ${contact.name()} 消息内容: ${content}`)
    	let addRoomReg = eval(config.ADDROOMWORD)
    	let roomReg = eval(config.ROOMNAME)
    	if(addRoomReg.test(content)&&!room){
    	  let keyRoom = await this.Room.find({topic: roomReg})
    	  if(keyRoom){
    		try{
    		  await contact.say(roomCodeLocal||roomCodeUrl)
    		  await keyRoom.say('微信每日说：欢迎新朋友', contact)
    		}catch (e) {
    		  console.error(e)
    		}
    	  }
    	}else {
    	  await contact.say('你好，不要轻易调戏我，我只会发群二维码，不会聊天的！')
    	  await contact.say('请回复暗号：加群  获取群二维码图片')
    	}
      }
    }
    // 自动加好友功能
    async function onFriendShip(friendship) {
      let logMsg
      try {
    	logMsg = '添加好友' + friendship.contact().name()
    	console.log(logMsg)
    
    	switch (friendship.type()) {
    		/**
    		 *
    		 * 1. New Friend Request
    		 *
    		 * when request is set, we can get verify message from `request.hello`,
    		 * and accept this request by `request.accept()`
    		 */
    	  case Friendship.Type.Receive:
    	    let addFriendReg = eval(config.ADDFRIENDWORD)
    		if (addFriendReg.test(friendship.hello())) {
    		  logMsg = '自动添加好友，因为验证信息中带关键字‘每日说’'
    		  await friendship.accept()
    		} else {
    		  logMsg = '没有通过验证 ' + friendship.hello()
    		}
    		break
    		/**
    		 *
    		 * 2. Friend Ship Confirmed
    		 *
    		 */
    	  case Friendship.Type.Confirm:
    		logMsg = 'friend ship confirmed with ' + friendship.contact().name()
    		break
    	}
      } catch (e) {
    	logMsg = e.message
      }
      console.log(logMsg)
    }
    // 自动发消息功能
    async function main() {
      let  contact = await bot.Contact.find({name:config.NICKNAME}) || await bot.Contact.find({alias:config.NAME}) // 获取你要发送的联系人
      let one = await superagent.getOne() //获取每日一句
      let weather = await superagent.getWeather() //获取天气信息
      let today = await untils.formatDate(new Date())//获取今天的日期
      let memorialDay = untils.getDay(config.MEMORIAL_DAY)//获取纪念日天数
      let str = today + '<br>' + '今天是我们在一起的第' + memorialDay + '天'
    	  + '<br><br>今日天气早知道<br><br>' + weather.weatherTips +'<br><br>' +weather.todayWeather+ '每日一句:<br><br>'+one+'<br><br>'+'------来自最爱你的我'
      await contact.say(str)//发送消息
    }
    
    const bot = new Wechaty()
    
    bot.on('scan',    onScan)
    bot.on('login',   onLogin)
    bot.on('logout',  onLogout)
    bot.on('message', onMessage)
    bot.on('friendship', onFriendShip)
    
    bot.start()
    	.then(() => console.log('开始登陆微信'))
    	.catch(e => console.error(e))



superagent/index.js

    const superagent = require('../config/superagent')
    const config = require('../config/index')
    const cheerio = require('cheerio')
    
    async function getOne() { // 获取每日一句
      let res = await superagent.req(config.ONE,'GET')
      let $ = cheerio.load(res.text)
      let todayOneList = $('#carousel-one .carousel-inner .item')
      let todayOne = $(todayOneList[0]).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
      return todayOne;
    }
    
    async function getWeather() { //获取墨迹天气
      let url = config.MOJI_HOST+config.CITY+'/'+config.LOCATION
      let res = await superagent.req(url,'GET')
      let $ = cheerio.load(res.text)
      let weatherTips = $('.wea_tips em').text()
      const today = $('.forecast .days').first().find('li');
      let todayInfo = {
    	  Day:$(today[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
    	  WeatherText:$(today[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
    	  Temp:$(today[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
    	  Wind:$(today[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ""),
    	  WindLevel:$(today[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ""),
    	  PollutionLevel:$(today[4]).find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
      }
      let obj = {
    	weatherTips:weatherTips,
    	todayWeather:todayInfo.Day + ':' + todayInfo.WeatherText + '<br>' + '温度:' + todayInfo.Temp +  '<br>'
    		+ todayInfo.Wind + todayInfo.WindLevel + '<br>' + '空气:' + todayInfo.PollutionLevel + '<br>'
      }
      return  obj
    }
    module.exports ={
      getOne,getWeather
    }
 
    
## 项目运行

由于需要安装chromium, 所以要先配置一下镜像

npm

    npm config set registry https://registry.npmmirror.com
    npm config set disturl https://npmmirror.com/dist
    npm config set puppeteer_download_host https://npmmirror.com/mirrors
yarn

    yarn config set registry https://registry.npmmirror.com
    yarn config set disturl https://npmmirror.com/dist
    yarn config set puppeteer_download_host https://npmmirror.com/mirrors
然后进行项目安装

    git clone git@github.com:gengchen528/wechatBot.git
    cd wechatBot
    npm install 或 cnpm install
   
参数配置

wechatBot/config/index.js

    // 配置文件
    module.exports ={
      ONE:'http://wufazhuce.com/',////ONE的web版网站
      MOJI_HOST:'https://tianqi.moji.com/weather/china/', //中国墨迹天气url
      CITY:'shanghai',//收信者所在城市
      LOCATION:'pudong-new-district',//收信者所在区 （可以访问墨迹天气网站后，查询区的英文拼写）
      MEMORIAL_DAY:'2015/04/18', //你和收信者的纪念日
      NAME:'Leo_chen',//备注姓名
      NICKNAME:'Leo_chen', //昵称
      SENDDATE:'30 15 8 * * *',//定时发送时间 每天8点15分30秒发送，规则见 /schedule/index.js
      ROOMNAME:'/^微信每日说/i', //群名(请只修改中文，不要删除符号，这是正则)
      ADDFRIENDWORD:'/微信每日说/i',//自动加好友触发的关键词(请只修改中文，不要删除符号，这是正则)
      ADDROOMWORD:'/加群/',//自动发送群图片触发关键词(请只修改中文，不要删除符号，这是正则)
      ROOMCODEURL:'http://image.bloggeng.com/qun.png',//群二维码url链接(与本地群二维码路径选填一个)
      ROOMLOCALPATH:'./static/qun.png',//本地群二维码图片路径（与群url选填一个）
    }

开始运行

    npm run start
    然后掏出你的手机，最好使用小号，扫描控制台的二维码即可

## 待解决问题

* 由于微信登录和邮件登录不同，所以无法使用进程守护工具，目前没有测试是否能够长时间登录
* 因为node的原因，如果发生错误，可能会导致任务无法进行，需要手动重启并登录
* 最好能够使用小号登录，如果是常用微信登录，在电脑客户端登陆后可能会wechaty挤掉
* 墨迹天气页面在获取的时候可能会存在延时，有时可能获取不到

## 后续功能

* 为了防止占用你的微信号，你和你的爱人添加我的微信后。你发送指定内容，我将会每天帮你发送消息
* 还有在思考中...（你有好的想法也可以提出来）

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
