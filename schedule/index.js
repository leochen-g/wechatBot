const schedule = require('node-schedule')
// date 参数

// 其他规则见 https://www.npmjs.com/package/node-schedule
// 规则参数讲解, 规则类似 Linux 下的 crontab ('*'代表通配符) 
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ |
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 1. 按固定时间触发
//
// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

// 2. 按时间差触发 (日/月/周同理)
//
// 每30分钟触发一次: '0 */30 * * * *'
//
// 每6小时触发一次: '0 0 */6 * * *'

function setSchedule(date, callback) {
    schedule.scheduleJob({tz: 'Asia/Shanghai', rule: date}, callback)
}

module.exports = {
    setSchedule
}
