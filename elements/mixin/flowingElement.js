
window.FlowingElement = {
  addMixin: function(module) {


    module.supportedActions_ = module.supportedActions_ || [];
    module.supportedActions_.push('flow');

    var funcs = {
      isFlowing: function() {
        return this.namedFlow() !== null;
      },
      namedFlow: function() {
        return this.getAttribute('data-named-flow');
      },
      createNamedFlow: function() {
        // TODO(jliebrand): this is NOT unique!
        var flow = 'FLOW-' + Math.round(Math.random(1000)*1000);
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
          var i;
          var doc = this.ownerDocument;
          var flowSelector = '[data-named-flow="' + flowName + '"]';
          var chain = doc.querySelectorAll(flowSelector);
          var current = chain[0];

          // remove empty nodes from the flow
          while (current) {
            var next = current.flowInto;
            if (current.isEmpty()) {
              current.removeFromFlow();
            }
            current = next;
          }

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


    // extend the module; but only if it hasn't overwritten any funcs
    for(var func in funcs) {
      if (module[func] === undefined) {
        module[func] = funcs[func];
      }
    }

  }
};
