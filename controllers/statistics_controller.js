var models = require ('../models/models.js');
var Sequelize = require('sequelize');

//statistics - factoriza el codigo si la ruta incluiye quizId
exports.statistics = function(req, res, next) {



	//numero de preguntas
	models.Quiz.findAll({
	   attributes: [[Sequelize.fn('count',Sequelize.col('*')),'cuenta']]
	}).then(function (result) {
		var statistics = {};
		statistics.nquizes = result[0].dataValues.cuenta;
		models.Comment.findAll({
		   attributes: [[Sequelize.fn('count',Sequelize.col('*')),'cuenta']]
		}).then(function (result) {
			statistics.ncomments = result[0].dataValues.cuenta;
			models.Comment.findAll({
			   attributes: [[Sequelize.fn('count',Sequelize.col('*')),'cuenta']]
			}).then(function (result) {
				statistics.ncomments = result[0].dataValues.cuenta;
				models.Quiz.findAll({
					attributes: [[Sequelize.fn('count',Sequelize.col('*')),'cuenta']],
				    include: [{
				        model: models.Comment,
				        where: {
				        	id: {$ne: null}
				        }
				    }]
				}).then(function (result) {
					statistics.nquizWithComments = result[0].dataValues.cuenta;
					console.log(statistics);
					res.render("quizes/statistics",{statistics: statistics});
				}).catch(function (error){
					next (error);
				})
			}).catch(function (error){
				next (error);
			})
		}).catch(function (error){
			next (error);
		})
	}).catch(function (error){
		next (error);
	})

}

