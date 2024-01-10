const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        not: ["/^[a-zA-Z\s]+$/"]
        // no numeros y caract especiales
      }
    },
    image:{
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notEmpty: true,
        is: {
          // validar url validad jpg.png etc , que no acepte iamgenes con fondo
          args: /^https?:\/\/.*\.(png|jpg|jpeg)$/,
          msg: "El campo debe ser una URL de imagen."
        }
      }
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        isInt: true,
        min: 0,
        max: 250,
        notEmpty: true,
      }
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull:false, 
      validate: {
        isInt: true,
        min: 0,
        max: 200,
        notEmpty: true,
      }
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull:false, 
      validate:{
        isInt: true,
        min: 0,
        max: 250,
        notEmpty: true,
      }
    },
    speed:{
      type: DataTypes.INTEGER,
      validate:{
        isInt: true,
        min: 0,
        max: 200,
        notEmpty: {msg:'El campo no puede estar vacio'}
      }
    },
    height:{
      type: DataTypes.INTEGER,
      validate:{
        isInt: true,
        min: 0,
        max: 200,
        notEmpty: {msg:'El campo no puede estar vacio'}
      }
    },
    weight:{
      type: DataTypes.INTEGER,
      validate:{
        isInt: true,
        min: 0,
        max: 4000,
        notEmpty: {msg:'El campo no puede estar vacio'}
      }
    }
  }, {timestamps: false});
};

/*
ID
Name = nombre string
Image = imagen string png 
Life = vida base_stat interger
Stroke = ataque interger
defense = defenza interger
Speed = velocidad interger
Height = altura interger
Weight = peso interger
*/