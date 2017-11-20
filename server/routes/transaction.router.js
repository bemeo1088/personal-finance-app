var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');
// var pg = require()



// Handles Ajax request for posting transactions
router.post('/', function (req,res) {
    console.log('transaction POST route', req.body);
    pool.connect(function(error, db, done) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            var queryText = 'INSERT INTO "transactions" ("date", "description", "category_id", "amount") VALUES ($1, $2, $3, $4);';
            db.query(queryText, [req.body.date, req.body.description, req.body.category, req.body.amount], function (error, result) {
                done();
                if (error) {
                    console.log(error);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    })
});

var transactionList = [];

// POST route
// router.post('/', function (req, res){
//     console.log(req.body);
//     var recordTransaction = req.body;
//     transactionList.push(recordTransaction);
//     console.log('transactionList', transactionList);
//     res.sendStatus(201); 
// })

// GET route
router.get('/', function(req, res) {
    res.sendStatus(200);
});

// Handles Ajax request for getting transactions
// router.get('/', function(req,res) {
//     pool.connect (function (error, db, done) {
//         console.log('get /transaction route');
//         if (error) {
//             console.log(error);
//             res.sendStatus(500);
//         } else {
//             var queryText = 'SELECT * FROM "transactions";';
//             db.query(queryText, function (error, result){
//                 done();
//                 if (error) {
//                     console.log(error);
//                     res.sendStatus(500);
//                 } else {
//                     res.send(result.rows);
//                 }
//             });
//         }
//     })
// });



module.exports = router;