
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
      this.addEventListener('page-changed', this.handlePageChanged_.bind(this));
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

    zoomToWidth: function() {
      var page = this.currentVisiblePage_();
      this.scale = (this.offsetWidth / page.offsetWidth) - 0.005;
    },

    zoomFullPage: function() {
      var page = this.currentVisiblePage_();
      this.scale = (this.offsetHeight / page.offsetHeight) - 0.005;

      // scroll on an async; without this it doesn't always
      // scroll to the right position...
      this.async(page.scrollIntoView);
    },

    zoomActualSize: function() {
      this.scale = 1;
    },

    scaleChanged: function(oldScale, newScale) {
      this.$.zoomable.style['-webkit-transform'] = 'scale(' + newScale + ')';
      var scaledWidth = this.$.zoomable.offsetWidth * newScale;
      if (scaledWidth > this.offsetWidth) {
        // our zoomable is bursting out of our qowt-doc, so make sure
        // we set our transform-origin-x to zero, or else it bursts
        // out to the left where the scrollbars dont reach
        this.style['justify-content'] = 'flex-start';
        this.$.zoomable.style['-webkit-transform-origin-x'] = '0%';
      } else {
        // reset to defaults
        this.style['justify-content'] = '';
        this.$.zoomable.style['-webkit-transform-origin-x'] = '';
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

    handlePageChanged_: function(evt) {
      // TODO(jliebrand): could double check that page is in the dom
      // although it always should be...
      this.paginate(evt.detail.page);
    },

    currentVisiblePage_: function() {
      var el;
      var ourRect = this.getBoundingClientRect();
      var pointX = ourRect.left + (ourRect.width / 2);
      var pointY = ourRect.top + (ourRect.height / 2);

      // get the element located in the middle of our rect,
      // repeat in case elementFromPoint hitTests in between pages
      do {
        el = window.document.elementFromPoint(pointX, pointY);
        pointY -= 10;
      } while (((el !== null) && (el.isSameNode(this))) && (pointY > 20));

      // now walk up to the page
      while (el && el.nodeName !== 'QOWT-PAGE') {
        el = el.parentNode;
      }

      // check edge case just return the first page; should always be there.
      return ((el === null) || (el.nodeName !== 'QOWT-PAGE')) ?
          this.querySelector('qowt-page') : el;
    }


  };


  /* jshint newcap: false */
  Polymer('qowt-doc', MiscUtils.mergeMixin(QowtElement, api_));
  /* jshint newcap: true */

});