module.exports = (sequelize, type) => {
    return sequelize.define('cable_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        cablePointNameA: {
          type: type.STRING,
          notEmpty: true
        },
        cablePointNameB: {
          type: type.STRING,
          notEmpty: true
        },
        cableTechnicalConditions: {
          type: type.STRING,
        },
        cableAct: {
          type: type.STRING,
        },
        cableContract: {
          type: type.STRING,
        },
        cableReservation: {
          type: type.STRING,
        },
        cableComments: {
          type: type.TEXT
        },
        folder: {
          type: type.STRING,
        },
        actual:{
          type: type.BOOLEAN,
          defaultValue: 1
        }

    })
}
