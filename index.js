const http = require('http');
const fs = require('fs');
const request = require('request');
const path = require('path');
const config = require('./config');
const analyze = require('./analyze');

/***
 * 
 * 开始网络请求
 */
function start() {
    request(config.url, (err, res, body) => {
        console.log('start spider');
        if (!err && res) {
            console.log('beginning');
            analyze.findImg(body, saveImgFile);
        }
    })
}

// 保存文件
function saveImgFile(src, index) {
    let ext = src.split('.').pop();
    let imgName = src.split('.')[0].split('/').pop();
    src = config.url + src;//具体项目具体拼接
    http.get(src, (res) => {
        let imgData = "";
        res.setEncoding("binary");
        res.on("data", function (chunk) {
            imgData += chunk;
        });
        res.on("end", function () {
            if (imgData) {
                let filePath = config.filePath +'/'+ imgName +'.'+ext;
                fs.writeFile(filePath, imgData, "binary", function (err) {
                    if (err) {
                        console.log("down fail");
                    }
                    console.log("down success");
                }); 
            } else {
                console.log('下载失败！,图片路径不存在！');
            }
        });
    })
}
start();