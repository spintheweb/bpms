/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

const Process = require('./process');
const Document = require('./document');
const Role = require('./role');

// A task is a wrapped collection of key-value pairs
class TaskModel {
    constructor(code = 'New Task', data = [ { name: "notes", type: "String", default: null, required: false, description: "Notes", policies: [] }]) {
        this.parent = null;
        this.code = code;
        this.name = code;
        this.data = data;
        this.policies = [];
        this.transitions = [];
        this.attributes = [];
        this.ui = null;
    }
    add(child, value) {
        if (child instanceof Role) {
            this.policies[child] = value;
        } else if (child instanceof Function) {
            this.transitions[child] = value || function() { return true; }; // 
        } else if (child instanceof String) {
            this.data[child] = value;
        } else {
            throw new Error('Cannot add child to task model');
        }
    }
}

class Task {
    constructor(model, document) {
        if (document instanceof Document) {
            this.model = model;
            this.parent = document;
            this.created = new Date();
            this.modified = null;
            this.due = null;
            this.data = [];
            this.policies = [];
            this.status = 1; // {open=1|closed=2|repeated=3}
        } else {
            throw new Error('Expecting Document objects');
        }
    }
    get data() {
        return this.data;
    }
    set data(value) {
        this.model.data.forEach(field => {
            this.data[field.name] = value[field.name] || field.default; // The default could be a variable
        });
    }
    proceed(data) {
        this.data = data;        
        for (let i = 0; i < this.model.data.length; ++i)
            if (this.model.data[i].required && !this.data[this.model.data[i].name])
                return false;

        this.model.transitions.forEach(transition => {
            if (transition.logic()) // Only once task?
                this.parent.add(new Task(proceed.taskModel));
        });
    }
    release(role) {

    }
    hold() {

    }
}

module.exports = TaskModel;
