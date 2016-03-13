var express = require('express');
var router = express.Router();

var knex = require('../db/knex');


// return ALL blobs
router.get('/blobs', function(req, res, next){
  knex.select().table('blobs')
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          data: err.message
        });
    });
});

// return SINGLE blob
router.get('/blobs/:id', function(req, res, next){
  // throw error if id does not exist
  knex('blobs').where('id', req.params.id)
    .then(function(data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          data: err.message
        });
    });
});

// adds a blob
router.post('/blobs', function(req, res, next) {
  // verify that we're passing in the correct keys
  knex('blobs').insert({
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
    .then(function(data) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          data: `Added ${data.rowCount} row`
        });
      /* jshint ignore:end */
    })
    .catch(function(err) {
      res.status(500)
        .json({
          status: 'error',
          data: err.message
        });
    });
});

// updates a blob
router.put('/blobs/:id', function(req, res, next){
  // throw error if id does not exist
  // verify that we're passing in the correct keys
  var column = req.body.column;
  var value = req.body.value;
  knex('blobs')
    .update(column, value)
    .where('id', req.params.id)
      .then(function(data) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            data: `Updated ${data} row`
          });
        /* jshint ignore:end */
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            data: err.message
          });
      });
});

// deletes a blob
router.delete('/blobs/:id', function(req, res, next){
  // throw error if id does not exist
  knex('blobs')
    .delete()
    .where('id', req.params.id)
      .then(function(data) {
        /* jshint ignore:start */
        res.status(200)
          .json({
            status: 'success',
            data: `Deleted ${data} row`
          });
        /* jshint ignore:end */
      })
      .catch(function(err) {
        res.status(500)
          .json({
            status: 'error',
            data: err.message
          });
      });
});


module.exports = router;
