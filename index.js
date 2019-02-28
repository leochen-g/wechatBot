/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const {Wechaty,Friendship} = require('wechaty')
const schedule = require('./schedule/index')
const config = require('./config/index')
const untils = require('./untils/index')
const superagent = require('./superagent/index')
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
// 自动加群功能
async function onMessage (msg) {
  const contact = msg.from() // 发消息人
  const content = msg.text() //消息内容
  const room = msg.room() //是否是群消息
  if(room){
    console.log(`群名: ${room.topic()} 发消息人: ${contact.name()} 内容: ${content}`)
  }else {
	console.log(`发消息人: ${contact.name()} 消息内容: ${content}`)
  }
  if (msg.self()) {
	return
  }
  if(/微信每日说|每日说|微信机器人/.test(content)){
	let keyRoom = await this.Room.find({topic: /^微信每日说/i})
	if(keyRoom){
	  try{
		await keyRoom.add(contact)
		await keyRoom.say('微信每日说：欢迎新朋友 ', contact)
	  }catch (e) {
		console.error(e)
	  }

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
		if (/微信每日说|微信机器人|微信|每日说/i.test(friendship.hello())) {
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
