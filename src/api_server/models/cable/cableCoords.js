module.exports = (sequelize, type) => {
    return sequelize.define('cableCoords_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        serialNumber: {
          type: type.INTEGER,
        },
        lat: {
          type: type.STRING,
        },
        lng: {
          type: type.STRING,
        },
        comment: {
          type: type.STRING,
        }
    })
}
