var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var Auth0Strategy = require('passport-auth0');
var path    = require("path");
var NULL = require("mysql/lib/protocol/constants/types.js").NULL;


  router.get('/', ensureLoggedIn, function(req, res, next) {
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : '193.151.106.187',
          user     : 'auth',
          password : 'auth',
          database : 'auth'
      });

      connection.connect();

      connection.query('Select * from users where auth_id = ?', req.user.id.toString(), function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)if (error) throw error;

          if (!results[0]){
              res.redirect('/main/info');
              console.log('vse');
          }else{
              var res_id = results[0];
              // res.render('main.ejs', { user: results});
              connection.query('Select * from messages LIMIT 10', function (error, results, fields) {
                  // error will be an Error if one occurred during the query
                  // results will contain the results of the query
                  // fields will contain information about the returned results fields (if any)if (error) throw error;

                  // for(var i = 0; i <= results.length-1; i++){
                  //     // console.log(i);
                  //     (function(e){
                  //         connection.query('Select id, picture, nickname from users where id = ?', results[e].user_id.toString(), function (error, results_new, fields) {
                  //         // error will be an Error if one occurred during the query
                  //         // results will contain the results of the query
                  //         // fields will contain information about the returned results fields (if any)if (error) throw error;
                  //
                  //         // console.log(e);
                  //         // console.log('results_new[0]: ' + results_new[0].id);
                  //         results[e].picture = results_new[0].picture;
                  //         results[e].nickname = results_new[0].nickname;
                  //         console.log(results[e]);
                  //         // res.send(results[e]);
                  //         // res.render('main.ejs', { message: results});
                  //     });})(i);}

                  // console.log(results);
                  res.render('main.ejs', { message: results, id:res_id});
                  connection.end();
              });
          }


      });

  });

  // router.get('/user_page', ensureLoggedIn, function(req, res, next) {
  //     var mysql      = require('mysql');
  //     var connection = mysql.createConnection({
  //         host     : '193.151.106.187',
  //         user     : 'auth',
  //         password : 'auth',
  //         database : 'auth'
  //     });
  //
  //     connection.connect();
  //
  //     connection.query('Select * from users where auth_id = ?',req.user.id.toString() , function (error, results, fields) {
  //         // error will be an Error if one occurred during the query
  //         // results will contain the results of the query
  //         // fields will contain information about the returned results fields (if any)if (error) throw error;
  //
  //         if (error){
  //             res.redirect('/main/user_page');
  //             console.log(error.code);
  //         }
  //
  //         if (!results[0]){
  //             res.redirect('/main/info');
  //             console.log('vse');
  //         }
  //         console.log('The solution: ', results);
  //
  //
  //         res.render('mine_page.ejs', { user_old: req.user, user: results[0]});
  //     });
  //
  //
  //     connection.end();
  //   //
  // });

  router.get('/test', ensureLoggedIn, function(req, res, next) {
    res.render('test.ejs', { user: req.user});
  });

  router.get('/info', ensureLoggedIn, function(req, res, next) {
    res.render('more_info.ejs', { user: req.user});
  });

  router.get('/info/:id', ensureLoggedIn, function(req, res, next) {
      var name = req.params.id;
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
      //             var mysql      = require('mysql');
      //             var connection = mysql.createConnection({
      //                 host     : '193.151.106.187',
      //                 user     : 'auth',
      //                 password : 'auth',
      //                 database : 'auth'
      //             });
      //
      //             connection.connect();
      //
      //             connection.query('Select * from users where auth_id = ?',JSON.parse(parsedBody).user_id.toString() , function (error, results, fields) {
      //                 // error will be an Error if one occurred during the query
      //                 // results will contain the results of the query
      //                 // fields will contain information about the returned results fields (if any)if (error) throw error;
      //                 console.log('The solution is: ', results);
      //                 res.render('user_page.ejs', { user_old: JSON.parse(parsedBody), user: results[0]});
      //             });
      //
      //
      //             connection.end();
      //
      //             // res.render('user_page.ejs', { user: });
      //             // console.log(JSON.parse(parsedBody));
      //             // res.send(JSON.parse(parsedBody));
      //         })
      //         .catch(function (err) {
      //             res.send(err.toString());
      //         });
      //
      // });
      var res_id;
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : '193.151.106.187',
          user     : 'auth',
          password : 'auth',
          database : 'auth'
      });

      connection.connect();

      connection.query('Select * from users where id = ?',name , function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)if (error) throw error;
          console.log('The solution is: ', results);
          if (!results[0]){
              res.redirect('/main/info');
              console.log('vse');
          }

      });

      connection.query('Select * from users where auth_id = ?', req.user.id.toString(), function (error, results, fields) {
          res_id = results[0].id;
          res.render('change_info.ejs', {user: results[0], id:res_id});
      });
      connection.end();

      // res.render('more_info.ejs', { user: req.user});
});

  router.post('/add_info', ensureLoggedIn, function(req, res, next) {
      var pic;
      console.log('pic: ' + req.body.picture.toString());
      if (req.body.picture.toString() === '') pic = 'https://i.ytimg.com/vi/K7cI1QOZYQI/maxresdefault.jpg';
      else pic = req.body.picture.toString();
      var data = [null, req.body.id.toString(), req.body.nickname.toString(),req.body.first_name.toString(),req.body.second_name.toString(),req.body.info.toString(), req.body.phone.toString(),req.body.url.toString(), pic, req.body.email.toString()];
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : '193.151.106.187',
          user     : 'auth',
          password : 'auth',
          database : 'auth'
      });
      var res_id;
      connection.connect();

      connection.query('INSERT INTO `auth`.`users` (`id`, `auth_id`, `nickname`, `first_name`, `surname`, `info`, `phone_num`, `site`, `picture`, `email`) VALUES (?,?,?,?,?,?,?,?,?,?)', data, function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)if (error) throw error;
          if (error){

              console.log(error.code);
          }
          console.log('The solution is: ', results);

      });

      connection.query('Select * from users where auth_id = ?', data[1], function (error, results, fields) {
          res_id = results[0].id;
          res.redirect('/main/user/' + res_id);
      });



      connection.end();

    // res.render('more_info.ejs', { user: req.user});
  });

  router.post('/new_message', ensureLoggedIn, function(req, res, next) {
      // if (req.body.picture.toString() === '') pic = 'https://i.ytimg.com/vi/K7cI1QOZYQI/maxresdefault.jpg';
      // else pic = req.body.picture.toString();
      var data = [null, req.body.user_id.toString(), req.body.message.toString(),null , 2,req.body.picture.toString(), req.body.nickname.toString()];
      console.log(data);
      var mysql      = require('mysql');

      var connection = mysql.createConnection({
          host     : '193.151.106.187',
          user     : 'auth',
          password : 'auth',
          database : 'auth'
      });
      var res_id;
      connection.connect();

      connection.query('INSERT INTO `auth`.`messages` (`id`, `user_id`, `message`, `time`, `likes`, `picture`, `nickname`) VALUES (?,?,?,?,?,?,?)', data, function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)if (error) throw error;
          if (error){

              console.log(error.code);
          }
          console.log('The solution is: ', results);

      });

      connection.query('Select * from users where auth_id = ?', req.body.auth_id.toString(), function (error, results, fields) {
          res_id = results[0].id;
          res.redirect('/main');
      });



      connection.end();

    // res.render('more_info.ejs', { user: req.user});
  });

  router.post('/change_info', ensureLoggedIn, function(req, res, next) {
      var pic;
      console.log('pic: ' + req.body.picture.toString());
      if (req.body.picture.toString() === '') pic = 'https://i.ytimg.com/vi/K7cI1QOZYQI/maxresdefault.jpg';
      else pic = req.body.picture.toString();
      var data = [req.body.first_name.toString(),req.body.second_name.toString(),req.body.info.toString(), req.body.phone.toString(),req.body.url.toString(), pic,req.body.id.toString() ];
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : '193.151.106.187',
          user     : 'auth',
          password : 'auth',
          database : 'auth'
      });
      var res_id;
      connection.connect();
      // UPDATE `auth`.`users` SET `nickname` = 'funafuna2016' WHERE `users`.`id` = 9;
      connection.query('UPDATE `auth`.`users` SET `first_name` = ?, `surname` = ?, `info` = ?, `phone_num` = ?, `site` = ?, `picture` = ? WHERE `users`.`auth_id` = ?', data, function (error, results, fields) {
      // connection.query('INSERT INTO `auth`.`users` (`id`, `auth_id`, `nickname`, `first_name`, `surname`, `info`, `phone_num`, `site`, `picture`, `email`) VALUES (?,?,?,?,?,?,?,?,?,?)', data, function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query

          // fields will contain information about the returned results fields (if any)if (error) throw error;
          if (error){

              console.log(error.code);
          }
          console.log('The solution is: ', results);

      });
      connection.query('Select * from users where auth_id = ?', req.user.id.toString(), function (error, results, fields) {
          res_id = results[0].id;
          res.redirect('/main/user/' + res_id);
      });

      connection.end();

    // res.render('more_info.ejs', { user: req.user});
  });

  router.get('/user/:id', ensureLoggedIn, function (req, res, next) {
      var name = req.params.id;
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
      //             var mysql      = require('mysql');
      //             var connection = mysql.createConnection({
      //                 host     : '193.151.106.187',
      //                 user     : 'auth',
      //                 password : 'auth',
      //                 database : 'auth'
      //             });
      //
      //             connection.connect();
      //
      //             connection.query('Select * from users where auth_id = ?',JSON.parse(parsedBody).user_id.toString() , function (error, results, fields) {
      //                 // error will be an Error if one occurred during the query
      //                 // results will contain the results of the query
      //                 // fields will contain information about the returned results fields (if any)if (error) throw error;
      //                 console.log('The solution is: ', results);
      //                 res.render('user_page.ejs', { user_old: JSON.parse(parsedBody), user: results[0]});
      //             });
      //
      //
      //             connection.end();
      //
      //             // res.render('user_page.ejs', { user: });
      //             // console.log(JSON.parse(parsedBody));
      //             // res.send(JSON.parse(parsedBody));
      //         })
      //         .catch(function (err) {
      //             res.send(err.toString());
      //         });
      //
      // });

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
      connection.query('Select * from users where id = ?',name , function (error, results, fields) {
          // error will be an Error if one occurred during the query
          // results will contain the results of the query
          // fields will contain information about the returned results fields (if any)if (error) throw error;
          console.log('The solution is: ', results);
          if (!results[0]){
              res.redirect('/main/info');
              console.log('vse');
          }else{
              if (results[0].auth_id === req.user.id){
                  res.render('mine_page.ejs', {user: results[0], id:self_id});

              }else{

                  res.render('user_page.ejs', {user: results[0], id:self_id});
              }

          }



      });


      connection.end();
});



module.exports = router;
