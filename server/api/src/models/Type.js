const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{

    sequelize.define('type', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
              not: ["/^[a-zA-Z\s]+$/"]
              // no numeros y caract especiales
            }
        }
    }, {timestamps: false})

}