const schedule = require('node-schedule')
// date 参数

// 规则参数讲解    *代表通配符
//
// *  *  *  *  *  *
// ┬ ┬ ┬ ┬ ┬ ┬
// │ │ │ │ │ │
// │ │ │ │ │ └ day of week (0 - 7) (0 or 7 is Sun)
// │ │ │ │ └───── month (1 - 12)
// │ │ │ └────────── day of month (1 - 31)
// │ │ └─────────────── hour (0 - 23)
// │ └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

// 每分钟的第30秒触发： '30 * * * * *'
//
// 每小时的1分30秒触发 ：'30 1 * * * *'
//
// 每天的凌晨1点1分30秒触发 ：'30 1 1 * * *'
//
// 每月的1日1点1分30秒触发 ：'30 1 1 1 * *'
//
// 每年的6月1日1点1分30秒触发 ：'30 1 1 1 6 *'
//
// 每周1的1点1分30秒触发 ：'30 1 1 * * 1'

function setSchedule(date,callback) {
  schedule.scheduleJob(date, callback)
}
module.exports = {
  setSchedule
}
