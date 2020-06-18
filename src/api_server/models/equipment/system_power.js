module.exports = (sequelize, type) => {
    return sequelize.define('system_power_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Model: {
          type: type.STRING,
        },
        comment: {
          type: type.STRING,
        }
    })
}
