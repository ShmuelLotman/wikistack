const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
    res.redirect('/');
  });
  router.get('/add', function(req, res, next) {
    res.render('addpage');
  });
  router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
      where: {
          urlTitle: req.params.urlTitle
      }
  })
  .then(function(foundPage) {
    console.log(foundPage)
    res.render('wikipage', {author: foundPage.author, content: foundPage.content})
  })
  .catch(next);
});
  router.post('/', function(req, res, next) {
    var page = Page.build({
        title: req.body.title,
        content: req.body.content, 
        status: req.body.pagestatus,
        author: req.body.author,
        urlTitle: req.body.title

    });
    page.save().then(function(foundPage) {res.redirect('/wiki/' + page.urlTitle)})
    
  });

module.exports = router;