function getDay(date) {
    var date2 = new Date();
    var date1 = new Date(date);
    var iDays = parseInt(Math.abs(date2.getTime() - date1.getTime()) / 1000 / 60 / 60 / 24);
    return iDays;
}

function formatDate(date) {
    var tempDate = new Date(date);
    var year = tempDate.getFullYear();
    var month = tempDate.getMonth() + 1;
    var day = tempDate.getDate();
    var hour = tempDate.getHours();
    var min = tempDate.getMinutes();
    var second = tempDate.getSeconds();
    var week = tempDate.getDay();
    var str = ''
    if (week === 0) {
        str = '今天是星期日'
    } else if (week === 1) {
        str = "今天是星期一";
    } else if (week === 2) {
        str = "今天是星期二";
    } else if (week === 3) {
        str = "今天是星期三";
    } else if (week === 4) {
        str = "今天是星期四";
    } else if (week === 5) {
        str = "今天是星期五";
    } else if (week === 6) {
        str = "今天是星期六";
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (second < 10) {
        second = "0" + second;
    }
    return year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + second + ' '+ str;
}

module.exports = {
    getDay, formatDate
}
