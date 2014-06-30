
window.assert = function(expression, msg) {
  var result;
  if (typeof expression === 'function') {
    result = expression();
  } else {
    result = expression;
  }
  if (!result) {
    /* jshint debug: true */
    debugger;
    /* jshint debug: false */
    throw new Error('ASSERT FAILED: ' + msg);
  }
};


(function() {
  var id = 0;
  window.generateId = function() {
    return id++;
  };
}());