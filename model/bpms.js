/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const DS = require('mongodb');

const Process = require('./process');
const Document = require('./document');
const Role = require('./role');

// NOTES: Context language, domain

module.exports = (settings = {}) => {
    let bpms = {};

    // If BPMS does not exist create it
    DS.MongoClient.connect(settings.datasource || 'mongodb://localhost:27017/bpms', { useNewUrlParser: true })
        .then(db => { bpms.dbo = db.db(); })
        .catch(err => { 
            _init();
            throw err; 
        });
    
    // Verify that BPM datastore is setup
    function _init() {
        // Create default roles
        // Create memo process
        // Create memo
    }

    // Manage BPM objects
    function _create(collection, data) { 
        return bpms.dbo.collection(collection).insertOne(new Process(data))
            .then(result => { return result; })
            .catch(err => { throw err; });
    }
    function _select(collection, query) {
        if (typeof query._id === 'string')
            query._id = DS.ObjectID(query._id);

        return bpms.dbo.collection(collection).find(query || {}).toArray()
            .then(result => { return result; })
            .catch(err => { throw err; });
    }
    function _update(collection, id, data) {
        return bpms.dbo.collection(collection).updateOne({ _id: new DS.ObjectID(id) }, { $set: data })
            .then(result => { return result; })
            .catch(err => { throw err; });
    }
    function _delete(collection, id) {
        bpms.dbo.collection(collection).deleteOne({ _id: new DS.ObjectID(id) })
            .then(obj => { console.log(obj); })
            .catch(err => { throw err; });
    }

    bpms.createProcess = (data) => { return _create('processes', data); };
    bpms.selectProcess = (query) => { return _select('processes', query); };
    bpms.updateProcess = (id, data) => { return _update('processes', id, data); };
    bpms.deleteProcess = (id) => { return _delete('processes', id); };

    return bpms;
};
