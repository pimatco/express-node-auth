var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

/* GET hregister page. */
router.post('/register', function(req, res, next) {


	console.log(req.body.username);
	 console.log(req.body.email);
	 console.log(req.body.password);
	 console.log(req.body.password);

	 
	 
	const a = req.body.username;
	const b = req.body.email;
	const c =req.body.password;
	const db=require('../db.js');
	db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [a, b, c],function(error, results, fields){
		console.log("Enviado para o banco" + a + b + c);
		if(error) throw error;
		res.render('register', { title: 'Registration Complete' });
	})
	
	
});

module.exports = router;
