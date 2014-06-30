
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
    p.appendChild(createRun('Lorem ipsum dolor sit amet, ' +
                            'elit, sed do eiusmod'));
    p.appendChild(createRun('tempor incididunt ut labore et dolore magna ' +
                            'aliqua. Ut enim ad minim veniam,'));
    p.appendChild(createRun('quis nostrud exercitation ullamco laboris nisi ' +
                            'ut aliquip ex ea commodo'));
    p.appendChild(createRun('consequat. Duis aute irure dolor in ' +
                            'reprehenderit in voluptate velit esse'));
    p.appendChild(createRun('cillum dolore eu fugiat nulla pariatur. ' +
                            'Excepteur sint occaecat cupidatat non'));
    p.appendChild(createRun('proident, sunt in culpa qui officia deserunt ' +
                            'mollit anim id est laborum.'));
    section.appendChild(p);
  }

  window.setTimeout(doPaginate, 10);
}

function doPaginate() {
  var doc = document.querySelector('qowt-doc');
  doc.paginate();
}
