define([
  'utils/miscUtils',
  'utils/domUtils',
  'elements/mixin/flowingElement'
  ], function(
    MiscUtils,
    DomUtils,
    FlowingElement) {

  "use strict";

  // merge in the FlowingElement mixin
  return MiscUtils.mergeMixin(FlowingElement, {

    supports_: ['flow-children'],

    jelte: function() {
      console.log('flowchildren: ' + this.nodeName);
    },

    /**
     * Flows the children such that as many as possible are in "this"
     * and the rest has been flowed to "this.flowInto".
     * How many fit is decided by the passed in 'overflowingFunc'
     *
     * Steps:
     *   1 - if last child is already flowing, then reflow it
     *   1a- if after that we are still overflowing AND the last child is
     *       still flowing, then something went wrong (the child should
     *       have flowed all the way in to this.flowInto and normalize)
     *   1b- if we are no longer overflowing and the child is still
     *       flowing then we are done overflowing
     *   1c- if last child flowed completed to this.flowInto then go to step 2
     *
     *   2 - if overflowingFunc is true, then
     *   2a- flow children from flowInto to this, else
     *   2b- flow children from this to flowInto
     *
     *      (now we should no longer be overflowing)
     *
     *   3 - if first child in "flowInto" supports flow, then:
     *   3a- pull child back to "this"
     *   3b- call child.flow()
     *
     *   4 - normalize flow in case all children moved out/in
     *
     * @param {Function} overflowingFunc to indicate if we are overflowing
     */
    flow: function(overflowingFunc) {
      if (!this.flowInto) {
        throw new Error(this.nodeName +
          ' tried to flow without having a flowInto');
      }

      // step 1 - reflow last child
      var child = this.lastElementChild;
      if (child && child.supports && child.supports('flow') &&
          child.isFlowing()) {
        if (!child.flowInto) {
          var childFlowInto = child.createFlowInto();

          // TODO(jliebrand): could optimize by adding this to the DOM
          // *after* the flow is done; thereby saving layouts when
          // content is pushed in to the nextPage...
          DomUtils.insertAtStart(this.flowInto, childFlowInto);
        }

        // reflow
        child.flow(overflowingFunc);

        // if after flowing the child still exists in the DOM then it
        // should be guaranteed that the page is no longer overflowing.
        // if the page is still overflowing, the content of the child
        // should have moved completely to flowInto, and the child element
        // should have been removed from the DOM as part of it's normalize

        // now assert/check if we need to do more
        if (overflowingFunc()) {
          // we are still overflowing, so the content of child SHOULD have
          // moved completely in to this.flowInto and the child should thus
          // no longer be in the DOM.
          MiscUtils.assert(!child.ownerDocument.body.contains(child),
            new Error('child should have flowed completely to flowInto'));
        } else {
          if (child.isFlowing()) {
            // we're no longer overflowing, and child is still flowing
            // so it has done it's job - there's nothing more to overflow
            // or indeed to flow back in to 'this'
            return true;
          }
        }
      }

      // step 2 - last child not flowing: flow rest of children
      this.flowChildren_(overflowingFunc);

      // step 3 - recurse in to 'edge child' (if it supports it)
      this.recurse_(overflowingFunc);

      // step 4 - normalize in case we moved all content into this or flowInto
      this.normalizeFlow();
    },


    /**
     * unflow all content from 'flowInto' back in to 'this'
     * Steps:
     *    1- if this.lastElementChild is flowed, unflow it
     *    2- move all children from 'flowInto' back in to 'this'
     *    3- normalize in case we moved all children
     */
    unflow: function() {
      throw new Error('TODO: should unflow entire CHAIN!');

      // if (!this.flowInto) {
      //   throw new Error(this.nodeName +
      //                   ' tried to unflow without having a flowInto');
      // }

      // // step 1 - recurse unflow child
      // this.recurseUnflowChild_();

      // // step 2 - unflow all children back in to 'this'
      // this.unflowChildren_();

      // // step 3 - normalize flow
      // this.normalizeFlow();
    },


    // ----------------------- PRIVATE ------------------

    flowChildren_: function(overflowingFunc) {
      // binary search algorithm to flow the children

      // if we are overflowing, flow from 'this' else from 'this.flowInto'
      var src = overflowingFunc() ? this : this.flowInto;
      var childrenToFlow = src.childElementCount || 0;

      var half = Math.ceil(childrenToFlow / 2);
      while (true) {
        // flow children out if we are overflowing or
        // pull them back in if we are not.
        var overflowing = overflowingFunc();
        for (var i = 0; i < half; i++) {
          if (overflowing) {
            DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
          } else {
            DomUtils.insertAtEnd(this, this.flowInto.firstElementChild);
          }
        }

        if (half > 1) {
          // go again
          half = Math.ceil(half / 2);
        } else {
          // the final child is a make or break:
          // we could have pulled it in if we weren't overflowing, but
          // in doing so, caused us to overflow. So doulbe check and
          // push out if needed
          if (overflowingFunc() && this.lastElementChild) {
            DomUtils.insertAtStart(this.flowInto, this.lastElementChild);
          }
          break;
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
    recurse_: function(overflowingFunc) {
      var child = this.flowInto.firstElementChild;
      if (child && child.supports && child.supports('flow')) {

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

  });

});