(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowWords = require('elements/mixin/flowWords');

  var api_ = {
    supports_: ['something'],

    ready: function() {
    },

    foo: function() {}
  };


  /* jshint newcap: false */
  Polymer('qowt-run', MiscUtils.mergeMixin(QowtElement, FlowWords, api_));
  /* jshint newcap: true */

})();