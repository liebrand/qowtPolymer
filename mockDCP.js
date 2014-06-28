
function init() {
  // fake the content creation coming in later than domReady
  window.setTimeout(doGenerateContent, 10);
}

function doGenerateContent() {
  var body = document.body;

  function create(type) {
    return document.createElement(type);
  }

  function createRun(text) {
    var r = create('span');
    r.setAttribute('is', 'qowt-run');
    r.innerText = text;
    return r;
  }

  function createPara(text) {
    var p = create('p');
    p.setAttribute('is', 'qowt-para');
    if (text) {
      p.appendChild(createRun(text));
    }
    return p;
  }
  var section = body.appendChild(create('qowt-doc'))
      .appendChild(create('qowt-page'))
      .appendChild(create('qowt-section'));


  var hdi = section.createHeaderItem('odd', document.createDocumentFragment()
      .appendChild(createPara('this is a header')));

  var fdi = section.createFooterItem('odd', document.createDocumentFragment()
      .appendChild(createPara('this is a footer')));

  for (var i = 0; i < 10; i++) {
    var p = createPara();
    p.appendChild(createRun('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod'));
    p.appendChild(createRun('tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,'));
    p.appendChild(createRun('quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo'));
    p.appendChild(createRun('consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse'));
    p.appendChild(createRun('cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non'));
    p.appendChild(createRun('proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
    section.appendChild(p);
  }

  window.setTimeout(doPaginate, 10);
}

function doPaginate() {
  var doc = document.querySelector('qowt-doc');
  doc.paginate();
}
