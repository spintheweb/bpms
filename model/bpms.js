/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const DBClient = require('mongodb').MongoClient;

const Process = require('./process');
const Document = require('./document');
const Role = require('./role');

// NOTES: Context language, domain

module.exports = (settings = {}) => {
    let bpms = {};

    bpms.datasource = settings.datasource || 'mongodb://localhost:27017/bpms';
    
    // If BPMS does not exist create it
    DBClient.connect(bpms.datasource)
        .then(db => {

        })
        .catch((err) => {
            throw err;
        });

    // Initialize BPMS if empty
    // Create default roles: administrator, editor, observer
    // Create default Memo process
    if (!bpms.processes()) {
        let memo = new Process('memo');
    }

    bpms.processes = (id, data) => { 
        DBClient.connect(bpms.datasource)
            .then(db => {
                return db.collection('processes')
                    .find({}, { _id: id })
                    .then(result => result)
                    .then(() => db.close());
            });
    };
    bpms.roles = () => null;
    bpms.documents = () => null;

    bpms.getProcess = (guid) => {};
    bpms.setProcess = (guid, data) => {
        if (guid) {

        } else {
            let process = new Process(name);
            bpms.processes.push(process);
        }
        return process;
    };
    bpms.deleteProcess = (guid) => {};

    bpms.getDocument = (guid) => {
    };
    bpms.setDocument = (guid, data) => {
        let document;
        if (guid) {
            if (process instanceof Process)
            document = new Document(process, name);
        } else {

        }
        return document;
    };
    bpms.deleteDocument = (id) => {};

    bpms.createRole = (name, members) => {
        let role = bpms.roles.find((role) => { return role.name === name; });
    };

    return bpms;
};
