// 配置文件
module.exports = {
    // 基础定时发送功能配置项（必填项）
    NAME: 'Leo_chen', //女朋友备注姓名
    NICKNAME: 'Leo_chen', //女朋友昵称
    MEMORIAL_DAY: '2015/04/18', //你和女朋友的纪念日
    CITY: '上海', //女朋友所在城市（城市名称，不要带“市”）
    SENDDATE: '0 06 8 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
    ONE: 'http://wufazhuce.com/', // ONE的web版网站
    SWEETWORD: 'http://api.tianapi.com/txapi/saylove/', // 天行土味情话api接口
    TIANXINGWEATHER: 'http://api.tianapi.com/txapi/tianqi/', // 天行天气api接口
    AIBOTAPI: 'http://api.tianapi.com/txapi/robot/', //天行机器人API 注册地址https://www.tianapi.com/signup.html?source=474284281
    TULINGAPI: 'http://www.tuling123.com/openapi/api', // 图灵1.0接口api
    TXTULINGAPI: 'http://api.tianapi.com/txapi/tuling/', // 天行对接的图灵机器人接口   https://www.tianapi.com/apiview/98图灵机器人介绍

    //高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认关闭 开启设置为: true
    DEFAULTBOT: '0', //设置默认聊天机器人 0 天行机器人 1 图灵机器人 2 天行对接的图灵机器人，需要到天行机器人官网充值（50元/年，每天500次）
    AUTOREPLYPERSON: ['Leo_chen','指定好友昵称2'], //指定多个好友开启机器人聊天功能   指定好友的昵称
    TULINGKEY: '图灵机器人key',//图灵机器人key,需要自己到图灵机器人官网申请，并且需要认证
    APIKEY: '762be789103e1ae7b65573f8d4fc0df6', //天行机器人apikey，这里奉献上我自己的key，还是建议大家自己申请一下（如需使用天行对接的图灵机器人，请申请自己的账号并充值，免费提供的key无图灵机器人功能）
}