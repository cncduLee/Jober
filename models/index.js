var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./User');
require('./Job');
require('./Coment');
require('./Message');
require('./Resume');
require('./Relation');
//...

exports.User = mongoose.model('User');
exports.Job = mongoose.model('Job');
exports.Coment = mongoose.model('Coment');
exports.Message = mongoose.model('Message');
exports.Resume = mongoose.model('Resume');
exports.Relation = mongoose.model('Relation');
//...