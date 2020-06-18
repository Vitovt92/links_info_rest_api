module.exports = (sequelize, type) => {
    return sequelize.define('presence_Photo', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        photoName: {
          type: type.STRING,
          notEmpty: true
        }

    })
}
