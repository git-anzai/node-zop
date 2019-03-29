const gm = require('gm').subClass({imageMagick: true});

let _addressee = '张三 010-xxxxxxxx'
let _sender = '李四 010-xxxxxxxx'
let _mailAddress = '北京市海淀区'
let _receivAddress = '北京市朝阳区王府井'

let drawImg = (billCode, resolve) => {
    try {
        gm('./public/images/zopTemplate.jpg')
            .font('./public/font/microsoftYaHei_bold.ttf')
            .fontSize('26')
            .drawText(30, 62, billCode)
            .fontSize('20')
            .drawText(50, 258, billCode)
            .draw('image Over 18, 196 260, 40 "./public/images/zopBarcode.jpg"')
            .draw('image Over 142, 322 130, 20 "./public/images/zopBarcode.jpg"')
            .fontSize('10')
            .drawText(166, 354, billCode)
            .drawText(38, 122, `${_addressee}`)
            .drawText(38, 138, `${_receivAddress}`)
            .drawText(38, 168, `${_sender}`)
            .drawText(38, 182, `${_mailAddress}`)
            .drawText(38, 376, `${_addressee}`)
            .drawText(38, 390, `${_receivAddress}`)
            .drawText(38, 420, `${_sender}`)
            .drawText(38, 433, `${_mailAddress}`)
            // .drawText(158,354,'7310  0616  9948  87')
            // .drawText(158,354,'7310  0616  9948  87')
            .write('./public/images/zop4.jpg', function (err) {
                if (!err) {
                    resolve({status:true,msg:'生成图片成功'})
                } else {
                    console.log(err.message || "出错了！");
                    resolve({status:false,msg:'draw图片失败'})
                }
            });
    }
    catch (err) {
        resolve({status:false,msg:'catch,draw图片失败'});
    }
}

module.exports = {
    drawImg
}