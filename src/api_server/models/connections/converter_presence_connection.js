module.exports = (sequelize, type) => {
    return sequelize.define('converter_presence_connection_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        connection_comment: {
          type: type.TEXT
        }
      }
    )
}
