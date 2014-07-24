
(function() {
  "use strict";

  var MiscUtils = require('utils/miscUtils');
  var QowtElement = require('elements/mixin/element');
  var FlowChildren = require('elements/mixin/flowChildren');

  var api_ = {
    supports_: ['something'],

    ready: function() {
      this.addEventListener('header-footer-changed', this.updateHeaderFooter.bind(this));
    },

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

    updateHeaderFooter: function(evt) {
      this.updateHeader();
      this.updateFooter();
      // var target = (evt.detail.hf.getAttribute('data-hf-type') === 'footer') ?
      //     this.$.footer : this.$.header;

      // target.appendChild(document.importNode(evt.detail.hf.content, true));
    },

    // TODO(jliebrand): remove duplication between header and footer functions
    updateHeader: function() {
      // get header/footer information from FIRST section on page
      var section = this.querySelectorAll('qowt-section')[0];

      if (section) {
        this.$.header.clear();
        var header = section.getHFContent('header', 'odd');
        if (header) {
          this.$.header.appendChild(header);
        }
      }
    },

    updateFooter: function() {
      // get header/footer information from FIRST section on page
      var section = this.querySelectorAll('qowt-section')[0];

      if (section) {
        this.$.footer.clear();
        var footer = section.getHFContent('footer', 'odd');
        if (footer) {
          this.$.footer.appendChild(footer);
        }
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

})();