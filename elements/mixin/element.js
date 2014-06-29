window.QowtElement = {
  addMixin: function(module) {

    module.supportedActions_ = [];

    module.supports = function(action) {
      return this.supportedActions_.indexOf(action) !== -1;
    };
  }
};
