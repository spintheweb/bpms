/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const Process = require('./process');

// TODO: parents, children and ties should be just ties with motives

class Document {
    constructor(process, name) {
        if (process instanceof Process)
            this.model = process;
        else
            this.model = null; // Base process memo

        this.guid = null;
        this.name = name;
        this.domain = null; // Associated business domain
        this.created = new Date();
        this.createdBy = null;
        this.modified = null;
        this.due = null;
        this.managedBy = null;
        this.status = 1; // Open, Standby, Closed
        this.tasks = [];
        this.ties = []; // Tied documents
    }
    get domain() {
        return this.domain;
    }
    set domain(value) {
        this.domain = value;
    }
    add() {

    }
    insert() {}
    update() {}
    delete() {}
    select() { return this; }
}
module.exports = Document;