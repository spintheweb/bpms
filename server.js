const path = require('path'),
  express = require('express'),
  app = express(),
  hostname = 'localhost',
  port = 3000;

const bpms = require('./model/bpms');

app.use('/css', express.static(path.join(__dirname, '/ui/styles')));

app.route('/processes')
  .get((req, res) => {
    let txt = '';
    bpms.processes.forEach((process) => {
      txt += process.name;
    });
    res.send(txt);
  })
  .post(); // Create

app.route('/process/:processId')
  .get((req, res) => {
    bpms.getProcess(req.params.processId);
  })
  .post((req, res) => {
    bpms.setProcess(req.params.processId);
  });

app.route('/docs')
  .get((req, res) => { // List
    res.send(doc1.name);
  })
  .post((req, res) => {
    return new Document('New document');
  }); // Create
  
app.route('/doc/:docId')
  .get() // Read
  .put() // Update
  .delete(); // Delete

app.get('/', function (req, res) {
  res.sendFile(path.join(`${__dirname}/ui/index.html`));
});

app.listen(port, hostname);

console.log(`BPMS listening on ${hostname}:${port}`);
