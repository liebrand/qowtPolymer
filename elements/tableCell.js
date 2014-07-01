/* jshint newcap: false */
Polymer('qowt-table-cell', {
  /* jshint newcap: true */

  normalizeFlow: function() {
    // table cells THEMSELVEs should never normalize
    // (that could cause us to have fewer cells in
    // row than we should have). Instead the entire
    // row will normalize when it's empty
    return;
  },

  contentHeight: function() {
    return this.$.contents.offsetHeight;
  }

  // ---------------------- PRIVATE ------------------

});

QowtElement.addMixin(QowtTableCell.prototype);
FlowChildren.addMixin(QowtTableCell.prototype);