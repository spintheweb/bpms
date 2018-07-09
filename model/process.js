/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

var Task = require('./task');
var guid = require('./utilities');

class Process {
    constructor(name = 'New Process') {
        this.guid = guid();
        this.name = name;
        this.created = new Date();
        this.modified = null;
        this.due = null;
        this.roles = [];
        this.tasks = [];
        this.status = 1;

        this.add(new Task('start'));
    }
    add(child) {
        if (child instanceof Task) {
            child.parent = this;
            this.tasks.push(child);
        } else if (child instanceof Role) {
            child.parent = this;
        } else if (child instanceof String) {
            let task = new Task(child);
            child.parent = this;
            this.tasks.push(child);
        }
        this.modified = new Date();
    }
}

module.exports = Process;