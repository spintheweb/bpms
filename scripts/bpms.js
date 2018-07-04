/*!
 * BPMS
 * Copyright(c) 2018 Giancarlo Trevisan
 * MIT Licensed
 */

module.exports = ((settings) => {
    let bpms = {
        processes: [],
        organigrams: []
    };

    bpms.createProcess = (name) => {
        let process = new Process(name);
        bpms.processes.push(process);
        return process;
    };

    bpms.createDocument = (process, name) => {
        let document;
        if (process instanceof Process)
            document = new Document(process, name);
        return document;
    };

    bpms.createTask = (process, name) => {
        let task = new Task(name);
        process.add(task);
        return task;
    };

    class Document {
        constructor(process, name) {
            this.name = name;
            this.process = process;
        }
    }

    class Process {
        constructor(name = 'New Process') {
            this.guid = null;
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
            }
            this.modified = new Date();
        }
    }

    // A task is modelled as a collection of key-value pairs 
    class Task {
        constructor(name = 'New Task', data = []) {
            this.guid = null;
            this.name = name;
            this.created = new Date();
            this.modified = null;
            this.due = null;
            this.data = [ 
                { datacreazione: { value: null, type: "datetime", default: new Date() }} , 
                { note: { value: "some notes", type: "string", default: "pluto" }}
            ];
            this.policies = [];
            this.transitions = [];
            this.ui = null;
            this.status = 1; // {1|2|3}
        }
        add(child, value, settings = []) {
            if (child instanceof Policy) {
                this.policies[child] = value;
            } else if (child instanceof Transition) {
                this.transitions[child] = value;
            } else if (child instanceof String) {
                this.data[child] = value;
            }
        }
        proceed(data = []) {
            // Check and save data if all is well consider transitions

        }
        release() {

        }
        delete() {

        }
        data(name) {

        }
    }
    class Transition {
        constructor(condition, policy) {
            if (condition instanceof Function) {

            } else {

            }
        }
    }

    // Partecipating roles
    class Role {
        constructor(name = 'New role') {
            this.members = [];
        }
        add(member) {
            this.members.push(memebr);
        }
        remove(member) {

        }
    }

    // A policy is what a role can do rwx
    class Policy {
        constructor(role, policy) {

        }
    }

    // A calendar is a set of rules that specify when roles are NOT avaliable
    class Calendar {
        constructor() {
            this.rules = [];
        }
        add(role, from, to, weekdays) {

        }
    }

    return bpms;
})({});