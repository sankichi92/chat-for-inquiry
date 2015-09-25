var MongoClient = require('mongodb').MongoClient;
var debug = require('debug')('chat-for-inquiry:db');

var messages;

MongoClient.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/chat-for-inquiry', function (err, db) {
  if (err) return debug(err);
  debug('connected to db');
  messages = db.collection('messages', function (err, col) {
    if (err) debug(err);
  });
});

module.exports = {
  insertMessage: function (msg) {
    msg.timestamp = new Date();
    messages.insert(msg, function (err, result) {
      if (err) return debug(err);
      debug(result);
    });
  },
  fetchMessages: function (id, skip) {
    return messages.find({id: id}, {_id: 0})
        .sort({timestamp: -1})
        .skip(skip)
        .limit(50);
  }
};
