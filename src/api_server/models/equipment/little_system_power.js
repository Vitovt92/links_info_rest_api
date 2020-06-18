module.exports = (sequelize, type) => {
    return sequelize.define('little_system_power_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        comment: {
          type: type.STRING,
        },
        actual:{
          type: type.BOOLEAN,
          defaultValue: 1
        }
    })
}
