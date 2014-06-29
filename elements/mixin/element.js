window.QowtElement = {
  addMixin: function(module) {

    module.supportedActions_ = [];

    var funcs = {
      supports: function(action) {
        return this.supportedActions_.indexOf(action) !== -1;
      },
      isEmpty: function() {
        // override if needed
        return (this.childNodes.length === 0);
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
