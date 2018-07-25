/*!
  Layout the SVG journey cards | © 2018 The Open University (IET-OU).
*/

module.exports = {
  reflow: reflow,
  setupEditor: setupEditor
};

const LAYOUTS = require('./layouts.json');
const SVG_TEMPLATE = require('./views/card-template.svg'); // WAS: document.querySelector('#oj-svg-card-template').innerText;
const EDITOR_BAR = require('./views/editorbar.html');
const OPTIONS_BAR = require('./views/optionsbar.html');
const CARD_HOLDER = document.querySelector('#journey-canvas .card-holder');

function reflow (layout) {
  layout = layout || 'default';

  console.warn('layout:', layout, LAYOUTS[ layout ], /* SVG_TEMPLATE, */ CARD_HOLDER);

  let cards = [];

  LAYOUTS[ layout ].forEach(function (elem) {
    cards.push(replaceObj(SVG_TEMPLATE, elem));
  });

  CARD_HOLDER.innerHTML = cards.join('\n');
}

function setupEditor () {
  document.querySelector('.editorbar .editorbar-inner').innerHTML = EDITOR_BAR;
  document.querySelector('.editorbar .optionsbar').innerHTML = OPTIONS_BAR;
}

// https://github.com/nfreear/gaad-widget/blob/3.x/src/methods.js#L90-L96
function replaceObj (str, mapObj) {
  const RE = new RegExp(Object.keys(mapObj).join('|'), 'g'); // Was: "gi".

  return str.replace(RE, function (matched) {
    return mapObj[ matched ]; // Was: matched.toLowerCase().
  });
}
