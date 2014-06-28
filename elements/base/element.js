Polymer('qowt-element', {

  supportedActions_: [],

  supports: function(action) {
    return this.supportedActions_.indexOf(action) !== -1;
  }

});
