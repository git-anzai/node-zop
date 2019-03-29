const fetch = require('node-fetch');

let getCodeMsg = (...arg) => {
    let [api,params,type] = arg;
    return new Promise((resolve, reject) => {
        fetch(api,params).then(response => {
            selectType[type](response,resolve)
        })
    })
}
let selectType = {
    'zop':(response,resolve) => {
        if (response.ok) {
            response.json().then(data => {
                resolve(data);
            })
        }
    }
}
module.exports = {
    getCodeMsg
}