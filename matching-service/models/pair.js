module.exports = (sequelize, DataTypes) => {
    const Pair = sequelize.define('Pair', {
        username1: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        complexity: {
            type: DataTypes.STRING,
            allowNull: false,
        }/* ,
        question: {
            type: DataTypes.STRING,
            allowNull: true
        } */
    }, {
        tableName: 'pairs',
        timestamps: false, // If you don't want Sequelize to manage createdAt and updatedAt columns
    })
    return Pair
}