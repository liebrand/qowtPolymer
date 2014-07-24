(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
    },

    foo: function() {}
  };


  /* jshint newcap: false */
  Polymer('qowt-table', MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

})();