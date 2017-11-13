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
      },
      include: [
        {model: User, as: 'author'}
      ]
  })
  .then(function(foundPage) {
    res.render('wikipage', {urlTitle: foundPage.urlTitle, title: foundPage.title, content: foundPage.content, author: foundPage.author.name, authorId: foundPage.authorId, tags: foundPage.tags})
  })
  .catch(next);
});
  router.post('/', function(req, res, next) {
    User.findOrCreate({
      where: {
        name: req.body.author,
        email: req.body.email
      }
    })
    .then(function (values) {  
      var user = values[0];
    
      var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tag.split(', ')
      });
      return page.save().then(function (page) {
        return page.setAuthor(user);
      });
    
    })
    .then(function (page) {
      res.redirect(page.route);
    })
    .catch(next);
    
  });

module.exports = router;