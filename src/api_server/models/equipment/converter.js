module.exports = (sequelize, type) => {
    return sequelize.define('converter_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        converterModel: {
          type: type.STRING,
        },
        converterType: {
          type: type.STRING,
        },
        converterRange: {
          type: type.STRING
        },
        speed: {
          type: type.STRING
        },
        converterComments: {
          type: type.TEXT
        }

    })
}
