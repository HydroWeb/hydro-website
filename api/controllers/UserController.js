/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	'new': function(req, res) {
    res.view();
  },

	create: function(req, res, next) {

    var userObj = {
      firstName: req.param('firstName'),
			lastName: req.param('lastName'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation')
    }

    User.create(userObj, function userCreated(err, user) {

      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }

        // If error redirect back to sign-up page
        return res.redirect('/signup');
      }

      // Log user in
      req.session.authenticated = true;
      req.session.User = user;

      // Change status to online
      user.online = true;
      user.save(function(err, user) {
        if (err) return next(err);

      // add the action attribute to the user object for the flash message.
      user.action = " signed-up and logged-in."

        // After creating user
        // redirect to the user
        res.redirect('user/' + user.id);
      });
    });
  },

};
