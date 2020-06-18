module.exports = (sequelize, type) => {
    return sequelize.define('cableScanTechnicalCondition_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        scanTechnicalConditionsName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
