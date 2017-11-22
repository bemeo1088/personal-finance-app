var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var passport = require('./strategies/sql.localstrategy');
var sessionConfig = require('./modules/session.config');

// Moment.js
/* global require */
// require.config({
//     paths: {
//         'moment': 'scripts/moment'
//     }
// });

// require(['moment'], function (moment){
//     alert(moment().toString());
// });

// Route includes
var indexRouter = require('./routes/index.router');
var userRouter = require('./routes/user.router');
var registerRouter = require('./routes/register.router');
var budgetRouter = require('./routes/budget.router');
var transactionRouter = require('./routes/transaction.router');

var port = process.env.PORT || 5000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static('./server/public'));

// Passport Session Configuration
app.use(sessionConfig);

// Start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/budget', budgetRouter);
app.use('/transaction', transactionRouter);

// Catch all bucket, must be last!
app.use('/', indexRouter);

// Listen //
app.listen(port, function(){
   console.log('Listening on port:', port);
});
