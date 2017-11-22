var express = require('express');
var router = express.Router();
var path = require('path');
var pool = require('../modules/pool.js');



// UPDATE Income
router.put('/:id', function (req,res){
    console.log('income PUT req.body', req.body);
    console.log('income PUT req.params', req.params);
    var userId = req.params.id;
    var user = req.body;

    pool.connect(function(error, db, done){
        if(error) {
            console.log('Error connecting', error);
            res.sendStatus(500);
        } else {
            var queryText = 'UPDATE "users" SET "income" = $1 WHERE "id" = $2;';
            db.query(queryText, [user.income, userId], function(error, result){
                done();
                if (error) {
                    console.log('Error making query', error);
                    res.sendStatus(500);    
                } else {
                    res.send(result.rows);
                }
            }); // End query
        }
    }); //End Pool
}); // End PUT Income Route


// POST category
router.post('/', function (req,res){
    console.log('category POST route req.body', req.body);
    pool.connect(function(error, db, done){
        if (error) {
            console.log(error);
            res.sendStatus(500);    
        } else {
            var queryText = 'INSERT INTO "categories" ("user_id", "category_name", "amount") VALUES ($1, $2, $3);';
            db.query(queryText, [req.user.id, req.body.category_name, req.body.amount], function (error, result){
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

// GET category
router.get('/', function (req, res) {
    pool.connect(function (error, db, done) {
        console.log('get /transaction route');
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            var queryText = 'SELECT "categories"."id", "categories"."user_id", "categories"."category_name", "categories"."amount" FROM "categories" INNER JOIN "users" ON "categories"."user_id" = "users"."id" WHERE "categories"."user_id" = $1;';
            db.query(queryText, [req.user.id], function (error, result) {
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

// DELETE a category budget
router.delete('/:id', function (req, res) {
    var categoryId = req.params.id;
    pool.connect(function (error, db, done) {
        if (error) {
            console.log('Error connecting', error);
            res.sendStatus(500);
        } else {
            var queryText = 'DELETE FROM "categories" WHERE "id" = $1;';
            db.query(queryText, [categoryId], function (error, result) {
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

module.exports = router;