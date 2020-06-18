module.exports = (sequelize, type) => {
    return sequelize.define('crosver_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        crosverLocation: {
          type: type.STRING,
          notEmpty: true
        },
        crosverDocks: {
          type: type.TEXT
        },
        crosverComments: {
          type: type.TEXT
        },
        lat: {
          type: type.FLOAT,
        },
        lng: {
          type: type.FLOAT
        }
    })
}
