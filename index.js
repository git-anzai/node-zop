const {query, insert} = require('./public/database/query')
const getOrder = require('./public/javascript/getOrder');
const drawImg = require('./public/javascript/drawBarcode')
const api = require('./public/utils/api');

const crypto = require('crypto');
const querystring = require('querystring');


let auto = async () => {
    let result = await query('select * from goods', [])
    /*
      let result = await query('insert into goods set ?',{create_time:"2017-05-09 16:39:00",price:5555555.00,inventory:11,category:"",imgs:"",onsale:0,name:'王五'})

      let result = await query('update goods set name = ?  where  id = ?',['無敵强', 41])

      let result = await query("delete from goods where id = 59",[])
    */
    for (let i = 0; i < result.length; i++) {
        const res = await fetch();
        console.log(res)
        if ( !res.status.status || (res.res.status !== undefined && !res.res.status)) {
            auto();
        }
    }
}


let fetch = async () => {
    let company_id = "ea8c719489de4ad0bf475477bad43dc6";
    let key = "submitordertest==";

    let requestBody = {
        data: '{' +
        '   "partner":"test","id":"xfs101100111011","tradeid":"2701843",' +
        '"sender":{"id":"131*****010","name":"XXX","company":"XXXXX有限公司","mobile":"1391***5678","phone":"021-87***321","area":"310118","city":"上海,上海市,青浦区","address":"华新镇华志路XXX号                    ","zipcode":"610012","email":"ll@abc.com","im":"1924656234","starttime":"2013-05-20 12:00:00","endtime":"2013-05-20 15:00:00"},' +
        '"receiver":{"id":"130520142097","name":"XXX","company":"XXXX有限公司","mobile":"136*****321","phone":"010-222***89","area":"501022","city":"四川省,XXX,XXXX","address":"育德路XXX号",                         "zipcode":"610012","email":"yyj@abc.com","im":"yangyijia-abc"},' +
        '"weight":"0.753","size":"12,23,11","quantity":"2","price":"126.50","freight":"10.00","premium":"0.50","pack_charges":"1.00","other_charges":"0.00","order_sum":"0.00",                                         "collect_moneytype":"CNY","collect_sum":"12.00","remark":"请勿摔货","order_type":"1"' +
        '}',
        company_id: company_id,
        msg_type: "submitAgent"
    }

    let query_string = [];
    for (let k in requestBody) {
        query_string.push(k + "=" + requestBody[k]);
    }
    let str_to_digest = query_string.join("&") + key;


    let data_digest = crypto.createHash('md5')
        .update(str_to_digest)
        .digest('base64');

    let query_string_urlencoded = querystring.stringify(requestBody);

    let params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-companyid": company_id,
            "x-datadigest": data_digest
        },
        body: query_string_urlencoded,
    }
    let res = await getOrder.getCodeMsg(api.InsertSubmitagent, params, 'zop');
    if (res.result) {
        const codeType = 'code128';
        const barcodeParams = {data: res.data.billCode, width: 210, height: 40}
        var status = await drawImg.drawBarCode(res.data.billCode, codeType, barcodeParams);
    }
    let result = {
        res: res,
        status: status || false
    }
    return result;
}
auto();
