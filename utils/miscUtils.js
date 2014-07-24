
define(['utils/lodash.min'], function(LowDash) {

  'use strict';

  var id_ = 0;

  return {

    assert: function(expression, msg) {
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
    },

    generateId: function() {
      return id_++;
    }

  };

});

