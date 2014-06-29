
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
      createFlowInto: function() {
        var namedFlow = this.namedFlow() || this.createNamedFlow();

        this.flowInto = this.cloneMe();
        this.flowInto.removeAttribute('id');
        this.flowInto.setNamedFlow(namedFlow);
        return this.flowInto;
      },

      flow: function() {
        throw new Error('must override');
      },

      cloneMe: function() {
        // override if needed
        return this.cloneNode(false);
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
