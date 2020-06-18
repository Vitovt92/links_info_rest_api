module.exports = (sequelize, type) => {
    return sequelize.define('battery_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        Model: {
          type: type.STRING,
        },
        capacity: {
          type: type.STRING,
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
