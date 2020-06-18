module.exports = (sequelize, type) => {
    return sequelize.define('megataz_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        alias: {
          type: type.STRING,
        },
        comment: {
          type: type.STRING,
        },
        actual:{
          type: type.BOOLEAN
        }
    })
}
