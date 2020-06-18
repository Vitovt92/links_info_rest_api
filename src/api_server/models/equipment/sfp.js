module.exports = (sequelize, type) => {
    return sequelize.define('sfp_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        sfpModel: {
          type: type.STRING,
        },
        sfpType: {
          type: type.STRING,
        },
        sfpRange: {
          type: type.STRING
        },
        connectionType: {
          type: type.STRING
        },
        speed: {
          type: type.STRING
        },
        sfpComments: {
          type: type.TEXT
        }

    })
}
