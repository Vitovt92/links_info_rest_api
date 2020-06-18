module.exports = (sequelize, type) => {
    return sequelize.define('system_power_comment_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userOfComment: {
          type: type.STRING,
          notEmpty: true
        },
        typeOfComment: {
          type: type.INTEGER,
          notEmpty: true,
          defaultValue: 0
        },
        additionalСolumn: {
          type: type.STRING,
          notEmpty: true,
          defaultValue: 0
        },
        textOfComment: {
          type: type.TEXT
        }

    })
}

// typeOfComment = 1 - Блок живлення встановлено на мегатазику
// typeOfComment = 2 - Блок живлення знято з мегатазика
// typeOfComment = 3 - До блока живлення підключили бп-шнічек
// typeOfComment = 4 - Від блока живлення відключили бп-шнічек
// typeOfComment = 4 - Із БП-шніком відбулась проблема. (у майбутньому)