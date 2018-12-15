const express = require('express');
const morgan = require('morgan');
const prometheus = require('prom-client');
const request = require('request');

const app = express();

const numConnections = new prometheus.Counter({
  name: 'num_connections',
  help: 'Total number of incoming connections',
});

app
  .use(morgan('combined'))
  .get('/metrics', (req, res) => {
    res.set('Content-Type', prometheus.register.contentType);
    res.end(prometheus.register.metrics());
  })
  .get('/', (req, res) => {
    numConnections.inc();
    res.json({
      hello: 'world',
    });
  });

function workload() {
  request.get('http://localhost:8081', () => {
    setTimeout(() => {
      workload();
    }, 10);
  });
}

app.listen(8081, () => {
  console.log('listening on port 8081');
  workload();
});
