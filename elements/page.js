/* jshint newcap: false */
Polymer('qowt-page', {
  /* jshint newcap: true */

  attached: function() {
    this.mutationObserver_ = new MutationSummary({
      rootNode: this,
      callback: this.handleMutations_.bind(this),
      queries: [{ all: true }],
    });
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
    // TODO(jliebrand): would like to use polymer this.fire but that
    // fires a normal dom event, which is not handled synchronously by
    // listeners which means any changes made in handling the event (for
    // example to paginate!) would result in additional mutation records
    // being fired; which is not what i want. So I want a sync event and
    // sync handling... use PubSub for now.
    PubSub.publish('page-changed', {page: this});
  }

});

QowtElement.addMixin(QowtPage.prototype);
FlowChildren.addMixin(QowtPage.prototype);