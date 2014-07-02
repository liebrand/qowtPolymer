
(function() {

  "use strict";

  var api_ = {
    supports_: ['something'],

    normalizeFlow: function() {
      // table cells THEMSELVEs should never normalize
      // (that could cause us to have fewer cells in
      // row than we should have). Instead the entire
      // row will normalize when it's empty
      return;
    },

    forceNormalizeFlow: function() {
      return FlowChildren.normalizeFlow();
    },

    contentHeight: function() {
      return this.$.contents.offsetHeight;
    }

  };


  var QowtTableCellProto = mergeMixin(QowtElement, FlowChildren, api_);

  /* jshint newcap: false */
  Polymer('qowt-table-cell', QowtTableCellProto);
  /* jshint newcap: true */

})();
