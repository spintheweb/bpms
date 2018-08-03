const path = require('path'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  fs = require('fs');

// Load config
let config = JSON.parse(fs.readFileSync(`${__dirname}/bpms.json`));

const bpms = require('./model/bpms')({ datasource: config.datasource });

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, '/ui/styles')));

app.route('(/documents|/processes)(/:id)?')
  .get((req, res) => {
    let query = req.params.id ? { _id: req.params.id } : {};
    bpms.read(req.path, query)
      .then(result => { res.json(result); })
      .catch(err => { throw err; });
  })
  .post((req, res) => {
    if (req.params.id)
      res.json(bpms.update(req.path, { _id: req.params.id }, req.body));
    else
      bpms.create(req.path, req.body)
        .then(result => { res.json(result); })
        .catch(err => { throw err; });
  })
  .delete((req, res) => {
    if (req.params.id)
      bpms.delete(req.path, { _id: req.params.id })
        .then(result => { res.json(result); })
        .catch(err => { throw err; });
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/ui/index.html`));
});

app.listen(port, hostname);

console.log(`BPMS v${config.version} listening on ${config.hostname}:${config.port}`);
