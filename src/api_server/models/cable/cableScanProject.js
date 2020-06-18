module.exports = (sequelize, type) => {
    return sequelize.define('cableScanProject_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanProjectName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
