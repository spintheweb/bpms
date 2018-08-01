const path = require('path'),
  express = require('express'),
  app = express(),
  hostname = 'localhost',
  port = 3000;

const bpms = require('./model/bpms')({ datasource: 'mongodb://localhost:27017/bpms' });

app.use(express.json());
app.use('/css', express.static(path.join(__dirname, '/ui/styles')));

app.route('/process(/:processId)?')
  .get((req, res) => {
    let query = req.params.processId ? { _id: req.params.processId } : {};
    bpms.selectProcess(query)
      .then(result => { res.json(result); })
      .catch(err => { throw err; });
  })
  .post((req, res) => {
    if (req.params.processId)
      bpms.updateProcess({ _id: req.params.processId });
    else
      bpms.createProcess();
  })
  .delete((req, res) => {
    if (req.params.processId)
      bpms.deleteProcess({ _id: req.params.processId });
  });

app.get('/', function (req, res) {
  res.sendFile(path.join(`${__dirname}/ui/index.html`));
});

app.listen(port, hostname);

console.log(`BPMS listening on ${hostname}:${port}`);
