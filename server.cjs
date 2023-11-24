const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));

/*
['/', '/sign-up', '/settings', '/messenger'].forEach(route => {
  app.get(route, function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './dist/index.html'));
  })
});

app.get('*', function (req, res) {
  res.redirect('/');
})
*/

app.get('*', function (req, res) {
    res.status(200).sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}!`);
}); 
