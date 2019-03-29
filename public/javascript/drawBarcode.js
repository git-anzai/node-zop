const barcode = require('barcode');
const path = require('path');
const drawImg = require('./drawImage')

let outfile = path.join('./public/images', 'zopBarcode.jpg')



let drawBarCode = (...arg) => {
    let [billCode,codeType,params] = arg
    return new Promise((resolve, reject) => {
        try {
            code128 = barcode(codeType,params);
            code128.saveImage(outfile, function (err) {
                if (err) {
                    console.log('err')
                    resolve({status:false,msg:'生成barcode失败'})
                } else {
                    drawImg.drawImg(billCode, resolve)
                }
            });
        }
        catch (err) {
            resolve({status:false,msg:'catch,生成barcode失败'})
        }
    })
}





module.exports = {
    drawBarCode
}