const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
    User.findAll({}).then(function(users){
      res.render('wikiusers', { users: users });
    }).catch(next);
  });
router.get('/:id', function(req, res, next) {
    var userPromise = User.findById(req.params.id);
    var pagePromise = Page.findAll({
      where: {
        authorId: req.params.id 
      }
    });
    Promise.all([userPromise, pagePromise]).then(function(result) {
      var user = result[0],
      pages = result[1];
      res.render('index', { users: user, pages: pages });
    })
    .catch(next);
})
module.exports = router;