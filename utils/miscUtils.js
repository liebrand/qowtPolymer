
window.assert = function(expression, msg) {
  var result;
  if (typeof expression === 'function') {
    result = expression();
  } else {
    result = expression;
  }
  if (!result) {
    throw new Error('ASSERT FAILED: ' + msg);
  }
}