/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

var Process = require('./process');
var Document = require('./document');
var Transition = require('./transition');
var Role = require('./role');

// A task is a wrapped collection of key-value pairs
class TaskModel {
    constructor(process, name = 'New Task', data = [ { name: "notes", type: "String", default: null, required: false, description: "Notes", policies: [] }]) {
        this.guid = null; // Assigned by mongodb
        this.parent = process;
        this.name = name;
        this.data = data;
        this.policies = [];
        this.transitions = [];
        this.attributes = [];
        this.ui = null;
    }
    add(child, value) {
        if (child instanceof Role) {
            this.policies[child] = value;
        } else if (child instanceof Transition) {
            this.transitions[child] = value | true; // 
        } else if (child instanceof String) {
            this.data[child] = value;
        } else {
            throw new Error('Cannot add child to task model');
        }
    }
    create(document) {
        return new Task(this, document);
    }
}

class Task {
    constructor(model, document) {
        if (document instanceof Document) {
            this.guid = null; // Assigned by mongodb
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
                return 1;

        this.model.transitions.forEach(transition => {

        });
    }
    release(role) {

    }
    hold() {

    }
}

module.exports.Task = TaskModel;
