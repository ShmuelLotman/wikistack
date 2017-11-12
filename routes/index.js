const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
const models = require('../models');
const nunjucks = require('nunjucks');
const Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/user', userRouter);
router.use('/', function(req, res, next) {
        models.Page.findAll({}).then(function(pages) {
            var newPages = JSON.stringify(pages)
            console.log(newPages)
            res.render('index', {pages: newPages})
        })
})


module.exports = router;                      