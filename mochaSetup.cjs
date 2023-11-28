const { JSDOM } = require('jsdom');
const fs = require('fs');

const { window } = new JSDOM('<html><body><div id="app"></div></body></html>', {
  url: 'http://localhost:5173'
});

global.window = window;
global.document = window.document;
global.DocumentFragment = window.DocumentFragment;
global.history = window.history;
global.HTMLElement = window.HTMLElement;

require.extensions['.scss'] = function () {
  module.exports = () => ({});
}
