const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path')
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false});

module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Super secret code is 1231234' });
	});
	
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	app.post('/invite', Authentication.invite);
	app.post('/profile',  Authentication.signupDetail);
	app.get('*', function(req,res) {
		res.sendFile(path.join(__dirname, '../index.html'))
	})
}