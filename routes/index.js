const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();
const wikiRouter = require('./wiki');
const userRouter = require('./users');
const searchRouter = require('./search');
const models = require('../models');
const nunjucks = require('nunjucks');
const Page = models.Page;

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);
router.use('/search', searchRouter);
router.use('/', function(req, res, next) {
        models.Page.findAll({}).then(function(pages) {
            res.render('index', {pages: pages})
        })
})


module.exports = router;                      