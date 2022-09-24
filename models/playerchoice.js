"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PlayerChoice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Room);
        }
    }
    PlayerChoice.init(
        {
            RoomId: DataTypes.INTEGER,
            round: DataTypes.INTEGER,
            player1: DataTypes.STRING,
            player2: DataTypes.STRING,
            winner: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "PlayerChoice",
        }
    );
    return PlayerChoice;
};
