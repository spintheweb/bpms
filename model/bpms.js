/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

var Data = require('mongoose');
var Process = require('./process');
var Document = require('./document');

module.exports = (settings) => {
    let bpms = {
        datasource: settings.datasource | 'mongodb://localhost:27017/bpms',
        processes: [],
        organigrams: [],
        roles: []
    };

//    Data.connect(bpms.datasource);
//    bpms.db = Data.connection;

    bpms.getProcess = (guid) => {};
    bpms.setProcess = (guid, data) => {
        if (guid) {

        } else {
            let process = new Process(name);
            bpms.processes.push(process);
        }
        return process;
    };
    bpms.deleteProcess = (id) => {};

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

    return bpms;
};
