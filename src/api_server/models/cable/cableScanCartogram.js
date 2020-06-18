module.exports = (sequelize, type) => {
    return sequelize.define('cableScanCartogram_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanCartogramName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
