module.exports = (sequelize, type) => {
    return sequelize.define('presence_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        presenceLocation: {
          type: type.STRING,
          notEmpty: true
        },
        presenceComments: {
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
