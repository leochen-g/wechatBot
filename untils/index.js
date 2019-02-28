function getDay(date) {
  var date2 = new Date();
  var date1 = new Date(date);
  var iDays = parseInt(Math.abs(date2.getTime()- date1.getTime()) /1000/60/60/24);
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
  if (hour < 10) {
	hour = "0" + hour;
  }
  if (min < 10) {
	min = "0" + min;
  }
  if (second < 10) {
	second = "0" + second;
  }
  return year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + second;
}
module.exports = {
  getDay,formatDate
}
