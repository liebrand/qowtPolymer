
window.init = function() {
  // fake the content creation coming in later than domReady
  window.setTimeout(doGenerateContent, 10);
};

function doGenerateContent() {
  var body = document.body;

  function create(type) {
    return document.createElement(type);
  }

  function createRun(text) {
    var r = new QowtRun();
    r.innerText = text;
    return r;
  }

  function createPara(text) {
    var p = new QowtPara();
    if (text) {
      p.appendChild(createRun(text));
    }
    return p;
  }
  var section = body.appendChild(create('qowt-doc'))
      .appendChild(create('qowt-page'))
      .appendChild(create('qowt-section'));


  section.createHFItem('header', 'odd', document.createDocumentFragment()
      .appendChild(createPara('this is a header')));

  section.createHFItem('footer', 'odd', document.createDocumentFragment()
      .appendChild(createPara('this is a footer')));

  for (var i = 0; i < 11; i++) {
    var p = createPara();
    p.appendChild(createRun('Monday Tuesday Wednesday Thursday Friday ' +
                            'Saturday Sunday. '));
    p.appendChild(createRun('January February March April May June July ' +
                            'August September October November December. '));
    p.appendChild(createRun('One two three four five six seven eight ' +
                            'nine ten. '));
    p.appendChild(createRun('Alpha bravo charlie delta echo foxtrot golf ' +
                            'hotel india juliet kilo lima mike november ' +
                            'oscar papa quebec romeo sierra tango uniform ' +
                            'victor whiskey x-ray yankee zulu.'));
    section.appendChild(p);
  }

  // window.setTimeout(doPaginate, 10);
}

// function doPaginate() {
//   var doc = document.querySelector('qowt-doc');
//   doc.paginate();
// }
