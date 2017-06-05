module.exports = function(sequelize, DataTypes) {
    var Genre = sequelize.define("Genre", {
            band_id: {
                type: DataTypes.INTEGER,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },

        {

            classMethods: {
                associate: function(models) {
                    Genre.belongsTo(models.Rock, {
                        foreignKey: "band_id"
                    });
                }
            }
        });
    return Genre;
}
