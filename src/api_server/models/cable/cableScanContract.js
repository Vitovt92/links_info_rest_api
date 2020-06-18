module.exports = (sequelize, type) => {
    return sequelize.define('cableScanContract_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanContractsName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
