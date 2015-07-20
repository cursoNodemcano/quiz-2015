var path = require('path');

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite:
var sequelize = new Sequelize(null,null,null,
	{dialect: "sqlite", storage: "quiz.sqlite"}
);

//importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz; //exportar la definicion de la tabla Quiz

//crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
	//then(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().then(function(count){
		if (count === 0) {
			Quiz.create({
				pregunta: 'Capital de Italia',
				respuesta: 'Roma'
			}).then(function(){
				console.log('Base de datos inicializada')
			})
		}
	})

});
