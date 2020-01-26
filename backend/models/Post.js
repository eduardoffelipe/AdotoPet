"use strict";

module.exports = function PostModelFactory(sequelize, DataTypes) {
    const Post = sequelize.define("Post", {
        dataPost: DataTypes.DATE,
        descricao: DataTypes.STRING,
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
    }, {
        freezeTableName: true,
        defaultScope: {
            where: {
                ativo: true
            }
        },
    });

    Post.associate = function(models) {
      Post.belongsTo(models.Pet)
    }

    return Post;
};
