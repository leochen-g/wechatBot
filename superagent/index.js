const superagent = require('./superagent');
const config = require('../config/index');
const cheerio = require('cheerio');
const {machineIdSync} = require('node-machine-id');
const crypto = require('crypto');
let md5 = crypto.createHash('md5');
let uniqueId = md5.update(machineIdSync()).digest('hex'); // 获取机器唯一识别码并MD5，方便机器人上下文关联
const ONE = 'http://wufazhuce.com/'; // ONE的web版网站
const TXHOST = 'http://api.tianapi.com/txapi/'; // 天行host
const TULINGAPI = 'http://www.tuling123.com/openapi/api'; // 图灵1.0接口api

async function getOne() {
    // 获取每日一句
    try {
        let res = await superagent.req({url: ONE, method: 'GET', spider: true});
        let $ = cheerio.load(res);
        let todayOneList = $('#carousel-one .carousel-inner .item');
        let todayOne = $(todayOneList[0])
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '');
        return todayOne;
    } catch (err) {
        console.log('获取每日一句出错', err);
        return err;
    }
}

async function getTXweather() {
    // 获取天行天气
    let url = TXHOST + 'tianqi/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                city: config.CITY
            }
        });

        if (content.code === 200) {
            let todayInfo = content.newslist[0];
            let obj = {
                weatherTips: todayInfo.tips,
                todayWeather: `今天${todayInfo.weather}\n温度:${todayInfo.lowest}/${todayInfo.highest}\n${todayInfo.wind} ${todayInfo.windspeed}\n`
            };
            console.info('获取天行天气成功', obj);
            return obj;
        }
    } catch (err) {
        console.log('请求天气失败', err);
    }
}

// 天行对接的图灵机器人
async function getTXTLReply(word) {
    let url = TXHOST + 'tuling/';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TXAPIKEY,
            question: word,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let response = content.newslist[0].reply;
        console.log('天行对接的图灵机器人:', content);
        return response;
    } else {
        return '我好像迷失在无边的网络中了，接口调用错误：' + content.msg;
    }
}

// 图灵智能聊天机器人
async function getTuLingReply(word) {
    let url = TULINGAPI;
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TULINGKEY,
            info: word
        },
        platform: 'tl'
    });

    if (content.code === 100000) {
        return content.text;
    } else {
        return '出错了：' + content.text;
    }
}

// 天行聊天机器人
async function getReply(word) {
    let url = TXHOST + 'robot/';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TXAPIKEY,
            question: word,
            mode: 1,
            datatype: 0,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let res = content.newslist[0]
        let response = '';
        if (res.datatype === 'text') {
            response = res.reply
        } else if (res.datatype === 'view') {
            response = `虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>《${content.newslist[0].title}》${content.newslist[0].url}`
        } else {
            response = '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题';
        }
        return response;
    } else {
        return '我好像迷失在无边的网络中了，你能找回我么';
    }
}

async function getSweetWord() {
    // 获取土味情话
    let url = TXHOST + 'saylove/';
    try {
        let content = await superagent.req({url, method: 'GET', params: {key: config.TXAPIKEY}});
        if (content.code === 200) {
            let sweet = content.newslist[0].content;
            let str = sweet.replace('\r\n', '<br>');
            return str;
        } else {
            return '你很像一款游戏。我的世界'
        }
    } catch (err) {
        console.log('获取接口失败', err);
    }
}

/**
 * 获取垃圾分类结果
 * @param {String} word 垃圾名称
 */

async function getRubbishType(word) {
    let url = TXHOST + 'lajifenlei/';
    let content = await superagent.req({url, method: 'GET', params: {key: config.TXAPIKEY, word: word}});
    
    if (content.code === 200) {
        let type;
        if (content.newslist[0].type == 0) {
            type = '是可回收垃圾';
        } else if (content.newslist[0].type == 1) {
            type = '是有害垃圾';
        } else if (content.newslist[0].type == 2) {
            type = '是厨余(湿)垃圾';
        } else if (content.newslist[0].type == 3) {
            type = '是其他(干)垃圾';
        }
        let response =
            content.newslist[0].name +
            type +
            '<br>解释：' +
            content.newslist[0].explain +
            '<br>主要包括：' +
            content.newslist[0].contain +
            '<br>投放提示：' +
            content.newslist[0].tip;
        return response;
    } else {
        return '暂时还没找到这个分类信息呢';
    }
}

module.exports = {
    getOne,
    getTXweather,
    getReply,
    getSweetWord,
    getTuLingReply,
    getTXTLReply,
    getRubbishType
};
