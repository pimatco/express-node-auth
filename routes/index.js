var express = require('express');
var router = express.Router();
var expressValidator = require('express-validator');
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', function(req,res){
	console.log(req.user);
	console.log(req.isAuthenticated());
	console.log("test");
	res.render('home', {title:'Home'});
});

/* GET home page. */
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Registration' });
});

router.get('/profile', authenticationMiddleware(), function (req, res) {

	res.render('profile', {title: "Profile"});
	
});


router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Login' });
  });

/* GET hregister page. */
router.post('/register', function(req, res, next) {
	req.checkBody('username', 'Seu nome de usuário não pode ser em branco').notEmpty();
	req.checkBody('username', 'Nome de usuário deve ser entre 4 e 15 caracteres').len(4,15);
	req.checkBody('email', 'Seu email de usuário é inválido').isEmail();
	req.checkBody('email', 'Seu email deve ser entre 8-100 caracteres').len(8,100);
	//req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	req.checkBody('password', 'Sua senha deve ter entre 8-100 caracteres').len(8,100);
	req.checkBody('passwordMatch', 'Sua senha deve ter entre 8-100 caracteres').len(8,100);
	req.checkBody('passwordMatch', 'Senhas não conferem, anote a senha e tente novamente').equals(req.body.password);
	const errors = req.validationErrors();
	 console.log(req.body.username);
	 console.log(req.body.email);
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
		const c = req.body.password;
		const db=require('../db.js');
		bcrypt.hash(c, saltRounds, function(err, h) {
			db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [a, b, h],function(error, results, fields){
				console.log("Enviado para o banco" + a + b + c);
				if(error) throw error;
				db.query('SELECT LAST_INSERT_ID() as user_id', function (error, results, fields){
					const user_id = results[0];
					if(error) throw error;
					req.login(user_id, function(err){
						res.redirect('/');
					});
				});	
			})
		  });
	 }
});

passport.serializeUser(function(user_id, done) {	
	done(null, user_id);
  });
  
passport.deserializeUser(function(user_id, done) {
	  done(null, user_id);
  });

	function authenticationMiddleware () {  
		return (req, res, next) => {
			console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
	
				if (req.isAuthenticated()) return next();
				res.redirect('/login')
		}
	}

module.exports = router;

//add unique username and email to database
