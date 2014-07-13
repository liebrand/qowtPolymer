
describe("unflow children", function() {

  var doc;

  beforeEach(function() {
    doc = testDiv.querySelector('qowt-doc');
  });


  it("should be possible to unflow a top " +
     "level element and all its children", function() {
    var spanCount = doc.querySelectorAll('span').length;

    testPaginate_(0, 11);

    var lastElement = getLastElementForPage_(0);
    expect(lastElement.isFlowing()).to.equal(true);

    expectPageCount_(2);
    expectSpansOnPage_(0, 11);
    expectSpansOnPage_(1, spanCount - 11);

    lastElement.unflow();

    expect(lastElement.isFlowing()).to.equal(false);
    expectPageCount_(2);
    expectSpansOnPage_(0, 12);
    expectSpansOnPage_(1, spanCount - 12);
  });



  // ---------------------------------------------------------

  function overflowFunc_(page, spansToFit) {
    var spansOnPage = page.querySelectorAll('span');
    var overflow = spansOnPage.length > spansToFit;
    return overflow;
  }

  function testPaginate_(pageNum, spansThatFit) {
    var pages = doc.querySelectorAll('qowt-page');
    var page = pages[pageNum];
    var fitSpans = overflowFunc_.bind(null, page, spansThatFit);
    sinon.stub(page, "isOverflowing", fitSpans);

    doc.paginate(page);

    page.isOverflowing.restore();
  }

  function getLastElementForPage_(pageNum) {
    var pages = doc.querySelectorAll('qowt-page');
    var page = pages[pageNum];
    var section = page.firstElementChild;
    var lastTopLevelElement = section.lastElementChild;
    return lastTopLevelElement;
  }

  function expectPageCount_(count) {
    var pages = doc.querySelectorAll('qowt-page');
    expect(pages.length).to.equal(count);
  }

  function expectSpansOnPage_(pageNum, expectedSpans) {
    var pages = doc.querySelectorAll('qowt-page');
    var spansOnPage = pages[pageNum].querySelectorAll('span');
    expect(spansOnPage.length).to.equal(expectedSpans);
  }

});

