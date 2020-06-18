module.exports = function(sequelize, type) {
    return sequelize.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: type.INTEGER
        },
        username: {
            type: type.STRING,
            allowNull: false,

        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        last_login: {
            type: type.DATE
        },
        status: {
            type: type.ENUM('active', 'inactive'),
            defaultValue: 'active'
        }
    });
}
