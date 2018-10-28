const prefix = {
    dev: 'http://localhost:8080',
    prod: 'https://www.qsc.zju.edu.cn'
}

import * as storage from './storage'

export const http = ({ method, url, data }) => {
    return new Promise((resolve, reject) => {
        method = method.toUpperCase()
        wx.request({
            url: prefix.dev + url,
            method,
            header: {
                'Authorization': `Bearer ${storage.get("token")}` || ''
            },
            data,
            dataType: 'json',
            success: (res) => {
                if (res.data.code !== 0) {
                    reject(res.data)
                } else {
                    resolve(res.data)  
                }
            },
            fail: (err) => {
                reject({ code: -1, message: "wepy error", data: err })
            }
        })
    })
}