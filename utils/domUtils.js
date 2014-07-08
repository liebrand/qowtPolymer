define([], function() {

  'use strict';

  return {
    insertAtStart: function(into, element) {
      if (into) {
        return into.insertBefore(element, into.firstChild);
      }
    },
    insertAtEnd: function(into, element) {
      if (into) {
        into.appendChild(element);
      }
    }
  };
});