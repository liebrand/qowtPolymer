(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
    },

    jelte: function() {
      FlowChildren.jelte.call(this);
      console.log('jelte page: ' + this.nodeName);
    }
  };


  /* jshint newcap: false */
  Polymer('qowt-para', mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

})();