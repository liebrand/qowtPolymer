
describe("flow children", function() {

  var doc;

  beforeEach(function() {
    doc = testDiv.querySelector('qowt-doc');
  });

  it("should flow all children recursively", function() {
    var spanCount = doc.querySelectorAll('span').length;

    testPaginate_(0, 2);

    expectPageCount_(2);
    expectSpansOnPage_(0, 2);
    expectSpansOnPage_(1, spanCount - 2);
  });


  it("should support flowing on to three pages", function() {
    var spanCount = doc.querySelectorAll('span').length;

    testPaginate_(0, 2);
    testPaginate_(1, 3);

    expectPageCount_(3);
    expectSpansOnPage_(0, 2);
    expectSpansOnPage_(1, 3);
    expectSpansOnPage_(2, spanCount - 5);
  });

  it("should reflow by absorbing content across ALL pages", function() {
    var spanCount = doc.querySelectorAll('span').length;

    testPaginate_(0, 2);
    testPaginate_(1, 3);

    // now reflow page 1, and ensure we fit enough
    // spans for us to have to pull them from page 2 AND 3
    testPaginate_(0, 10);

    expectPageCount_(2);
    expectSpansOnPage_(0, 10);
    expectSpansOnPage_(1, spanCount - 10);
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

