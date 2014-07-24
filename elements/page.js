
(function() {
  "use strict";

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
      var headerUpdated = this.updateHeaderFooter.bind(this, 'header');
      var footerUpdated = this.updateHeaderFooter.bind(this, 'footer');
      this.addEventListener('header-changed', headerUpdated);
      this.addEventListener('footer-changed', footerUpdated);
      this.classList.add('page');
    },

    attached: function() {
      // We use the mutation summary library rather than
      // the polymer sugar "this.onMutation" because we need
      // to be able to support ignoring mutations (eg disconnect)
      // Note: the order in which mutation observers are called is based
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

    updateHeaderFooter: function(type, event) {
      var target = (type === 'header') ? this.$.header : this.$.footer;
      // only update header/footer information
      // if it's the FIRST section on the page
      var section = this.querySelectorAll('qowt-section')[0];
      if (event.srcElement.isSameNode(section)) {
        target.clear();
        var content = (type === 'header') ?
            section.getHeaderContent() : section.getFooterContent();
        var config = (type === 'header') ?
            section.headerConfig : section.footerConfig;
        if (content) {
          target.appendChild(content);
        }
        target.setAttribute('dfp', config.dfp);
        target.setAttribute('doe', config.doe);
      }
      this.fire('page-changed', {page: this});
    },

    isOverflowing: function() {
      return this.$.contents.scrollHeight > this.$.contents.offsetHeight;
    },

    // ---------------------- PRIVATE ------------------

    handleMutations_: function(mutations) {
      // fire page changed event, which will trigger pagination
      this.fire('page-changed', {page: this});
    }
  };


  var QowtPageProto = MiscUtils.mergeMixin(QowtElement, FlowChildren, api_);

  /* jshint newcap: false */
  Polymer('qowt-page', QowtPageProto);
  /* jshint newcap: true */

})();