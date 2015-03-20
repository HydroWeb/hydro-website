/**
 * EmailController
 *
 * @description :: Server-side logic for sending emails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /*
  'new': function(req, res) {
    res.view('index.ejs');
  },
  */

  sendEmail: function(req, res, next) {

    // Retrieve the form data
    console.log('Im here');
    console.log(req.body);
    var userObj = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };

    // create a new email with the form data
    Email.create({firstName: userObj.firstName, lastName: userObj.lastName, email: userObj.email}).exec(function createCB(err,created){
      if(err) return cb(err);
      console.log('Created email');

      // Action to send the user framework access & a confirmation email.
      created.send({
        to: [{
          name:  userObj.firstName + '' + userObj.lastName,
          email: userObj.email
        }],
        subject: 'Framework Access',
        html:
          'Dear' + userObj.firstName + '<br><br>' +
          'Thank you for subscribing.<br><br>' +
          'Below is the link to access our framework, you can download the css and javascript directly from the documentation page. <br><br>' +
          'We hope you enjoy using our completely open-source tools, please HydroUni if you would like to better learn <br>' +
          'the framework, with the opportunity to sell your work on our template store. <br><br>' +
          'Kind Regards, <br>'+
          'The HydroWeb team.',
        text: 'text fallback goes here-- in case some recipients can\'t receive HTML emails'
      }, function optionalCallback (err) {
        if(err) return cb(err);
        Email.isSent = true;
        res.redirect('/thanks');
        next(err);
      });
    });
  }

};
