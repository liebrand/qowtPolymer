define([
  'utils/miscUtils',
  ], function(MiscUtils) {

  "use strict";

  return {

    supports_: ['flow'],

    isFlowing: function() {
      return this.namedFlow() !== null;
    },
    namedFlow: function() {
      return this.getAttribute('data-named-flow');
    },
    createNamedFlow: function() {
      var flow = 'FLOW-' + MiscUtils.generateId();
      this.setNamedFlow(flow);
      return flow;
    },
    setNamedFlow: function(flowName) {
      this.setAttribute('data-named-flow', flowName);
    },
    clearNamedFlow: function() {
      this.removeAttribute('data-named-flow');
      this.flowInto = undefined;
      this.flowFrom = undefined;
    },
    removeFromFlow: function() {
      // unlink this from the flow
      if (this.flowFrom) {
        this.flowFrom.flowInto = this.flowInto;
      }
      if (this.flowInto) {
        this.flowInto.flowFrom = this.flowFrom;
      }
      // reset (for good measure) and remove this from document
      this.clearNamedFlow();
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    },
    createFlowInto: function() {
      var namedFlow = this.namedFlow() || this.createNamedFlow();

      this.flowInto = this.cloneMe();
      this.flowInto.removeAttribute('id');
      this.flowInto.setNamedFlow(namedFlow);
      this.flowInto.flowFrom = this;
      return this.flowInto;
    },
    cloneMe: function() {
      // override if needed
      return this.cloneNode(false);
    },

    // does nothing if 'this' is not flowing or
    // if the flow has no empty nodes
    normalizeFlow: function() {
      var flowName = this.namedFlow();
      if (flowName) {
        var doc = this.ownerDocument;
        var flowSelector = '[data-named-flow="' + flowName + '"]';
        var chain = doc.querySelectorAll(flowSelector);
        var current = chain[0];

        // remove empty nodes from the flow
        var loopCount = 0;
        while (current) {
          var next = current.flowInto;
          if (current.isEmpty()) {
            // note: individual elements can override removeFromFlow...
            // for example table cells shouldn't be removed from the flow,
            // unless the entire row is empty. Thus table cells override
            // this function to do nothing, and table rows can call the
            // table cell's forceRemoveFromFlow...
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
    },

    flow: function() {
      throw new Error('must override');
    },
    unflow: function() {
      throw new Error('must override');
    }

  };

});