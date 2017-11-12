const express = require('express');
const bodyParser = require('body-parser');
const router = require('express').Router();

router.get('/', function(req, res, next) {
    console.log('and now got the users too!')
})

module.exports = router;