Polymer('qowt-flow-children', {

  flow: function(overflowingFunc) {
    if (!this.flowInto) {
      throw new Error(this.nodeName + ' tried to flow without having a flowInto');
    }
    // take half my children and flow them in to the flowInto
    var count = Math.floor(this.childElementCount/2);
    while (count>0) {
      DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
      count--;
    }

    // then recurse into my lastElementChild (if it supports it)
    var lastEl = this.lastElementChild;
    if (lastEl.supports('flow')) {

      if (!lastEl.flowInto) {
        var nextEl = lastEl.createFlowInto();

        // TODO(jliebrand): can optimize by adding this to the DOM
        // *after* the flow is done; thereby saving layouts when
        // content is pushed in to the nextPage...
        DomUtils.insertAtStart(this.flowInto, nextEl);
      }

      lastEl.flow(overflowingFunc);

    }
  }


});
