module.exports = (sequelize, type) => {
    return sequelize.define('system_power_megataz_connection_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        left_right: {
          type: type.TEXT
        },
        connection_comment: {
          type: type.TEXT
        }
      }
    )
}
