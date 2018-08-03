const path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  hostname = 'localhost',
  port = 3000;

const bpms = require('./model/bpms')({ datasource: 'mongodb://localhost:27017/bpms' });

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static(path.join(__dirname, '/ui/styles')));

app.route('/process(/:id)?')
  .get((req, res) => {
    let query = req.params.id ? { _id: req.params.id } : {};
    bpms.selectProcess(query)
      .then(result => { res.json(result); })
      .catch(err => { throw err; });
  })
  .post((req, res) => {
    if (req.params.id)
      res.json(bpms.updateProcess({ _id: req.params.id }, req.body));
    else
      bpms.createProcess(req.body)
        .then(result => { res.json(result); })
        .catch(err => { throw err; });
  })
  .delete((req, res) => {
    if (req.params.id)
      bpms.deleteProcess({ _id: req.params.id })
        .then(result => { res.json(result); })
        .catch(err => { throw err; });
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/ui/index.html`));
});

app.listen(port, hostname);

console.log(`BPMS listening on ${hostname}:${port}`);
