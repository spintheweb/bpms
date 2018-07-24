/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const Task = require('./task');

class Process {
    constructor(code = 'New Process') {
        this.guid = null;
        this.code = code;
        this.name = code;
        this.domain = null; // 
        this.created = new Date();
        this.modified = null;
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
    static update(data) {

    }
}

module.exports = Process;
