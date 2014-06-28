
var DomUtils = {
  insertAtStart: function(into, element) {
    if (into) {
      return into.insertBefore(element, into.firstChild);
    }
  }
}