const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const router = express.Router();

const PythonShell = require('python-shell');
PythonShell.defaultOptions = { scriptPath: './python' };

const runPyScript = (obj, resp) => {
  PythonShell.run(obj.activeScript, obj.passableOptions, (_err, _resp) => {
    obj.msg = {
      err: _err.stack,
      value: Array.isArray(_resp) ? _resp[0] : _resp,
      status: obj.status
    };
    resp.json(obj.msg);
  });
};

const getState = (port, resp) => {
  return true;
}

const _utils = [
  {
    pin: 0,
    type: "switch",
    name: "Light 1",
    state: getState()
  },
  {
    pin: 1,
    type: "switch",
    name: "Light 2",
    state: getState()
  }
];


app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static(__dirname + '/web-app'));


app.get('/', (request, response) => {

  response.sendfile('web-app/index.html');

}).get('/utilities', (request, response) => {

  response.send(JSON.stringify(_utils));

}).get('/utilities/:uid', (request, response) => {

   console.log("Got utility - " + request.params.uid);

});


app.use('/api', router);
app.listen(PORT);

console.log('Server started on ' + PORT);