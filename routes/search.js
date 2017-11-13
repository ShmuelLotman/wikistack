const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', function(req, res, next) {
    res.render('searchForm', {})
})

router.get('/search', function(req, res, next) {
   var queryTags = req.query.tagName.split(', ');
   console.log(queryTags);
   Page.findAll({})
   .then(function(result) {
       console.log(result)
       res.json(result);
   })
   .catch( function(err) {
       console.log(err)
   })
})


module.exports = router;