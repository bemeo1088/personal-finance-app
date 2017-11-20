var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
// var pg = require()



// Handles Ajax request for posting transactions-- POST Route
router.post('/', function (req,res) {
    // req.user.id is the user row
    console.log('transaction POST route', req.body);
    pool.connect(function(error, db, done) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "transactions" ("date", "user_id", "description", "category_id", "amount") VALUES ($1, $2, $3, $4, $5);';
            db.query(queryText, [req.body.date, req.user.id, req.body.description, req.body.category, req.body.amount], function (error, result) {
                done();
                if (error) {
                    console.log('Error making query', error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            }); // End query
        }
    }); // End Pool
}); // End POST Route

// var transactionList = [];

// POST route
// router.post('/', function (req, res){
//     console.log(req.body);
//     var recordTransaction = req.body;
//     transactionList.push(recordTransaction);
//     console.log('transactionList', transactionList);
//     res.sendStatus(201); 
// })

// GET route
// router.get('/', function(req, res) {
//     res.sendStatus(200);
// });

// Handles Ajax request for getting transactions--GET Route
router.get('/', function(req,res) {
    pool.connect (function (error, db, done) {
        console.log('get /transaction route');
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT "transactions"."date", "transactions"."description", "categories"."category_name", "transactions"."amount", "transactions"."user_id" FROM "transactions" INNER JOIN "categories" ON "transactions"."category_id" = "categories"."id" WHERE "transactions"."user_id" = "categories"."user_id";';
            db.query(queryText, function (error, result){
                done();
                if (error) {
                    console.log('error making query', error);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            }); // End query
        }
    }); // End pool
}); // End GET Route

// DELETE Route to delete a single transaction
router.delete('/:id', function (req, res) {
    var transactionId = req.params.id;
    pool.connect(function (error, db, done) {
        if (error) {
            console.log('Error connecting', error);
            res.sendStatus(500);
        } else {
            var queryText = 'DELETE FROM "transactions" WHERE "id" = $1;';
            db.query(queryText, [transactionId], function (error, result) {
                done();
                if (error) {
                    console.log('error making query', error);
                    res.sendStatus(500);    
                } else {
                    res.send(result.rows);
                }
            }); // End query
        }
    }); // End pool
}); // End DELETE route

// PUT Route to edit a transaction
router.put('/:id', function (req, res) {
    console.log('req.body', req.body);
    console.log('req.params', req.params);
    var transactionId = req.params.id;
    var transaction = req.body;
    pool.connect( function (error, db, done) {
        if (error) {
            console.log('Error connecting', error);
            res.sendStatus(500);    
        } else {
            var queryText = 'UPDATE "transactions" SET "date" = $1, "user_id" = $2, "description" = $3, "category_id" = $4, "amount" = $4 WHERE "id" = $6;';
            db.query(queryText, [transaction.date, req.user.id, transaction.description, transaction.category, transaction.amount, transactionId], function (error, result) {
                done();
                if (error) {
                    console.log('error making query', error);
                    res.sendStatus(500);
                    
                } else {
                    res.send(result.rows);
                }
            }); // End query
        }
    }); // End Pool 
}); // End Put Route




module.exports = router;