module.exports = function(sequelize, DataTypes) {
    var Rock = sequelize.define("Rock", {
            band_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            hall_of_fame: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
            
        },

        {
            classMethods: {
                associate: function(models) {
                    Rock.hasOne(models.Genre, {
                        foreignKey: "band_id"
                    });
                }
            }
        });
    return Rock;
}
