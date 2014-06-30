
window.assert = function(expression, msg) {
  var result;
  if (typeof expression === 'function') {
    result = expression();
  } else {
    result = expression;
  }
  if (!result) {
    debugger;
    throw new Error('ASSERT FAILED: ' + msg);
  }
};


(function() {
  var id = 0;
  window.generateId = function() {
    return id++;
  };
}());