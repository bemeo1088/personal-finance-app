var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');



// POST Income
// router.post('/', function (req,res){
//     console.log('income POST route', req.body);
//     pool.connect(function(error, db, done){
//         if(error) {
//             console.log(error);
//             res.sendStatus(500);
//         } else {
//             var queryText = 'INSERT INTO "users" ("income") VALUES ($1);';
//             db.query(queryText, [req.user.income], function(error, result){
//                 done();
//                 if (error) {
//                     console.log('Error making query', error);
//                     res.sendStatus(500);    
//                 } else {
//                     res.sendStatus(201);
//                 }
//             }); // End query
//         }
//     }); //End Pool
// }); // End POST Income Route

// POST category
router.post('/', function (req,res){
    console.log('category POST route', req.body);
    pool.connect(function(error, db, done){
        if (error) {
            console.log(error);
            res.sendStatus(500);    
        } else {
            var queryText = 'INSERT INTO "categories" ("category_name", "amount") VALUES ($1, $2);';
            db.query(queryText, [req.body.category_name, req.body.amount], function (error, result){
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
}); // End POST Category Route





module.exports = router;