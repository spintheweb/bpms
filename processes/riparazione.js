const bpms = require('./model/bpms');

let role, process;

role = bpms.createRole("IT", [ "john", "fred", "joe", "frank" ]);
process = bpms.createProcess('riparazione');
process.add(new Task())

let document = process.createDocument('PC');

let p = {
    "name": "riparazione",
    "tasks": [
        { "Apertura": { }}
    ]
};