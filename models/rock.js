module.exports = function(sequelize, DataTypes) {
	var Rock = sequelize.define("bandslist", {
		band_name: DataTypes.STRING,
		hall_of_fame: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});
	return Rock;
}

