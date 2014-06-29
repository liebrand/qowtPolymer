
window.FlowingElement = {
  addMixin: function(module) {


    module.supportedActions_ = module.supportedActions_ || [];
    module.supportedActions_.push('flow');

    var funcs = {
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
      },
      createFlowInto: function() {
        var namedFlow = this.namedFlow() || this.createNamedFlow();

        this.flowInto = this.cloneMe();
        this.flowInto.removeAttribute('id');
        this.flowInto.setNamedFlow(namedFlow);
        return this.flowInto;
      },
      cloneMe: function() {
        // override if needed
        return this.cloneNode(false);
      },
      normalizeFlow: function() {
        // debugger;
        var flowName = this.namedFlow();
        if (flowName) {
          var i;
          var doc = this.ownerDocument;
          var flowSelector = '[data-named-flow="' + flowName + '"]';
          var chain = doc.querySelectorAll(flowSelector);
          // verify "tail end" of chain is empty (for loop starts at offset 1!)
          for (i = 1; i < chain.length; i++) {
            if (!chain[i].isEmpty()) {
              throw new Error('Cant normalize flow; chain tail is not empty!');
            }
          }
          // delete chain tail and reset chain start
          chain[0].clearNamedFlow();
          chain[0].flowInto = undefined;
          for (i = 1; i < chain.length; i++) {
            var parent = chain[i].parentNode;
            if (parent) {
              parent.removeChild(chain[i]);
            }
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
