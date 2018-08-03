/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const Task = require('./task');

class Process {
    constructor(data) {
        this.code = data.code;
        this.name = data.name;
        this.domain = data.domain;
        this.created = new Date();
        this.modified = null;
        this.roles = [];
        this.tasks = [];
        this.status = 1;

        this.add(new Task({ code: 'start' }));
    }
    add(child) {
        if (child instanceof Task) {
//            child.parent = this;
            this.tasks.push(child);
        } else if (child instanceof Role) {
//            child.parent = this;
        } else if (child instanceof String) {
            let task = new Task(child);
//            child.parent = this;
            this.tasks.push(child);
        }
        this.modified = new Date();
    }
    update(data) {
        this.modified = new Date();
        
    }
}

module.exports = Process;
