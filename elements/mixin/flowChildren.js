
window.FlowChildren = {
  addMixin: function(module) {
    "use strict";

    var funcs = {
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
      flow: function(overflowingFunc) {
        if (!this.flowInto) {
          throw new Error(this.nodeName +
                          ' tried to flow without having a flowInto');
        }

        // step 1 - unflow everything
        this.unflow();

        // step 2 - flow children
        this.flowChildren_(overflowingFunc);

        // step 3 - recurse in to 'edge child' (if it supports it)
        this.recurseFlowChild_(overflowingFunc);
      },


      /**
       * unflow all content from 'flowInto' back in to 'this'
       * Steps:
       *    1- if this.lastElementChild is flowed, unflow it
       *    2- move all children from 'flowInto' back in to 'this'
       */
      unflow: function() {
        if (!this.flowInto) {
          throw new Error(this.nodeName +
                          ' tried to unflow without having a flowInto');
        }

        // step 1 - recurse unflow child
        this.recurseUnflowChild_();

        // step 2 - unflow all children back in to 'this'
        this.unflowChildren_();
      },


      // ----------------------- PRIVATE ------------------

      flowChildren_: function(overflowingFunc) {
        // binary search algorithm to flow the children
        // NOTE: we start with Math.ceil (in case there is only one element)
        // and then inside the loop use Math.floor to not get in to an
        // eternal loop...
        var half = Math.ceil(this.childElementCount / 2);
        while (half > 0) {

          var overflowing = overflowingFunc();
          for (var i = 0; i < half; i++) {
            if (overflowing) {
              DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
            } else {
              DomUtils.insertAtEnd(this, this.flowInto.firstElementChild);
            }
          }

          half = Math.floor(half / 2);
        }

        // if we had an odd number of children, we could have now
        // pulled in one too many elements
        if (overflowingFunc()) {
          DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
          if (overflowingFunc()) {
            throw new Error('Should not be overflowing anymore! ' +
                            'looks like algorithm is broken...');
          }
        }
      },

      unflowChildren_: function() {
        // move all children from 'flowInto' back to 'this'
        while (this.flowInto.firstElementChild) {
          DomUtils.insertAtEnd(this, this.flowInto.firstElementChild);
        }
      },

      // check if the first child in 'flowInto' supports flow,
      // if so, pull it back in to 'this' and flow it
      recurseFlowChild_: function(overflowingFunc) {
        var child = this.flowInto.firstElementChild;
        if (child && child.supports('flow')) {

          // pull it back
          DomUtils.insertAtEnd(this, child);

          // flow it
          if (!child.flowInto) {
            var childFlowInto = child.createFlowInto();

            // TODO(jliebrand): could optimize by adding this to the DOM
            // *after* the flow is done; thereby saving layouts when
            // content is pushed in to the nextPage...
            DomUtils.insertAtStart(this.flowInto, childFlowInto);
          }

          child.flow(overflowingFunc);
        }
      },

      recurseUnflowChild_: function() {
        //  unflow any child that is flowed
        var flowedChildren = this.querySelectorAll('[data-named-flow]');
        if (flowedChildren.length > 1) {
          throw new Error('Should never have more than one flowed child!');
        }
        if (flowedChildren.length > 0) {
          flowedChildren[0].unflow();
        }
      }
    };

    // extend the module; but only if it hasn't overwritten any funcs
    for(var func in funcs) {
      if (module[func] === undefined) {
        module[func] = funcs[func];
      }
    }

    // and mixin the basic flowing functions
    FlowingElement.addMixin(module);
  }
};






