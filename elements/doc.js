
window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtDoc');

require([
  'utils/pubsub',
  'utils/miscUtils',
  'utils/rangeUtils',
  'utils/arrayUtils',
  'elements/mixin/element'], function(
    PubSub,
    MiscUtils,
    RangeUtils,
    ArrayUtils,
    QowtElement) {

  'use strict';

  var api_ = {
    supports_: ['something'],

    scale: 1,

    /* jshint newcap: true */
    created: function() {
      this.setAttribute('contenteditable', 'true');
    },
    attached: function() {
      console.log('doc attached');
      PubSub.subscribe('page-changed', this.handlePageChanged_.bind(this));
      document.addEventListener('keydown', this.handleKeyDown_.bind(this));
    },
    ready: function() {
    },
    domReady: function() {
    },

    zoomIn: function() {
      this.scale = Math.min(this.scale + 0.1, 5);
    },
    zoomOut: function() {
      this.scale = Math.max(this.scale - 0.1, 0.2);
    },

    scaleChanged: function(oldScale, newScale) {
      this.$.zoomable.style['-webkit-transform'] = 'scale(' + newScale + ')';
      var scaledWidth = this.$.zoomable.offsetWidth * newScale;
      if (scaledWidth > this.offsetWidth) {
        // our zoomable is bursting out of our qowt-doc, so make sure
        // we set our transform-origin-x to zero, or else it bursts
        // out to the left where the scrollbars dont reach
        console.log('bursting');
        this.style['justify-content'] = 'flex-start';
        this.$.zoomable.style['-webkit-transform-origin-x'] = '0%';
      } else {
        console.log('NOT bursting');
        this.style['justify-content'] = 'center';
        this.$.zoomable.style['-webkit-transform-origin-x'] = '50%';
      }
    },

    paginate: function(page) {
      if (page === undefined) {
        // get the first page
        page = this.querySelector('qowt-page');
      }
      // when we remove a page, that too causes a mutation record and
      // thus a 'page-changed'. Make sure we dont bother paginating pages
      // which are not in the document
      if (page instanceof QowtPage && page.ownerDocument.body.contains(page)) {

        if (!page.flowInto) {
          var nextPage = page.createFlowInto();

          // TODO(jliebrand): can optimize by adding this to the DOM
          // *after* the flow is done; thereby saving layouts when
          // content is pushed in to the nextPage...
          this.appendChild(nextPage);
        }

        // console.time('paginate');
        // console.log('paginate');
        page.flow(page.isOverflowing.bind(page));

        page.normalizeFlow();
        // console.timeEnd('paginate');

      }
    },

    // ---------------------- PRIVATE ---------------------

    handleKeyDown_: function(evt) {
      // debugger;
      // var topLevelElements = [];
      // var sel = window.getSelection();
      // if (sel.rangeCount > 0) {
      //   var range = sel.getRangeAt(0);
      //   var walker = RangeUtils.createWalker(range);
      //   while (walker.nextNode()) {
      //     var node = walker.referenceNode;
      //     while(node && !(node.parentNode instanceof QowtSection)) {
      //       node = node.parentNode;
      //     }
      //     if (node && node.parentNode instanceof QowtSection) {
      //       topLevelElements.push(node);
      //     }
      //     topLevelElements = ArrayUtils.unique(topLevelElements);
      //   }
      // }

      // var i;
      // // make sure all pages ignore any changes we make during unflow since
      // // we do NOT want to paginate because of unflowing...
      // var pages = document.querySelectorAll('qowt-page');
      // for (i = 0; i < pages.length; i++) {
      //   pages[i].ignoreMutations();
      // }

      // // unflow all relevant top level elements
      // topLevelElements.forEach(function(element) {
      //   if (element.supports && element.supports('flow') &&
            // element.isFlowing()) {
      //     element.unflow();
      //   }
      // });

      // // and now re-enable the pages listening for mutations again so
      // // that the subsequent edit that will happen WILL be picked up, and
      // // it WILL cause a re-paginate
      // for (i = 0; i < pages.length; i++) {
      //   pages[i].listenForMutations();
      // }
    },

    handlePageChanged_: function(details) {
      // TODO(jliebrand): could double check that page is in the dom
      // although it always should be...
      this.paginate(details.page);
      // this.zoom_(1);
    }

  };


  /* jshint newcap: false */
  Polymer('qowt-doc', MiscUtils.mergeMixin(QowtElement, api_));
  /* jshint newcap: true */

});