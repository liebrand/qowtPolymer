/* jshint newcap: false */
Polymer('qowt-table-row', {
  /* jshint newcap: true */

  isEmpty: function() {
    // if all our cells our empty, then we are empty
    // (and can be removed during a normalize phase)
    for (var i = 0; i < this.childElementCount; i++) {
      var cell = this.children[i];
      if (!cell.isEmpty()) {
        return false;
      }
    }
    return true;
  }
  // ---------------------- PRIVATE ------------------

});

QowtElement.addMixin(QowtTableRow.prototype);
FlowCells.addMixin(QowtTableRow.prototype);