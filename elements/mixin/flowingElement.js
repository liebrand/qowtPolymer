
window.FlowingElement = {
  addMixin: function(module) {

    module.created = function() {
      this.supportedActions_.push('flow');
    };

    module.namedFlow = function() {
      return this.getAttribute('data-named-flow');
    };
    module.createNamedFlow = function() {
      // TODO(jliebrand): this is NOT unique!
      var flow = 'FLOW-' + Math.round(Math.random(1000)*1000);
      this.setNamedFlow(flow);
      return flow;
    };
    module.setNamedFlow = function(flowName) {
      this.setAttribute('data-named-flow', flowName);
    };
    module.createFlowInto = function() {
      var namedFlow = this.namedFlow() || this.createNamedFlow();

      this.flowInto = this.cloneMe();
      this.flowInto.removeAttribute('id');
      this.flowInto.setNamedFlow(namedFlow);
      return this.flowInto;
    };

    module.flow = function() {
      throw new Error('must override');
    };
    module.cloneMe = function() {
      // override if needed
      return this.cloneNode(false);
    };
  }
};
