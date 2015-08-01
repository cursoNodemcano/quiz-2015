var models = require ('../models/models.js');

//Autoload - factoriza el codigo si la ruta incluiye quizId
exports.load = function(req, res, next, quizId) {
	console.log('load');

	models.Quiz.findById(quizId).then(function (quiz) {
		if (quiz){
			req.quiz = quiz;
			next();
		}else{
			next(new Error("No existe quizId = " + quizId));
		}
	}).catch(function (error){
		next (error);
	})
}

// GET /quizes
exports.index = function(req, res) {
	var query = {order: "pregunta"};
	if (req.query.search){
		var search ="%"+req.query.search.replace(/\s+/, '%')+"%";
		query.where = ["pregunta like ?", search];
	}
	
	models.Quiz.findAll(query)
		.then(function(quizes){
			res.render('quizes/index', {quizes: quizes});
		})
		.catch(function (error){
			next(error);
		})

};

// GET /quizes/:id
exports.show = function(req, res) {
	console.log('show');
	res.render('quizes/show', {quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
	console.log('answer');
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado });
};



