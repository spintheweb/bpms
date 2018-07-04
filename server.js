var express = require('express'),
  app = express(),
  port = 3000;

var bpms = require('./scripts/bpms');

var process = bpms.createProcess('Riparazione');
bpms.createProcess('DDT');

var task = bpms.createTask(process, 'START');
task.add("cliente", "ACME");

var doc1 = bpms.createDocument(process, 'Riparazione PC1');
var doc2 = bpms.createDocument(process, 'Riparazione PC2');
var doc3 = bpms.createDocument(process, 'Riparazione PC3');
var doc4 = bpms.createDocument(process, 'Riparazione PC4');

app.get('/processes', function (req, res) {
  let txt = '';
  bpms.processes.forEach((process) => { txt += process.name; });
  res.send(txt);
});

app.get('/doc1', function (req, res) {
  res.send(doc1.name);
});

app.get('/', function (req, res) {
  res.send("Benvenuto in BPMS");
});

app.listen(port);

console.log('Listening on: ' + port);
