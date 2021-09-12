const crypto = require('crypto-js');
const express = require('express');
const jsyaml = require('js-yaml');
const fs = require('fs');

var app = express();
app.use(express.static('frontend'));
app.get('/api/easydwz', (req, res) => {
  const data = easydwz(req.query.url);
  if ((data.status = 'ok')) {
    res.send(data);
  }
});
app.get('/', (req, res) => {
  res.set('Content-type', 'text/html');
  res.send(fs.readFileSync('./frontend/index.html').toString());
});
app.get('/*', (req, res) => {
  res.set('Content-type', 'text/html');
  if (chkdwz(req.url.slice(1)) == 404) {
    res.send(fs.readFileSync('./frontend/404.html').toString());
  } else {
    res.redirect(chkdwz(req.url.slice(1)));
  }
});

app.listen('666');

function easydwz(url) {
  var dwz = crypto.MD5(url).toString();
  dwz = 'e' + dwz.slice(0, 6);
  var edb = jsyaml.load(fs.readFileSync('./edb.yml'));
  if (edb == undefined) {
    edb = new Object();
  }
  if (dwz in edb) {
    if (eval('edb.' + dwz) == url) {
      return { status: 'ok', url: dwz };
    } else {
      // dwz = crypto.MD5(url).toString();
      // dwz = 'e' + dwz.slice(0, 4) + "&";
      // while (dwz in edb) {
        
      // }
      
    }
  } else {
    eval('edb.' + dwz + " = '" + url + "';");
    console.log(edb);
    fs.writeFileSync('./edb.yml', jsyaml.dump(edb));
    return { status: 'ok', url: dwz };
  }
}

function chkdwz(url) {
  var edb = jsyaml.load(fs.readFileSync('./edb.yml'));
  if (url in edb) {
    return eval('edb.' + url);
  } else {
    return 404;
  }
}
