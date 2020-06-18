module.exports = (sequelize, type) => {
  return sequelize.define('system_power_littleSp_connection_table', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    server_alias: {
      type: type.TEXT
    },
    connection_comment: {
      type: type.TEXT
    },
    actual: {
      type: type.BOOLEAN,
      defaultValue: 1
    }
  }
  )
}
