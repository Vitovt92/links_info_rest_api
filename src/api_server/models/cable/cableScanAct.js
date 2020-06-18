module.exports = (sequelize, type) => {
    return sequelize.define('cableScanAct_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanActsName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
