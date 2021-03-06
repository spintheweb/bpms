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

    // If BPMS datastore does not exist create then it
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

    // CRUD operations
    function _create(collection, data) {
        let obj;
        switch (collection) {
            case 'processes':
                obj = new Process(data);
                break;
            case 'documents':
                obj = new Document(data);
                break;
            default:
                return {};
        }
        return bpms.dbo.collection(collection).insertOne(obj)
            .then(result => { return result.ops[0]; })
            .catch(err => { throw err; });
    }
    function _read(collection, query) {
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
    // Allow only model data
    function _checkData(obj, data) {

    }

    // CRUD on collection extracted from path
    bpms.create = (path, data) => { return _create(path.split('/')[1], data); };
    bpms.read = (path, query) => { return _read(path.split('/')[1], query); };
    bpms.update = (path, id, data) => { return _update(path.split('/')[1], id, data); };
    bpms.delete = (path, id) => { return _delete(path.split('/')[1], id); };

    return bpms;
};
