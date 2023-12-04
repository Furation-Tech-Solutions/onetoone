module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        sender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiver: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return Message;
};