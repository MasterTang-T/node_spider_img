const cheerio = require('cheerio');
const fs = require('fs');
const config = require('./config');
// 找到Img dom

function findImg(dom,callback) {
    let $ = cheerio.load(dom);
    $('img').each((index,dom)=>{
        let imgSrc = $(dom).attr('src');
        callback(imgSrc,index);
    })
}

module.exports = {
    findImg
}