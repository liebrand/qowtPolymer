
window.__customElementRegistry = window.__customElementRegistry || [];
window.__customElementRegistry.push('QowtPage');

require([
  'utils/pubsub',
  'utils/mutation-summary',
  'utils/miscUtils',
  'elements/mixin/element',
  'elements/mixin/flowChildren'], function(
    PubSub,
    MutationSummaryDep,
    MiscUtils,
    QowtElement,
    FlowChildren) {

  "use strict";

  var api_ = {
    supports_: ['something'],

    attached: function() {
      // Note: the order in which observers are called is based
      // on the order of CONSTRUCTION. Since we should always create
      // pages "in order", this is good news. It means that a mutation
      // on multiple pages will gaurantee that the observers are called
      // "in order" and thus we paginate (reflow) from top down
      this.mutationObserver_ = new MutationSummary({
        rootNode: this,
        callback: this.handleMutations_.bind(this),
        queries: [{ all: true }],
      });
    },

    detach: function() {
      this.mutationObserver_.disconnect();
    },

    ignoreMutations: function() {
      this.mutationObserver_.disconnect();
    },
    listenForMutations: function() {
      this.mutationObserver_.reconnect();
    },

    ready: function() {
      this.addEventListener('header-changed', this.updateHeader);
      this.addEventListener('footer-changed', this.updateFooter);
    },

    // TODO(jliebrand): remove duplication between header and footer functions
    updateHeader: function() {
      // get header/footer information from FIRST section on page
      var section = this.querySelectorAll('qowt-section')[0];

      if (section) {
        this.$.header.clear();
        this.$.header.appendChild(section.getHeaderContent('odd'));
      }
    },

    updateFooter: function() {
      // get header/footer information from FIRST section on page
      var section = this.querySelectorAll('qowt-section')[0];

      if (section) {
        this.$.footer.clear();
        this.$.footer.appendChild(section.getFooterContent('odd'));
      }
    },

    isOverflowing: function() {
      return this.$.contents.scrollHeight > this.$.contents.offsetHeight;
    },

    // ---------------------- PRIVATE ------------------

    handleMutations_: function(mutations) {
      this.fire('page-changed', {page: this});
    }
  };


  var QowtPageProto = MiscUtils.mergeMixin(QowtElement, FlowChildren, api_);

  /* jshint newcap: false */
  Polymer('qowt-page', QowtPageProto);
  /* jshint newcap: true */

});
