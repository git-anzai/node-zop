// 查询数据表
const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName}`

// 插入数据
const INSERT_TABLE = (tableName, {key, val}) => `INSERT INTO ${tableName} (${key}) VALUES (${val})`

// 更新数据
const UPDATE_TABLE = (tableName, {primaryKey, primaryVal}, {key, value}) => `UPDATE ${tableName} SET ${key}=${value} WHERE (${primaryKey}=${primaryVal});`

// 删除数据
const DELETE_TABLE = (tableName, {primaryKey, primaryVal}) => `DELETE ${tableName}  WHERE (${primaryKey}=${primaryVal});`
/*
    insertOne:'insert into tb_student (student_id,name,subject,grade,sex) values (?,?,?,?,?)',
    deleteOne:'delete from tb_student where student_id = ?',
    updateOne:'update tb_student set name = ?,subject = ?,grade = ?,sex = ? where student_id = ?',
    selectOne:'select * from tb_student where student_id = ?',
    selectAll:'select * from tb_student',
 */
module.exports = {
    QUERY_TABLE,
    INSERT_TABLE,
    UPDATE_TABLE,
    DELETE_TABLE
}