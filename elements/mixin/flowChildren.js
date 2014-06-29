
window.FlowChildren = {
  addMixin: function(module) {
    "use strict";

    FlowingElement.addMixin(module);

    /**
     * Flows the children from "this" to "this.flowInto"
     * Steps:
     *   1- unflow all children (recursively) back to "this"
     *   2- flow all children while overflowingFunc returns true
     *   3- if first child in "flowInto" supports flow, then:
     *   3a- pull child back to "this"
     *   3b- call child.flow()
     *
     * @param {Function} overflowingFunc to indicate if we are overflowing
     */
    module.flow = function(overflowingFunc) {
      if (!this.flowInto) {
        throw new Error(this.nodeName +
                        ' tried to flow without having a flowInto');
      }

      // step 1 - unflow everything
      this.unflow();

      // step 2 - flow children
      this.flowChildren_(overflowingFunc);

      // step 3 - recurse in to child (if it supports it)
      this.recurseFlowChild_(overflowingFunc);
    };


    /**
     * unflow all content from 'flowInto' back in to 'this'
     * Steps:
     *    1- if this.lastElementChild is flowed, unflow it
     *    2- move all children from 'flowInto' back in to 'this'
     */
    module.unflow = function() {
      if (!this.flowInto) {
        throw new Error(this.nodeName +
                        ' tried to unflow without having a flowInto');
      }

      // step 1 - recurse unflow child
      this.recurseUnflowChild_();

      // step 2 - unflow all children back in to 'this'
      this.unflowChildren_();
    };


    // ----------------------- PRIVATE ------------------

    module.flowChildren_ = function(overflowingFunc) {
      // take half my children and flow them in to the flowInto
      var count = Math.floor(this.childElementCount/2);
      while (count>0) {
        DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
        count--;
      }
    };

    module.unflowChildren_ = function() {
      // move all children from 'flowInto' back to 'this'
      while (this.flowInto.firstElementChild) {
        DomUtils.insertAtEnd(this, this.flowInto.firstElementChild);
      }
    };

    module.recurseFlowChild_ = function(overflowingFunc) {
      // then recurse into my lastElementChild (if it supports it)
      var lastEl = this.lastElementChild;
      if (lastEl && lastEl.supports('flow')) {

        if (!lastEl.flowInto) {
          var nextEl = lastEl.createFlowInto();

          // TODO(jliebrand): can optimize by adding this to the DOM
          // *after* the flow is done; thereby saving layouts when
          // content is pushed in to the nextPage...
          DomUtils.insertAtStart(this.flowInto, nextEl);
        }

        lastEl.flow(overflowingFunc);

      }
    };

    module.recurseUnflowChild_ = function() {
      //  unflow any child that is flowed
      var flowedChildren = this.querySelectorAll('[data-named-flow]');
      if (flowedChildren.length > 1) {
        throw new Error('Should never have more than one flowed child!');
      }
      if (flowedChildren.length > 0) {
        flowedChildren[0].unflow();
      }
    };

  }
};






