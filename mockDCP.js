
window.init = function() {
  document.getElementById('zoomin').onclick = function() {
    var doc = document.querySelector('qowt-doc');
    doc.zoomIn();
  };
  document.getElementById('zoomout').onclick = function() {
    var doc = document.querySelector('qowt-doc');
    doc.zoomOut();
  };
  document.getElementById('zoomwidth').onclick = function() {
    var doc = document.querySelector('qowt-doc');
    doc.zoomToWidth();
  };
  document.getElementById('zoompage').onclick = function() {
    var doc = document.querySelector('qowt-doc');
    doc.zoomFullPage();
  };
  document.getElementById('zoomactual').onclick = function() {
    var doc = document.querySelector('qowt-doc');
    doc.zoomActualSize();
  };

  // fake the content creation coming in later than domReady
  window.setTimeout(doGenerateContent, 100);
};

function doGenerateContent() {
  var container = document.getElementById('container');

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

  function createParas(number) {
    var frag = document.createDocumentFragment();

    for (var i = 0; i < number; i++) {
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
      frag.appendChild(p);
    }
    return frag;
  }

  function createTable(tableDef) {
    var frag = document.createDocumentFragment();
    var table = new QowtTable();
    frag.appendChild(table);

    for (var rowIndex = 0; rowIndex < tableDef.length; rowIndex++) {
      var row = new QowtTableRow();
      table.appendChild(row);

      var rowDef = tableDef[rowIndex];
      for (var cellIndex = 0; cellIndex < rowDef.length; cellIndex++) {
        var cell = new QowtTableCell();
        row.appendChild(cell);

        cell.appendChild(createPara(rowDef[cellIndex]));
      }
    }
    return frag;
  }

  var section = container.appendChild(create('qowt-doc'))
      .appendChild(create('qowt-page'))
      .appendChild(create('qowt-section'));

  section.headerConfig = {
    dfp: true,
    doe: true,
    topMargin: '1cm'
  };
  section.footerConfig = {
    dfp: true,
    doe: true,
    topMargin: '0.5cm'
  };

  section.getHeaderItem('first-page')
    .appendChild(createPara('this is an first-page header'));
  section.getHeaderItem('odd')
      .appendChild(createPara('this is an odd header'));
  section.getHeaderItem('even')
      .appendChild(createPara('this is an even header'));

  section.getHeaderItem('both');

  section.getFooterItem('first-page')
    .appendChild(createPara('this is an first-page footer'));
  section.getFooterItem('odd')
      .appendChild(createPara('this is an odd footer'));
  section.getFooterItem('even')
      .appendChild(createPara('this is an even footer'));


  section.appendChild(createParas(2));

  section.appendChild(createTable([
    ['one', 'two', 'three', 'four'],
    ['row is very big, or at least its bigger than the other rows ' +
     'with some data that just keeps on ', 'row is very big, or at ' +
     'least its bigger than the other rows with some data that just ' +
     'keeps on going until we are at the end of this cell', 'small', 'foo'],
    ['and', 'then', 'some', 'bar']
  ]));

  section.appendChild(createParas(9));
}
