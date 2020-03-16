var Connection = require("tedious").Connection;

var config = {
    server: 'localhost',
    authentication: {
      type: 'default',
      options: {
        userName: 'mocha',
        password: 'Qwer1234'
      }
    },
    options: {
      database: 'nodejsBoard',
      instanceName: 'Sqlexpress',
      rowCollectionOnDone: true,
      useColumnNames: false
    }
};

var connection = new Connection(config);

connection.on('connect', function(err){
    if (err) {
      console.log(err);
    }
    else {
      console.log('connected');
    }
});

module.exports = connection;