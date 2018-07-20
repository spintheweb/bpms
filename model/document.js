/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const Process = require('./process');

class Document {
    constructor(process, name) {
        this.name = name;
        this.unit = null;
        this.created = new Date();
        this.modified = null;
        this.createdBy = null;
        this.managedBy = null;
        this.status = 1;
        this.tasks = [];

        if (process instanceof Process)
            this.process = process;
        else
            this.process = null; // Base process one task with notes
    }
    get unit() {
        return this.unit;
    }
    set unit(value) {
        this.unit = value;
    }
    add() {

    }
}
module.exports = Document;