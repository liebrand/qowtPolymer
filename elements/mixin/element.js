(function() {
  "use strict";

  window.QowtElement = {

    supports_: [],

    supports: function(action) {
      return this.supports_.indexOf(action) !== -1;
    },
    isEmpty: function() {
      // override if needed
      return (this.childNodes.length === 0);
    }
  };
})();