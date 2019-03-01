// 配置文件
module.exports ={
  ONE:'http://wufazhuce.com/',////ONE的web版网站
  MOJI_HOST:'https://tianqi.moji.com/weather/china/', //中国墨迹天气url
  CITY:'shanghai',//收信者所在城市
  LOCATION:'pudong-new-district',//收信者所在区
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
