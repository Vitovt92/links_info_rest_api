module.exports = (sequelize, type) => {
    return sequelize.define('cableScanReservation_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
