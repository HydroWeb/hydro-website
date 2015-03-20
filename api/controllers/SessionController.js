/**
 * SessionController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

// TODO - fix issue with installing npm bcrypt
//var bcrypt = require('bcrypt');

module.exports = {

	'new': function(req, res) {
		res.view('user/signin');
	},

	create: function(req, res, next) {

		if (!req.param('email') || !req.param('password')) {
			return next({err: ["Password doesn't match password confirmation."]});

			var usernamePasswordRequiredError = [{
				name: 'usernamePasswordRequired',
				message: 'You must enter both a username and password.'
			}]

			req.session.flash = {
				err: usernamePasswordRequiredError
			}

			res.redirect('/signin');
			return;
		}

		// Try to find the user by there email address
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);

			// If no user
			if (!user) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The email address ' + req.param('email') + ' not found.'
				}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/signin');
				return;
			}

      /*
      // TODO - Figure out issue with installing npm bcrypt
			// Compare password with encrypted password of the user
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the database
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid username and password combination.'
					}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/new');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				// Change status to online
				user.online = true;
				user.save(function(err, user) {
					if (err) return next(err);

          // TODO
					// Inform other sockets (e.g. connected sockets that are subscribed) that this user is now logged in
          User.publishUpdate(user.id, {
						loggedIn: true,
						id: user.id,
						name: user.name,
						action: ' has logged in.'
					});

          // TODO
					// If the user is also an admin redirect an admin page? (e.g. /views/user/adminPanel.ejs)
					// This in in conjunction with a config/policies.js file

					if (req.session.User.admin) {
						res.redirect('/user');
						return;
					}


					//Redirect to their profile page (e.g. /views/user/show.ejs)
					res.redirect('/user/show/' + user.id);
				});
			});
      */
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.session.User.id, function foundUser(err, user) {

			var userId = req.session.User.id;

			if (user) {
				// The user is "logging out" (e.g. destroying the session) so change the online attribute to false.
				User.update(userId, {
					online: false
				}, function(err) {
					if (err) return next(err);

          // TODO
					// Inform other sockets (e.g. connected sockets that are subscribed) that the session for this user has ended.
					/*
          User.publishUpdate(userId, {
						loggedIn: false,
						id: userId,
						name: user.name,
						action: ' has logged out.'
					});
          */

					// Wipe out the session (log out)
					req.session.destroy();

					// Redirect the browser to the sign-in screen
					res.redirect('/signin');
				});
			} else {

				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/signin');
			}
		});
	}
};
