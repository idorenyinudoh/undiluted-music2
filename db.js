const { MongoClient } = require('mongodb');

let state = {
    db: null
}

exports.connect = function(url, databaseName) {
    MongoClient.connect(url, (err, cli) => {
        state.db = cli.db(databaseName);
        console.log('from db');
    });
};

exports.get = function() {
    return state.db;
}