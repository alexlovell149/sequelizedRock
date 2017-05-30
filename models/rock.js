module.exports = function(sequelize, DataTypes) {
	var Rock = sequelize.define("bands", {
		band_name: DataTypes.STRING,
		hall_of_fame: DataTypes.BOOLEAN,
		createdAt: DataTypes.DATE
	});
	return Rock;
}

