var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://root:123456@ds025459.mlab.com:25459/meantodos', ['todos']);

// GET TODOS
router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		if(err){
			res.send(err);
		}else{
			res.json(todos);
		}
	});
});


// GET Single todos
router.get('/todo/:id', function(req, res, next){
	db.todos.findOne({
		_id: mongojs.ObjectId(req.params.id)
	},function(err, todo){
		if(err){
			res.send(err);
		}else{
			res.json(todo);
		}
	});
});


// save todos
router.post('/todo/',function(req, res, next){
	var todo = req.body;
	if(!todo.text || !(todo.isCompleted + '')){
		res.status(400);
		res.json({
			"error": "Invalid Data."
		})
	}else{
		db.todos.save(todo, function(err, result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}

		})
	}
});

// update todos
router.put('/todo/:id',function(req, res, next){
	var todo = req.body;
	var updatedObject = {};

	if(todo.isCompleted){
		updatedObject.isCompleted = todo.isCompleted;
	}
	if(todo.text){
		updatedObject.text = todo.text;
	}
	if(!updatedObject){
		res.status(400);
		res.json({
			"error": "Invalid Data."
		})
	}else{
		db.todos.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updatedObject, {}, function(err, result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}

		})
	}

});

// delete todos
router.delete('/todo/:id',function(req, res, next){
	db.todos.remove({
		_id: mongojs.ObjectId(req.params.id)
	}, '', function(err, result){
		if(err){
			res.send(err);
		}else{
			res.json(result);
		}
	})
});


module.exports = router;