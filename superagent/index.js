const superagent = require('../config/superagent')
const config = require('../config/index')
const cheerio = require('cheerio')

async function getOne() { // 获取每日一句
    let res = await superagent.req(config.ONE, 'GET')
    let $ = cheerio.load(res.text)
    let todayOneList = $('#carousel-one .carousel-inner .item')
    let todayOne = $(todayOneList[0]).find('.fp-one-cita').text().replace(/(^\s*)|(\s*$)/g, "")
    return todayOne;
}

async function getWeather() { //获取墨迹天气
    let url = config.MOJI_HOST + config.CITY + '/' + config.LOCATION
    let res = await superagent.req(url, 'GET')
    let $ = cheerio.load(res.text)
    let weatherTips = $('.wea_tips em').text()
    const today = $('.forecast .days').first().find('li');
    let todayInfo = {
        Day: $(today[0]).text().replace(/(^\s*)|(\s*$)/g, ""),
        WeatherText: $(today[1]).text().replace(/(^\s*)|(\s*$)/g, ""),
        Temp: $(today[2]).text().replace(/(^\s*)|(\s*$)/g, ""),
        Wind: $(today[3]).find('em').text().replace(/(^\s*)|(\s*$)/g, ""),
        WindLevel: $(today[3]).find('b').text().replace(/(^\s*)|(\s*$)/g, ""),
        PollutionLevel: $(today[4]).find('strong').text().replace(/(^\s*)|(\s*$)/g, "")
    }
    let obj = {
        weatherTips: weatherTips,
        todayWeather: todayInfo.Day + ':' + todayInfo.WeatherText + '<br>' + '温度:' + todayInfo.Temp + '<br>' +
            todayInfo.Wind + todayInfo.WindLevel + '<br>' + '空气:' + todayInfo.PollutionLevel + '<br>'
    }
    return obj
}

async function getReply(word) { // 天行聊天机器人
    let url = config.AIBOTAPI
    let res = await superagent.req(url, 'GET', { key: config.APIKEY, question: word, })
    let content = JSON.parse(res.text)
    if (content.code === 200) {
        console.log(content)
        return content.newslist[0].reply
    } else {
        return '我好像迷失在无边的网络中了，你能找回我么'
    }
}
module.exports = {
    getOne,
    getWeather,
    getReply
}