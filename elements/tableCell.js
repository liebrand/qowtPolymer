(function() {
  'use strict';

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
    },

    removeFromFlow: function() {
      // table cells THEMSELVEs should never just be
      // removed from a flow since that could cause
      // us to have fewer cells in one row than another.
      // So we dont do anything for this function, BUT
      // we provide a forceRemoveFromFlow that the
      // table row can call (since it knows when the entire
      // row is empty and thus we can be removed safely)
      return;
    },

    forceRemoveFromFlow: function() {
      return FlowChildren.removeFromFlow();
    },

    contentHeight: function() {
      return this.$.contents.offsetHeight;
    }
  };


  /* jshint newcap: false */
  Polymer('qowt-table-cell',
      MiscUtils.mergeMixin(QowtElement, FlowChildren, api_));
  /* jshint newcap: true */

})();