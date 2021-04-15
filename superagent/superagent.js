const superagent = require('superagent')

/**
 *
 * @param url 请求地址
 * @param method 请求方法
 * @param params 请求参数
 * @param data 请求body
 * @param cookies cookies
 * @param spider 是否需要爬取数据
 * @param platform 请求哪个平台 tx 天行数据  tl 图灵机器人
 * @returns {Promise}
 */
function req({url, method, params, data, cookies, spider = false, platform = 'tx'}) {
    return new Promise(function (resolve, reject) {
        superagent(method, url)
            .query(params)
            .send(data)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .end(function (err, response) {
                if (err) {
                    console.log('请求出错', err)
                    reject(err)
                }
                if (spider) { // 如果是爬取内容，直接返回页面html
                    resolve(response.text)
                } else { // 如果是非爬虫，返回格式化后的内容
                    const res = JSON.parse(response.text);
                    if (res.code !== 200 && platform === 'tx' || res.code !== 100000 && platform === 'tl') {
                        console.error('接口请求失败', res.msg || res.text)
                    }
                    resolve(res)
                }
            })
    })
}

module.exports = {
    req
}
