
window.ArrayUtils = {
  unique: function(array) {
    return array.filter(function(elem, pos) {
      return array.indexOf(elem) === pos;
    });
  }
}