const mysql = require('mysql');
const MYSQL_CONFIG = require('./mysql_config');

const pool = mysql.createPool(MYSQL_CONFIG);

const query = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, val, (err, fields) => {
                    if (err) reject(err)
                    else resolve(fields)
                    connection.release()
                })
            }
        })
    })
}

const insert = (sql, val) => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.beginTransaction(err => {
                    if (err) {
                        resolve('开启事务失败')
                    } else {
                        connection.query(sql, val, (err, fields) => {
                            if (err) {
                                return connection.rollback(() => {
                                    console.log('插入失败，数据回滚')
                                })
                            } else {
                                connection.commit((error) => {
                                    if (error) {
                                        console.log('事务提交失败')
                                    } else {
                                        resolve(fields)
                                    }
                                })
                            }
                            connection.release()//释放连接
                        })
                    }
                })
            }
        })
    })
}


module.exports = {
    query,
    insert
}