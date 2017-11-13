const express = require('express');
const app = express();
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const models = require('./models');
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: false }))
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function() {
   app.listen(3000, function() {

   });
})
.catch(function(err) {
    console.log(err)
})

.catch(console.error);



app.use('/', routes)
