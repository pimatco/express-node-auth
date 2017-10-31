var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});



/* GET hregister page. */
router.post('/register', function(req, res, next) {
	req.checkBody('username', 'Seu nome de usuário não pode ser em branco').notEmpty();
	req.checkBody('username', 'Nome de usuário deve ser entre 4 e 15 caracteres').len(4,15);
	req.checkBody('email', 'Seu email de usuário não pode ser em branco').isEmail();
	req.checkBody('email', 'Seu email deve ser entre 8-100 caracteres').len(8,100);
	req.checkBody('password', 'Senha deve incluir uma letra minúscula, uma letra maiúscula, um número e um caracter especial.').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, 'i');
	req.checkBody('password', 'Sua senha deve ser entre 8-100 caracteres').len(8,100);
	req.checkBody('passwordMatch', 'Sua senha deve ser entre 8-100 caracteres').len(8,100);
	req.checkBody('passwordMatch', 'Senhas não conferem, anote a senha e tente novamente').equals(req.body.password);
	const errors = req.validationErrors();
	 console.log(req.body.username);
	 console.log(req.body.email);
	 console.log(req.body.password);
	 console.log(req.body.password);

	 if(errors){
		 console.log(`errors: $(JSON.stringify(errors)}`);

		 res.render('register', {
			 title: 'Registration Error',
			 errors: errors
			});

	 }else{
 
		const a = req.body.username;
		const b = req.body.email;
		const c =req.body.password;
		const db=require('../db.js');
		db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [a, b, c],function(error, results, fields){
			console.log("Enviado para o banco" + a + b + c);
			if(error) throw error;
			res.render('register', { title: 'Registration Complete' });
		})

	 }
	
	
});

/* GET home page. */
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
  });

module.exports = router;

//add unique username and email
