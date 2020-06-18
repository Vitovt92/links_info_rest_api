module.exports = (sequelize, type) => {
    return sequelize.define('cable_crosver_connection_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        }

      }
      )
}
