const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('User', {
        email:{
            type: DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
            isEmail:true
        },
        user:{
            type: DataTypes.STRING,
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        }
    }, {timestamps: false})
}