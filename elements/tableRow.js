window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtTableRow');

require([
  'utils/miscUtils',
  'elements/mixin/element',
  'elements/mixin/flowCells'], function(
    MiscUtils,
    QowtElement,
    FlowCells) {

  'use strict';

  var api_ = {
    supports_: ['something'],
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
    },

    normalizeFlow: function() {
      var flowName = this.namedFlow();
      if (flowName) {
        var doc = this.ownerDocument;
        var flowSelector = '[data-named-flow="' + flowName + '"]';
        var chain = doc.querySelectorAll(flowSelector);
        var current = chain[0];

        // remove empty nodes from the flow
        var loopCount=0;
        while (current) {
          var next = current.flowInto;
          if (current.isEmpty()) {
            for (var i = 0; i < current.children.length; i++) {
              var cell = current.children[i];
              cell.forceNormalizeFlow();
            }
            current.removeFromFlow();
          }
          current = next;
          loopCount++;
        }
        MiscUtils.assert(loopCount === chain.length, 'chain broken!');

        // now if we are left with only one node, then clear its flow
        chain = doc.querySelectorAll(flowSelector);
        if (chain.length === 1) {
          chain[0].clearNamedFlow();
        }
      }
    }
    // ----------------------- PRIVATE ---------------
  };


  /* jshint newcap: false */
  Polymer('qowt-table-row', MiscUtils.mergeMixin(QowtElement, FlowCells, api_));
  /* jshint newcap: true */

});
