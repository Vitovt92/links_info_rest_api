module.exports = (sequelize, type) => {
    return sequelize.define('cable_comment_table', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        userOfComment: {
          type: type.STRING,
          notEmpty: true
        },
        textOfComment: {
          type: type.TEXT
        }

    })
}
