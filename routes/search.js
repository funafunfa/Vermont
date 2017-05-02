var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var Auth0Strategy = require('passport-auth0');
var path    = require("path");


router.post('/', ensureLoggedIn, function(req, res, next) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : '193.151.106.187',
        user     : 'auth',
        password : 'auth',
        database : 'auth'
    });

    connection.connect();
    var self_id;

    connection.query('Select * from users where auth_id = ?', req.user.id.toString(), function (error, results, fields) {
        self_id = results[0].id;

    });
    connection.query('Select * from users where nickname = ?',req.body.name.toString() , function (error, results, fields) {
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)if (error) throw error;
        console.log('The solution is: ', results);

        res.render('all_users.ejs', { user: results, id:self_id});
        // res.send(results);
    });


    connection.end();

    // res.render('all_users.ejs');
});

router.post('/single', ensureLoggedIn, function(req, res, next) {
    var name = req.body.name;
    res.redirect('/main/user/' + name);

});

module.exports = router;





// var rp = require('request-promise');
//
// var options = { method: 'POST',
//     url: 'https://dcamozlo.eu.auth0.com/oauth/token',
//     headers: { 'content-type': 'application/json' },
//     body: '{"client_id":"RBwGwNasPEQEHjSsTsh5XwPMU5YdKDRA","client_secret":"OQa3jWtDlDoeeZRgM2OlgfZ8kfYsX3hJQ_SWs0A9lqUku-Jnk7LUp9dPJxWIojNa","audience":"https://dcamozlo.eu.auth0.com/api/v2/","grant_type":"client_credentials"}' };
//
//
//
// function find_a_person() {
//     return rp(options)
//         .then(function(response) {
//             return JSON.parse(response)['access_token'];
//         });
// }
//
// find_a_person().then(function (token) {
//     var options1 = {
//         method: 'GET',
//         // url: 'https://dcamozlo.eu.auth0.com/api/v2/users/' + name,
//         url: 'https://dcamozlo.eu.auth0.com/api/v2/users/' + name,
//         headers: { authorization: 'Bearer ' + token} };
//
//     rp(options1)
//         .then(function (parsedBody) {
//             res.render('user_page.ejs', { user: JSON.parse(parsedBody)});
//             // console.log(JSON.parse(parsedBody));
//             // res.send(JSON.parse(parsedBody));
//         })
//         .catch(function (err) {
//             res.send(err.toString());
//         });
//
// });