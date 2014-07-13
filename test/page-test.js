
describe("qowt-page element", function() {

  it("should have the basic API defined", function() {
    var page = document.querySelector('qowt-page');
    assert(page instanceof QowtPage, 'element is a QowtPage');

    assertFunctions(page, ['flow', 'unflow', 'isFlowing']);
  });

  // ---------------------------------------------------------

  function assertFunctions(element, funcList) {
    funcList.forEach(function(funcName) {
      assert.isFunction(element[funcName],
          '<qowt-page>.' + funcName);
    });
  }

});
